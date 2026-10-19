output "jenkins_public_ip" {
  description = "Public IPv4 address of the Jenkins server"
  value       = aws_instance.jenkins.public_ip
}

output "jenkins_url" {
  description = "Open this URL after Jenkins finishes installing"
  value       = "http://${aws_instance.jenkins.public_ip}:8080"
}

output "deploy_public_ip" {
  description = "Public IPv4 address of the portfolio deployment server"
  value       = aws_instance.deploy.public_ip
}

output "portfolio_url" {
  description = "Portfolio URL after the first successful Jenkins build"
  value       = "http://${aws_instance.deploy.public_ip}"
}

output "ecr_repository_url" {
  description = "Amazon ECR repository URL"
  value       = aws_ecr_repository.portfolio.repository_url
}
