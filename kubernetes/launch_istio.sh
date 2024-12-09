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

# Deploy Istio Gateway and VirtualService and DestinationRule
kubectl apply -f user-api/gateway.yaml
kubectl apply -f user-api/virtual-service.yaml
kubectl apply -f user-api/destination-rule.yaml

# Wait for Redis Deployment to be ready
echo "Waiting for Redis Deployment to become ready..."
kubectl rollout status deployment/redis-deployment

# Wait for User API Deployment to be ready
echo "Waiting for User API Deployment to become ready..."
kubectl rollout status deployment/user-api-deployment

# Start minikube tunnel in the background
echo "Starting minikube tunnel..."
minikube tunnel &

MAX_RETRIES=10
RETRY=0
while [ -z "$INGRESS_IP" ] && [ $RETRY -lt $MAX_RETRIES ]; do
  echo "Retrying to get Istio Ingress Gateway IP..."
  sleep 5
  INGRESS_IP=$(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  RETRY=$((RETRY + 1))
done

# Mettre à jour le fichier hosts en écrasant toute entrée existante pour user-api.local
# Supprimer toute ligne existante contenant 'user-api.local'
sudo sed -i.bak '/user-api-service\.local/d' /etc/hosts
# Ajouter la nouvelle entrée
echo "$INGRESS_IP user-api-service.local" | sudo tee -a /etc/hosts > /dev/null


# Vérifier si l'IP est obtenue
if [ -z "$INGRESS_IP" ]; then
  echo "Unable to obtain Istio Ingress Gateway IP. Exiting..."
  exit 1
else
  echo "Istio Ingress Gateway IP: $INGRESS_IP"
fi




# Ouvrir le navigateur avec l'URL appropriée
echo "Opening browser to http://user-api-service.local"
open http://user-api-service.local

echo "Deployment completed successfully!"