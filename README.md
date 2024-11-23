# ECE Devops Project

## Table of content

- [Description](#description)
- [Install](#install)

## Description

This is the repository for the Devops project at ECE Paris

Made by:

- Nathan DEPRAT [@Macbucheron1](https://github.com/Macbucheron1)
- Ibrahim Diallo [@Xeroxx75](https://github.com/Xeroxx75)

## Install

Follow those step to install the project localy:

1. Clone the repository:

   ```bash
   git clone https://github.com/Macbucheron1/EceDevops_lab1.git
   ```

2. Access the project file :

   ```bash
   cd nom-du-projet
   ```

3. Install dependencies :

   - With **npm** :

     ```bash
     npm install
     ```

If you correctly followed all of the step you are now ready to use the project.

## Usage

To start the project you can use the following command:

```bash
npm start
```

It will start a web server available in your browser at http://localhost:3000.
To get an complete list of the possibility of the project you can check the [User API folder](./user_api/README.md)

## 1. Create a Web Application

Find all of the information in the [User API folder](./user_api/README.md). A link to come back to this page is available at the end of the README.

## 2. Apply CI/CD pipeline

### CI

The first CI pipeline we have made is using Github Actions. It is triggered on every push on the main branch. It run the following steps:

1. Check the code
2. Setup Redis
3. Check if Redis is running
4. Setup Node.js
5. Install dependencies
6. Run Linter to check the code

   > Linter is a tool that analyze the code to find errors and bugs. It also enforce a coding style. In our case we are using ESLint. You can find the configuration in the [.eslintrc.json](./user_api/.eslintrc.json) file.

7. Run the tests for the User API

Here is the result of a successful run:

![CI_UserApi](./images/CI_CD/CI_UserApi.png)

One of the feature of Github Actions is that it can run on multiple OS. Here is the result of 3 different OS:

![CI_UserApi_Windows](./images/CI_CD/FailedWindowsCI.png)

The third job is failing because the Redis server is not available on Windows.
The second one as being stopped because of the error in the third job to economize resources.

We have to remove the Windows job to have a successful run on all OS. Therefore our final CI pipeline is only running on MacOS and Linux.

Now here is the result of successful jobs on Linux and MacOS:

![UbuntuMacOSResult](./images/CI_CD/UbuntuMacOsCIResult.png)

_**Why did we install Redis instead of using a container?**_

We have chosen to install Redis in order to make it work on Linux AND MacOS. Indeed, [Docker container are not available on MacOS](https://docs.github.com/en/actions/sharing-automations/creating-actions/about-custom-actions#types-of-actions). Therefore, we have to install Redis on the host machine in order to make it work on MacOS.

_**Why did we uploads the user_api directory as an artifact instead of zipping all file in the repository and upload it as the deployment artifact ?** (As it was done in the [lab correction](https://github.com/adaltas/ece-devops-2024-fall/blob/main/modules/05.ci-cd/lab-corrections/master_user-api.yml))_

This choice was made from multiple reasons:

   1. By uploading the `user_api` directory, we are only uploading the necessary files for the User API. This is more efficient than uploading the whole repository.
   2. Using `user_api` allows the artifact to be easily consummed in Docker-based and non-Docker-based deployment scenarios.

In the lab correction, zipping the entire repository might have been simpler for a single deployment job focused on Azure Web App. However, in our case, the multi-job nature of the pipeline and the future integration of Docker-based deployment made the `user_api` directory a better choice.

### CD

## 3. Configuring and provisioning a virtual environment and run our application using the IaC approach

## 4. Building Docker image of our application

## 5. Making container orchestration using Docker Compose

## 6. Making docker orchestration using Kubernetes

## 7. Making a service mesh using Istio

## 8. Implementing Monitoring to our containerized application
