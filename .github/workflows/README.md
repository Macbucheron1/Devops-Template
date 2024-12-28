# Workflows

In this Directory, you can find all the workflows that are used in this repository.
If you wish to use those workflows in your own repository, make sur to add the different secrets and environment variables that are used in the workflows.

## CI User Api

This workflow is used to test the User Api. It runs on every push made in the `user_api` directory.
We testing the api on the following:
- OS: Ubuntu-latest / Macos-latest 
- Node: 18.x / 20.x / 22.x
- Redis: 6.x

This file is used to demonstrate the different fonctionnality of a CI pipeline in Github Actions. 
Even using a matrix strategy, testing on multiple OS, Node version and Redis version is heavy and time consuming.

For this reason, we have created a second workflow

## CI CD User Api Azure

This workflow is used to test the User Api and then deploy it to Azure. It runs on every made in the `user_api_Azure` directory.
 
> [!NOTE]
> The difference between `user_api` and `user_api_Azure` is that the `user_api_Azure` is another version of the User Api configured to work using a Redis database hosted on Azure.

We testing the api on the following:
- OS: Ubuntu-latest
- Node: 18.x 

Then we deploy the api to Azure 

## CI DockerHub

This workflow is used to build and push the Docker image of the User Api to DockerHub. It runs on every push made in the `user_api` directory.