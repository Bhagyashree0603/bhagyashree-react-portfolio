variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Prefix used for AWS resource names"
  type        = string
  default     = "bhagyashree-portfolio"
}

variable "ecr_repository_name" {
  description = "ECR repository used by the Jenkins pipeline"
  type        = string
  default     = "bhagyashree-portfolio"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair in the selected AWS region"
  type        = string
}

variable "admin_cidr" {
  description = "Your current public IP in CIDR format, for example 198.51.100.25/32"
  type        = string
}

variable "jenkins_instance_type" {
  description = "EC2 size for Jenkins; t3.small is a low-cost starter but may feel slow"
  type        = string
  default     = "t3.medium"
}

variable "deploy_instance_type" {
  description = "EC2 size for the portfolio deployment host"
  type        = string
  default     = "t3.medium"
}
