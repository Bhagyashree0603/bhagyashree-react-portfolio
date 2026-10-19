#!/bin/bash
set -euxo pipefail
exec > >(tee -a /var/log/deploy-bootstrap.log | logger -t user-data -s 2>/dev/console) 2>&1

dnf update -y
dnf install -y docker curl unzip
systemctl enable --now docker
usermod -aG docker ec2-user

# Install AWS CLI v2 for authentication to ECR through this EC2 instance's IAM role.
ARCH="$(uname -m)"
if [ "$ARCH" = "aarch64" ]; then AWS_ARCH="aarch64"; else AWS_ARCH="x86_64"; fi
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${AWS_ARCH}.zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp
/tmp/aws/install

docker --version
aws --version
echo "Deployment host bootstrap complete."
