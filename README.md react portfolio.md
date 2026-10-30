
# Bhagyashree React Portfolio – End-to-End DevOps Project

## 1. Project Overview

**Bhagyashree React Portfolio – DevOps Automation and Monitoring Project**

This project demonstrates the implementation of DevOps practices by deploying a React-based personal portfolio application using containerization, CI/CD automation, Kubernetes orchestration, infrastructure as code, and monitoring tools.

The main objective is to automate the application delivery process, simplify deployment, and monitor application and Kubernetes cluster performance.

Instead of relying entirely on manual deployment, this project integrates multiple DevOps tools to demonstrate a structured application delivery workflow.

### Key Objectives

- Develop and maintain a React-based personal portfolio website.
- Use Git and GitHub for source code management and version control.
- Automate build and deployment workflows using Jenkins.
- Containerize the application using Docker.
- Store and manage Docker images using Amazon Elastic Container Registry (ECR).
- Deploy and manage application containers using Kubernetes on Minikube.
- Use Terraform to define and manage infrastructure as code.
- Monitor Kubernetes cluster metrics using Prometheus and Grafana.

### Key Features

- React-based responsive portfolio application.
- GitHub-based source code management.
- Jenkins CI/CD pipeline.
- Docker image creation and containerization.
- AWS ECR image repository integration.
- Kubernetes deployment and service management.
- Terraform infrastructure configuration.
- Prometheus metrics collection.
- Grafana monitoring dashboards.

### Technologies Used

| Category | Tools |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript |
| Version Control | Git, GitHub |
| CI/CD | Jenkins |
| Containerization | Docker |
| Container Registry | AWS ECR |
| Orchestration | Kubernetes, Minikube |
| Infrastructure as Code | Terraform |
| Monitoring | Prometheus, Grafana |
| Cloud Platform | AWS |

## Project Architecture

The project follows a DevOps-based application delivery architecture that connects source code management, continuous integration, containerization, image storage, Kubernetes deployment, infrastructure configuration, and monitoring.

#### screenshots/Bhagyashree React Portfolio DevOps Blueprint.png

### Architecture Workflow

1. **Developer:** Develops and updates the React portfolio application.
2. **GitHub:** Stores the application source code and tracks changes using Git.
3. **Jenkins:** Automates the CI/CD pipeline by checking out the source code and executing configured build and deployment stages.
4. **Docker:** Builds a container image of the React application.
5. **AWS ECR:** Provides a container image registry to store and manage Docker images.
6. **Kubernetes (Minikube):** Runs and manages the application using Kubernetes Deployments and Services in the local development cluster.
7. **Terraform:** Defines infrastructure resources through configuration files using Infrastructure as Code.
8. **Prometheus:** Collects and stores monitoring metrics from the Kubernetes environment.
9. **Grafana:** Visualizes monitoring metrics through dashboards.


### Architecture Flow

```text
             DEVELOPER
                 |
                 v
              GITHUB
          Source Code
                 |
                 v
              JENKINS
          CI/CD Pipeline
                 |
                 v
               DOCKER
          Build Image
                 |
                 v
             AWS ECR
        Container Registry
                 |
                 v
       KUBERNETES (MINIKUBE)
          Deployment
                 |
                 v
          REACT PORTFOLIO
             Application

       INFRASTRUCTURE
                 |
                 v
             TERRAFORM
        Infrastructure as Code

       KUBERNETES CLUSTER
                 |
                 v
            PROMETHEUS
         Metrics Collection
                 |
                 v
              GRAFANA
         Monitoring Dashboard
```

**Note:** Minikube is used for the local Kubernetes deployment. AWS ECR is used as the container image registry. Terraform configuration describes infrastructure as code; actual AWS infrastructure provisioning should be documented separately according to the resources successfully created.

### Benefits of the Architecture

- Automates application build and delivery workflows.
- Provides consistent application packaging through Docker.
- Simplifies container management using Kubernetes.
- Maintains centralized container image storage through AWS ECR.
- Supports repeatable infrastructure configuration through Terraform.
- Provides visibility into cluster performance through Prometheus and Grafana.
- Improves maintainability and scalability of the deployment workflow.

This project demonstrates the deployment and monitoring of a React-based portfolio application using DevOps tools and practices.

### Technologies Used

- Frontend: React.js
- Version Control: Git and GitHub
- Containerization: Docker
- CI/CD: Jenkins
- Container Orchestration: Kubernetes
- Local Kubernetes Cluster: Minikube
- Infrastructure as Code: Terraform
- Cloud Container Registry: AWS ECR
- Monitoring: Prometheus and Grafana
- Web Server: Nginx

## 2. Project Location

Open Windows PowerShell:

```powershell
cd C:\Bhagyashree-React-Portfolio
```

## 3. Verify Prerequisites

```powershell
node --version
npm --version
git --version
docker --version
kubectl version --client
minikube version
helm version
terraform version
aws --version
```

Check Docker:

```powershell
docker info
```

## 4. React Application

Install dependencies:

```powershell
npm ci
```

Run the application locally:

```powershell
npm start
```

If the project uses Vite instead of Create React App, use:

```powershell
npm run dev
```

Open the local URL displayed in the terminal.

Stop the development server using `Ctrl + C`.

Build the production application:

```powershell
npm run build
```

For Create React App, production files are generated in `build`. For Vite, they are generated in `dist`.

## 5. Git and GitHub

Check repository status:

```powershell
git status
```

Check branch:

```powershell
git branch
```

Check remote:

```powershell
git remote -v
```

Pull the latest changes:

```powershell
git pull origin main
```

Stage and commit changes when required:

```powershell
git add .
git commit -m "Update portfolio project"
git push origin main
```

GitHub repository:

https://github.com/Bhagyashree0603/bhagyashree-react-portfolio

## 6. Docker

Build the portfolio Docker image:

```powershell
docker build -t bhagyashree-portfolio:v4 .
```

Verify the image:

```powershell
docker images bhagyashree-portfolio
```

Run the application in a Docker container:

```powershell
docker rm -f bhagyashree-portfolio-demo 2>$null
docker run -d --name bhagyashree-portfolio-demo -p 8081:80 bhagyashree-portfolio:v4
```

Verify the container:

```powershell
docker ps
```

Open the application:

http://localhost:8081

Check container logs:

```powershell
docker logs bhagyashree-portfolio-demo
```

Stop the demo container:

```powershell
docker stop bhagyashree-portfolio-demo
```

## 7. Jenkins CI/CD

Start the existing Jenkins container:

```powershell
docker start jenkins-local
```

Verify Jenkins:

```powershell
docker ps --filter "name=jenkins-local"
```

Open Jenkins:

http://localhost:8082

Jenkins pipeline procedure:

1. Log in to Jenkins.
2. Open `Bhagyashree-Portfolio-CI-CD`.
3. Select Build Now.
4. Open the latest build.
5. Select Console Output.
6. Verify the pipeline stages and final build status.

Jenkins pipeline stages include:

- Source code checkout
- Dependency and configuration validation
- Docker image build
- AWS ECR authentication
- Docker image push
- Deployment stage, when its required credentials and target infrastructure are configured

## 8. Kubernetes with Minikube

Start Minikube:

```powershell
minikube start --driver=docker
```

Verify cluster status:

```powershell
minikube status
```

Verify Kubernetes nodes:

```powershell
kubectl get nodes
```

Load the Docker image into Minikube:

```powershell
minikube image load bhagyashree-portfolio:v4
```

Check the existing deployment:

```powershell
kubectl get deployments
```

Check the existing pods:

```powershell
kubectl get pods
```

Check services:

```powershell
kubectl get services
```

Update the portfolio deployment to use the new image:

```powershell
kubectl set image deployment/bhagyashree-portfolio bhagyashree-portfolio=bhagyashree-portfolio:v4
```

Wait for deployment rollout:

```powershell
kubectl rollout status deployment/bhagyashree-portfolio
```

Verify the deployment:

```powershell
kubectl get deployment bhagyashree-portfolio
kubectl get pods -o wide
kubectl describe deployment bhagyashree-portfolio
```

Open the Kubernetes application:

```powershell
minikube service bhagyashree-portfolio
```

This opens the application through the Minikube service.

## 9. AWS ECR

AWS region:

`ap-south-1`

AWS account:

`235864148652`

ECR repository:

`bhagyashree-portfolio`

Verify AWS identity:

```powershell
aws sts get-caller-identity
```

Verify ECR repository:

```powershell
aws ecr describe-repositories --repository-names bhagyashree-portfolio --region ap-south-1
```

Set registry:

```powershell
$registry = "235864148652.dkr.ecr.ap-south-1.amazonaws.com"
```

Authenticate Docker with ECR:

```powershell
$password = aws ecr get-login-password --region ap-south-1
$password | docker login --username AWS --password-stdin $registry
```

Tag the image:

```powershell
docker tag bhagyashree-portfolio:v4 235864148652.dkr.ecr.ap-south-1.amazonaws.com/bhagyashree-portfolio:v4
```

Push the image:

```powershell
docker push 235864148652.dkr.ecr.ap-south-1.amazonaws.com/bhagyashree-portfolio:v4
```

Verify images in ECR:

```powershell
aws ecr list-images --repository-name bhagyashree-portfolio --region ap-south-1
```

Note: AWS authentication requires valid AWS credentials and permissions. ECR push requires successful Docker login.

## 10. Terraform

Navigate to the Terraform directory:

```powershell
cd C:\Bhagyashree-React-Portfolio\terraform
```

Initialize Terraform:

```powershell
terraform init
```

Validate configuration:

```powershell
terraform validate
```

Format Terraform files:

```powershell
terraform fmt -recursive
```

Review infrastructure changes:

```powershell
terraform plan
```

Inspect Terraform state:

```powershell
terraform state list
```

Note: Run `terraform apply` only after reviewing the plan and confirming the AWS resources, credentials, costs, and configuration. Do not destroy existing infrastructure during the examiner demonstration.

Return to project root:

```powershell
cd C:\Bhagyashree-React-Portfolio
```

## 11. Prometheus and Grafana Monitoring

Monitoring is deployed using Helm and kube-prometheus-stack.

Check Helm release:

```powershell
helm list -n monitoring
```

Check monitoring pods:

```powershell
kubectl get pods -n monitoring
```

Check monitoring services:

```powershell
kubectl get svc -n monitoring
```

### Grafana – Local Port 3000

Open a separate PowerShell terminal:

```powershell
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80
```

Open:

http://localhost:3000

Username:

`admin`

Retrieve Grafana password:

```powershell
kubectl get secret monitoring-grafana -n monitoring -o jsonpath="{.data.admin-password}" | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($_)) }
```

### Prometheus – Local Port 9000

Open another PowerShell terminal:

```powershell
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9000:9090
```

Open:

http://localhost:9000

Important: Keep both PowerShell terminals open while accessing Grafana and Prometheus.

## 12. Monitoring Verification

Check monitoring pods:

```powershell
kubectl get pods -n monitoring
```

Check Prometheus targets:

Open:

http://localhost:9000/targets

Check Grafana dashboards:

Open:

http://localhost:3000

Verify that dashboards display the available Kubernetes and cluster metrics.

## 13. Complete Project Verification

Run the following commands from the project root:

```powershell
cd C:\Bhagyashree-React-Portfolio

git status
docker ps
docker images
minikube status
kubectl get nodes
kubectl get deployments
kubectl get pods -o wide
kubectl get services
helm list -n monitoring
kubectl get pods -n monitoring
kubectl get services -n monitoring
```

## 14. Project Architecture

Developer → GitHub → Jenkins CI/CD → Docker Image → AWS ECR → Kubernetes Deployment → React Portfolio

Prometheus collects monitoring metrics from the Kubernetes environment, and Grafana provides dashboards to visualize those metrics.


## 16. Important Notes

- Keep Docker Desktop running.
- Keep Minikube running during the Kubernetes demonstration.
- Keep Jenkins running before opening its dashboard.
- Keep both port-forward terminals running for Grafana and Prometheus.
- Verify all AWS credentials before demonstrating ECR.
- Do not execute Terraform apply or destroy without reviewing the infrastructure plan.
- A successful Jenkins build does not automatically mean that the Kubernetes deployment or AWS deployment succeeded. Verify each separately.

---

**Project:** Bhagyashree React Portfolio  
**Developer:** Bhagyashree Manglekar  
**Repository:** https://github.com/Bhagyashree0603/bhagyashree-react-portfolio