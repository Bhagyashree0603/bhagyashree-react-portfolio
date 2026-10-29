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
                sh '''
                    set -eu
                    kubectl set image deployment/${DEPLOYMENT} ${CONTAINER}=${APP_NAME}:jenkins-${BUILD_NUMBER}
                    kubectl rollout status deployment/${DEPLOYMENT} --timeout=120s
                    kubectl get service ${SERVICE}
                '''
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

