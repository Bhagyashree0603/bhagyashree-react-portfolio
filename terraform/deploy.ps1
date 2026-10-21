$ErrorActionPreference = 'Stop'

function Require-Command([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' was not found. Install it and reopen PowerShell."
    }
}

Require-Command 'terraform'
Require-Command 'aws'

Write-Host "Checking AWS credentials..." -ForegroundColor Cyan
aws sts get-caller-identity
if ($LASTEXITCODE -ne 0) {
    throw "AWS authentication failed. Configure AWS CLI credentials, then run this script again."
}

$keyName = Read-Host "Enter the name of an existing EC2 key pair in ap-south-1 (Mumbai)"
if ([string]::IsNullOrWhiteSpace($keyName)) { throw "EC2 key pair name is required." }

$adminCidr = Read-Host "Enter your current public IPv4 in CIDR format, for example 198.51.100.25/32"
if ($adminCidr -notmatch '^\d{1,3}(\.\d{1,3}){3}/32$') {
    throw "Please enter an IPv4 address with /32, for example 198.51.100.25/32. Replace the example with your real public IP."
}

@"
key_name = "$keyName"
admin_cidr = "$adminCidr"
"@ | Set-Content -Path (Join-Path $PSScriptRoot 'terraform.tfvars') -Encoding ascii

Push-Location $PSScriptRoot
try {
    terraform init
    if ($LASTEXITCODE -ne 0) { throw "terraform init failed." }

    terraform fmt -recursive
    if ($LASTEXITCODE -ne 0) { throw "terraform fmt failed." }

    terraform validate
    if ($LASTEXITCODE -ne 0) { throw "terraform validate failed." }

    terraform plan
    if ($LASTEXITCODE -ne 0) { throw "terraform plan failed." }

    Write-Host "Review the plan above. Terraform apply will create two EC2 instances and related AWS resources." -ForegroundColor Yellow
    $answer = Read-Host "Type APPLY to create the infrastructure"
    if ($answer -cne 'APPLY') {
        Write-Host "Cancelled. No resources were created by this script." -ForegroundColor Yellow
        return
    }

    terraform apply -auto-approve
    if ($LASTEXITCODE -ne 0) { throw "terraform apply failed. Check the error above." }

    Write-Host "Infrastructure created. Copy deploy_private_ip into the Jenkins job's DEPLOY_HOST parameter. Use deploy_public_ip only for opening the website in a browser." -ForegroundColor Green
    terraform output
}
finally {
    Pop-Location
}
