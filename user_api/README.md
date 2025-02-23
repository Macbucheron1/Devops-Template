# User API web application

It is a basic [NodeJS](https://nodejs.org/en) web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

1. Start a basic web server
2. Create a user
3. Get a user
4. Update a user
5. Delete a user

## Prerequisites

Before trying to install the project make sur to install those technologie:

- **[Node.js](https://nodejs.org/en/download/package-manager)** (v18.19.1 +)
- **[Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)** (v7.4.1 +)

## Installation

Follow those step to install the project localy:

1. Clone the repository:

   HTTP:
    ```bash
    git clone https://github.com/Macbucheron1/Devops-Template
    ```
    SSH:
    ```bash
    git clone git@github.com:Macbucheron1/Devops-Template.git
    ```

2. Access the project file :

   ```bash
   cd Devops-Template/user_api
   ```

3. Install dependencies :

   - With _**npm**_ :

     ```bash
     npm install
     ```

## Usage

> [!WARNING]
> Make sur that **Redis** is running before starting the project. To make sure Redis is running use the command `redis-cli PING` and Redis should answer with `PONG`. If not, start Redis with the command `redis-server`.

Make sur you are in the `user_api` directory before running the following command.

### 1. Start a web server

From the root directory of the project run:

```bash
npm start
```

![ApiStart](../images/user_api/ApiStart.png)

It will start a web server available in your browser at http://localhost:3000.

![WebPage](../images/user_api/WebPage.png)

> [!CAUTION] 
> Sometimes you can get error when testing the API because of some process running on the port 3000. If you get an error, you can run the following command to kill the process: `kill -9 $(lsof -ti:3000)`

### 2. Create a user

Send a _POST_ (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"macbucheron","firstname":"Nathan","lastname":"Deprat"}' \
  http://localhost:3000/user
```

It will output:

```json
{ "status": "success", "msg": "OK" }
```

### 3. Get a user

Send a _GET_ (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/user/macbucheron
```

It will output:

```json
{ "status": "success", "msg": { "firstname": "Nathan", "lastname": "Deprat" } }
```

### 4. Update a user

Send a _PUT_ (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"username": "macbucheron", "firstname":"Ibrahim", "lastname":"Diallo"}' \
  http://localhost:3000/user/update
```

It will output:

```json
{ "status": "success", "msg": "OK" }
```

### 5. Delete a user

Send a _DELETE_ (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request DELETE \
  http://localhost:3000/user/macbucheron
```

It will output:

```json
{ "status": "success", "msg": "Number of rows deleted: 1" }
```

### 6. Health check 

Send a _GET_ (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/health
```

It will output (with different uptime and timestamp):

```json
{ "uptime": 103.347303221, "status": "OK", "timestamp": 1732315440692 }
```

## API documentation

We have created an Api documentation using [Swagger](https://swagger.io/). You can access it by going to the following link: [API documentation](http://localhost:3000/api-docs/)

## Testing

From the root directory of the project, run:

```bash
npm test
```

it will run the test suite and output the result :

![TestResult](../images/user_api/TestResult.png)

## [Back to main README](../README.md#1-create-a-web-application)

Let's go back to the main README to continue the project's walkthrough.