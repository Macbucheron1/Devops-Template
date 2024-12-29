# Kubernetes

<div style="text-align: center;">
  <img src="../images/k8s/K8S-logo.png" alt="Description de l'image" style="width: 40%;" />
</div>

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation.

In this directory, you will find the following:
- [Istio/bin](./istio/bin/): The istioctl binary for Istio service mesh.
- [Redis](./redis/):
    - [deployment.yaml](./redis/deployment.yaml): A Kubernetes deployment file for Redis.
    - [service.yaml](./redis/service.yaml): A Kubernetes service file for Redis.
    - [redis-pvc.yaml](./redis/redis-pvc.yaml): A Kubernetes persistent volume claim file for Redis.
    - [redis-pv.yaml](./redis/redis-pv.yaml): A Kubernetes persistent volume file for Redis.
- [User API](./user-api/):
    - [deployment.yaml](./user-api/deployment.yaml): A Kubernetes deployment file for the user API.
    - [ervice.yaml](./user-api/service.yaml): A Kubernetes service file for the user API.
    - [destination-rule.yaml](./user-api/destination-rule.yaml): A Kubernetes destination rule file for the user API.
    - [gateway.yaml](./user-api/gateway.yaml): A Kubernetes gateway file for the user API.
    - [virtual-service.yaml](./user-api/virtual-service.yaml): A Kubernetes virtual service file for the user API.
    - [service-istio.yaml](./user-api/service-istio.yaml): A Kubernetes service file for the user API with Istio.
- [User Api Azure](./user-api-azure/):
    - [deployment.yaml](./user-api-azure/deployment.yaml): A Kubernetes deployment file for the user API on Azure.

## Objectives

The directory answers to the following objectives:

- Deploy our API on a Kubernetes cluster along with a Redis database using a persistent volume.
- Use Istio service mesh to manage traffic between services.

## Tools

We have created two scripts to help you setup and try Kubernetes and Istio:
- [launch.sh](./launch.sh): A script to launch a Kubernetes cluster with Minikube. It will launch our API along with a Redis database.
- [launch_istio.sh](./launch_istio.sh): A script to launch a Kubernetes cluster with Minikube and Istio. It will launch our API along with a Redis database and Istio service mesh.