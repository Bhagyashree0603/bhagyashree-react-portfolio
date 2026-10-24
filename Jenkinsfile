pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        APP_NAME = 'bhagyashree-portfolio'
        DEPLOYMENT = 'bhagyashree-portfolio'
        CONTAINER = 'bhagyashree-portfolio'
        SERVICE = 'bhagyashree-portfolio'
    }

    stages {
        stage('Validate') {
            steps {
                sh '''
                    set -eu
                    test -f package.json
                    test -f Dockerfile
                    test -f nginx.conf
                    echo "Project validation successful."
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -eu
                    docker build --pull=false \
                      -t ${APP_NAME}:jenkins-${BUILD_NUMBER} .
                    echo "Docker image built successfully."
                '''
            }
        }

        stage('Check Kubernetes') {
            steps {
                sh '''
                    set -eu
                    kubectl config use-context minikube
                    kubectl get deployment ${DEPLOYMENT}
                    kubectl get service ${SERVICE}
                '''
            }
        }

        stage('Deploy to Minikube') {
            steps {
                echo 'Image transfer to Minikube must be configured before deploying a new build.'
                error('Minikube image transfer from the Jenkins container is not configured yet. See the existing healthy deployment; no rollout was attempted.')
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Pipeline completed.'
        }
        failure {
            echo 'Pipeline stopped safely. Check the stage error above.'
        }
    }
}