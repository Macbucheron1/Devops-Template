#!/bin/bash

echo "==== Launching Kubernetes Application ===="

# Check if Minikube is running
minikube status &> /dev/null
if [ $? -ne 0 ]; then
  echo "Starting Minikube..."
  minikube start
else
  echo "Minikube is already running."
fi

# Set kubectl context to Minikube
kubectl config use-context minikube


# Apply Kubernetes manifests.
echo "Applying Kubernetes manifests..."

# Deploy Redis components
kubectl apply -f redis/redis-pv.yaml
kubectl apply -f redis/redis-pvc.yaml
kubectl apply -f redis/deployment.yaml
kubectl apply -f redis/service.yaml

# Deploy User API components
kubectl apply -f user-api/deployment.yaml
kubectl apply -f user-api/service.yaml

# Wait for Redis Deployment to be ready
echo "Waiting for Redis Deployment to become ready..."
kubectl rollout status deployment/redis-deployment

# Wait for User API Deployment to be ready
echo "Waiting for User API Deployment to become ready..."
kubectl rollout status deployment/user-api-deployment

# Open User API Service URL
minikube service user-api-service

echo "Deployment completed successfully!"
