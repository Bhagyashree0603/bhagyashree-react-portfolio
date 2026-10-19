# Bhagyashree React Portfolio — Terraform + Jenkins + AWS ECR

This project runs the React portfolio on a dedicated deployment EC2 instance. Terraform creates two separate EC2 instances, an Amazon ECR repository, security groups, and IAM roles:

- **Jenkins EC2:** Jenkins, Docker, AWS CLI, and an IAM role that can push images to ECR.
- **Deployment EC2:** Docker, AWS CLI, and an IAM role that can pull images from ECR and serve the portfolio on port 80.
- **Amazon ECR:** stores versioned portfolio images.
- **Jenkins pipeline:** checks out GitHub code, builds the Docker image, pushes it to ECR, and connects to the deployment instance over SSH to run the new image.

## Important before you start

1. You need an AWS account and local AWS CLI credentials with permission to create EC2, IAM, security groups, and ECR resources. Do not use the AWS root account for daily work.
2. Create or choose an **existing EC2 key pair in `ap-south-1` (Mumbai)**. Keep its `.pem` private key safe.
3. Find your current public IPv4 address and use it as `admin_cidr` with `/32`. This limits SSH and the Jenkins web UI to your IP.
4. Review AWS pricing before applying. This project creates **two EC2 instances** and an ECR repository. Jenkins on `t3.small` can be slow with low memory; a larger instance is smoother but costs more.
5. The Terraform configuration expects the AWS account to have a default VPC and a subnet with public internet access.

## Step 1 — Configure AWS CLI on your computer

Install Terraform and AWS CLI, then configure credentials using your organization's approved method. For a local learning setup, you can run:

```powershell
aws configure
aws sts get-caller-identity
```

Choose region `ap-south-1`. Avoid committing credentials or private keys to GitHub.

## Quickest setup (Windows PowerShell)

From the project root, run:

```powershell
cd terraform
Set-ExecutionPolicy -Scope Process Bypass
.\deploy.ps1
```

The script checks AWS CLI/Terraform, verifies AWS credentials, asks for your existing EC2 key-pair name and your public IP `/32`, then runs `terraform init`, `validate`, `plan`, and asks you to type `APPLY` before creating resources. You still need to finish the Jenkins web setup and add the SSH private key credential as described below.

## Step 2 — Configure Terraform

Open PowerShell in the project root:

```powershell
cd terraform
Copy-Item terraform.tfvars.example terraform.tfvars
notepad terraform.tfvars
```

Edit the two required values:

```hcl
key_name   = "YOUR_EXISTING_EC2_KEY_PAIR_NAME"
admin_cidr = "YOUR_PUBLIC_IPV4/32"
```

The key pair must already exist in the Mumbai region. `admin_cidr` is your public IP, not your private LAN address. Save the file.

## Step 3 — Create AWS resources

From the `terraform` folder, run:

```powershell
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

Review the plan and type `yes` only if it is correct. Terraform creates the ECR repository, IAM roles, security groups, and both EC2 instances. Wait several minutes for both User Data scripts to finish.

Get the instance addresses:

```powershell
terraform output
terraform output -raw jenkins_public_ip
terraform output -raw deploy_public_ip
terraform output -raw jenkins_url
terraform output -raw portfolio_url
```

Keep the `deploy_public_ip` value for the Jenkins pipeline parameter.

## Step 4 — Finish Jenkins setup

1. Open the `jenkins_url` shown by Terraform. Jenkins may need 5–10 minutes after EC2 starts to install and initialize.
2. From PowerShell, retrieve the initial password (replace the IP and key path):

   ```powershell
   ssh -i "C:\path\to\your-key.pem" ec2-user@JENKINS_PUBLIC_IP "sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
   ```

3. Paste the password into the Jenkins page and follow the setup wizard. Install the suggested plugins, including **Pipeline**, **Git**, and **Credentials Binding**.
4. The Jenkins EC2 instance profile grants access to ECR. Do not add long-lived AWS access keys to Jenkins.

## Step 5 — Add the deployment SSH key to Jenkins

Jenkins needs the private key for the EC2 key pair so it can SSH to the deployment instance.

1. In Jenkins, open **Manage Jenkins → Credentials → (global) → Add Credentials**.
2. Kind: **SSH Username with private key**.
3. Scope: Global; ID: `deploy-ec2-ssh`; Username: `ec2-user`.
4. Choose **Enter directly** and paste the contents of your existing `.pem` private key. Save it securely; never commit this key to the repository.

The deployment EC2 security group only accepts SSH from the Jenkins EC2 security group. The Jenkins security group only exposes port 22 and port 8080 to `admin_cidr`.

## Step 6 — Push this project to your GitHub repository

Commit the project files (including `Jenkinsfile`, `Dockerfile`, and `nginx.conf`) to your repository. Do **not** commit `terraform.tfvars`, Terraform state, `.env` files, or private keys.

If you are using a **new empty GitHub repository**, run these commands from the project root after creating the repository on GitHub (replace the URL):

```powershell
git init -b main
git add .
git commit -m "Set up portfolio CI/CD deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If you already have a repository, copy the corrected project files into your existing local clone and commit/push them there instead. Do not overwrite an existing `.git` directory unnecessarily.

In Jenkins, create a **Pipeline** job:

1. Select **Pipeline script from SCM**.
2. SCM: Git; enter your GitHub repository URL and branch (for example, `main`).
3. Script Path: `Jenkinsfile`.
4. Save the job.

The Jenkinsfile polls the repository every five minutes. A GitHub webhook can be configured later for near-instant builds.

## Step 7 — Run the deployment

1. Open the Jenkins job and click **Build with Parameters**.
2. In `DEPLOY_HOST`, paste the `deploy_public_ip` value from Terraform output.
3. Click **Build** and watch **Console Output**.
4. On success, open `http://DEPLOY_PUBLIC_IP` in your browser.

Pipeline stages: checkout → validate files → build Docker image → authenticate/push to ECR → SSH to deployment EC2 → pull and run the versioned image.

## Troubleshooting

- **Jenkins URL not opening:** check the Jenkins EC2 security group allows TCP 8080 from your current public IP, wait for bootstrap to finish, and inspect `/var/log/jenkins-bootstrap.log` over SSH.
- **ECR access denied:** confirm the Jenkins instance profile is attached and the instance role has ECR push permissions. Confirm region and repository name match.
- **SSH deployment fails:** verify the `deploy-ec2-ssh` credential contains the correct `.pem` private key and username `ec2-user`; confirm the deploy host is the Terraform `deploy_public_ip` and both instances are running.
- **Docker permission denied:** wait for User Data to finish, then reconnect to the instance. The bootstrap script adds `ec2-user` and `jenkins` to the Docker group.
- **Website not opening:** check the deploy EC2 security group allows TCP 80 and inspect the container with `docker ps` and `docker logs bhagyashree-portfolio` over SSH.
- **User Data logs:** `/var/log/cloud-init-output.log`, `/var/log/jenkins-bootstrap.log`, and `/var/log/deploy-bootstrap.log`.

## Clean up AWS resources

When finished, run from the `terraform` directory:

```powershell
terraform destroy
```

Review the plan and confirm. This deletes the two EC2 instances and the ECR repository (including images because `force_delete = true`). Back up anything you need first. Also delete any other resources you created separately.

## Notes

- This is a beginner-friendly single-instance deployment, not a highly available production architecture.
- Deployment replaces the current container after the new image has been pulled; a brief interruption can occur.
- Contact form credentials/configuration in the original portfolio template may still need to be configured in `src/content_option.js` if you want EmailJS to work.
