pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    triggers {
        // Poll GitHub every five minutes; configure a webhook later for faster builds.
        pollSCM('H/5 * * * *')
    }

    parameters {
        string(
            name: 'DEPLOY_HOST',
            defaultValue: '',
            description: 'Paste the deploy_private_ip value from terraform output (Jenkins connects over the VPC private network).'
        )
    }

    environment {
        AWS_REGION     = 'ap-south-1'
        ECR_REPOSITORY = 'bhagyashree-portfolio'
        CONTAINER_NAME = 'bhagyashree-portfolio'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate project files') {
            steps {
                sh '''
                    set -eu
                    test -f package.json
                    test -f package-lock.json
                    test -f Dockerfile
                    test -f nginx.conf
                    echo "Required React and Docker files found."
                '''
            }
        }

        stage('Build Docker image') {
            steps {
                sh '''
                    set -eu
                    docker build --pull \
                      -t ${ECR_REPOSITORY}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Authenticate and push to ECR') {
            steps {
                script {
                    if (!params.DEPLOY_HOST?.trim()) {
                        error('DEPLOY_HOST is empty. Enter the deploy_private_ip from terraform output and run again.')
                    }
                    env.AWS_ACCOUNT_ID = sh(
                        script: 'aws sts get-caller-identity --query Account --output text',
                        returnStdout: true
                    ).trim()
                }

                sh '''
                    set -eu
                    ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    IMAGE_URI="${ECR_REGISTRY}/${ECR_REPOSITORY}"

                    aws ecr get-login-password --region "$AWS_REGION" \
                      | docker login --username AWS --password-stdin "$ECR_REGISTRY"

                    docker tag "${ECR_REPOSITORY}:${BUILD_NUMBER}" "${IMAGE_URI}:${BUILD_NUMBER}"
                    docker push "${IMAGE_URI}:${BUILD_NUMBER}"

                    docker tag "${IMAGE_URI}:${BUILD_NUMBER}" "${IMAGE_URI}:latest"
                    docker push "${IMAGE_URI}:latest"
                    docker logout "$ECR_REGISTRY"
                '''
            }
        }

        stage('Deploy to deployment EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'deploy-ec2-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                        set -eu
                        ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                        ssh -i "$SSH_KEY" \
                          -o BatchMode=yes \
                          -o ConnectTimeout=20 \
                          -o StrictHostKeyChecking=accept-new \
                          "$SSH_USER@${DEPLOY_HOST}" \
                          "AWS_REGION='${AWS_REGION}' AWS_ACCOUNT_ID='${AWS_ACCOUNT_ID}' ECR_REPOSITORY='${ECR_REPOSITORY}' IMAGE_TAG='${BUILD_NUMBER}' CONTAINER_NAME='${CONTAINER_NAME}' bash -s" <<'REMOTE_SCRIPT'
                        set -euo pipefail
                        ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                        IMAGE_URI="${ECR_REGISTRY}/${ECR_REPOSITORY}"

                        aws ecr get-login-password --region "$AWS_REGION" \
                          | docker login --username AWS --password-stdin "$ECR_REGISTRY"

                        # Pull before stopping the currently running version.
                        docker pull "${IMAGE_URI}:${IMAGE_TAG}"
                        docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
                        docker run -d \
                          --restart unless-stopped \
                          --name "$CONTAINER_NAME" \
                          -p 80:80 \
                          "${IMAGE_URI}:${IMAGE_TAG}"

                        docker image prune -f
                        echo "Deployment completed: ${IMAGE_URI}:${IMAGE_TAG}"
REMOTE_SCRIPT
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Portfolio image pushed to ECR and deployed to the deployment EC2 instance.'
        }
        failure {
            echo 'FAILED: Open Console Output and check the stage that failed.'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
