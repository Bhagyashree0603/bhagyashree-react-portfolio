# Prometheus and Grafana Monitoring

## Overview
This project uses the kube-prometheus-stack Helm chart to monitor the portfolio application on Minikube.

## Deployment Details
- Helm release: monitoring
- Namespace: monitoring
- Chart: kube-prometheus-stack
- Chart version: 92.11.0
- Status: deployed

## Monitoring Services

| Component | Service | Port |
|---|---|---|
| Grafana | monitoring-grafana | 30923 |
| Prometheus | monitoring-kube-prometheus-prometheus | 30090 |
| Alertmanager | monitoring-kube-prometheus-alertmanager | 9093 |

## Verify Installation

Check monitoring pods:

```powershell
kubectl get pods -n monitoring
# Prometheus and Grafana Monitoring

## Overview
This project uses kube-prometheus-stack to monitor the portfolio application on Minikube.

## Deployment Details
- Helm release: monitoring
- Namespace: monitoring
- Chart: kube-prometheus-stack
- Chart version: 92.11.0
- Status: deployed

## Monitoring Services

| Component | Service | Port |
|---|---|---|
| Grafana | monitoring-grafana | 30923 |
| Prometheus | monitoring-kube-prometheus-prometheus | 30090 |
| Alertmanager | monitoring-kube-prometheus-alertmanager | 9093 |

## Verify Installation

Check monitoring pods:

```powershell
kubectl get pods -n monitoring
```

Check monitoring services:

```powershell
kubectl get svc -n monitoring
```

Check Helm release:

```powershell
helm list -n monitoring
```

## Component Purpose
- Prometheus collects and queries metrics.
- Grafana visualizes metrics using dashboards.
- Alertmanager handles configured alerts.

## Environment
Local Kubernetes cluster running on Minikube.