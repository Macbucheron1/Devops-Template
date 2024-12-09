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

# Check if Istio is already installed
export PATH=$PWD/istio/bin:$PATH

# Install Istio
echo "Installing Istio..."
istioctl install --set profile=demo -y

# Label default namespace with istio-injection=enabled
kubectl label namespace default istio-injection=enabled

# Wait for Istio components to be ready
echo "Waiting for Istio components to become ready..."
kubectl rollout status deployment/istiod -n istio-system

# Inserting secret
kubectl create secret generic redis-secret --from-literal=REDIS_PASSWORD=WgLWe7J6nkr1FQ1wYFrY3Hk1UI0G74Mw9AzCaFdUS4c=

# Apply Kubernetes manifests.
echo "Applying Kubernetes manifests..."

# Deploy Redis components
kubectl apply -f redis/redis-pv.yaml
kubectl apply -f redis/redis-pvc.yaml
kubectl apply -f redis/deployment.yaml
kubectl apply -f redis/service.yaml

# Deploy User API components
kubectl apply -f user-api/deployment.yaml
kubectl apply -f user-api/service-istio.yaml
kubectl apply -f user-api-azure/deployment.yaml

# Wait for Redis Deployment to be ready
echo "Waiting for Redis Deployment to become ready..."
kubectl rollout status deployment/redis-deployment

# Wait for User API Deployment to be ready
echo "Waiting for User API Deployment to become ready..."
kubectl rollout status deployment/user-api-deployment

# Open User API Service URL
minikube service user-api-service

echo "Deployment completed successfully!"
