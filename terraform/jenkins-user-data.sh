#!/bin/bash
set -euxo pipefail
exec > >(tee -a /var/log/jenkins-bootstrap.log | logger -t user-data -s 2>/dev/console) 2>&1

dnf update -y
dnf install -y java-21-amazon-corretto docker git curl wget unzip

# Install AWS CLI v2
ARCH="$(uname -m)"
if [ "$ARCH" = "aarch64" ]; then AWS_ARCH="aarch64"; else AWS_ARCH="x86_64"; fi
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${AWS_ARCH}.zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp
/tmp/aws/install

# Install stable Jenkins package
curl -fsSL https://pkg.jenkins.io/rpm-stable/jenkins.repo -o /etc/yum.repos.d/jenkins.repo
rpm --import https://pkg.jenkins.io/rpm-stable/jenkins.io-2023.key
dnf install -y jenkins

# Allow Jenkins to use Docker and start services
systemctl enable --now docker
usermod -aG docker jenkins
systemctl enable jenkins
systemctl restart jenkins
