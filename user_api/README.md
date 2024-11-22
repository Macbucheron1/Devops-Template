# User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

1. Start a web server
2. Create a user
3. Get a user
4. Update a user
5. Delete a user 

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:3000.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"macbucheron","firstname":"Nathan","lastname":"Deprat"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

3. Get a user 

Send a GET (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/user/macbucheron
```

It will output:

```
{"status":"success","msg":{"firstname":"Nathan","lastname":"Deprat"}}                              
```


4. Update a user 

Send a PUT (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"username": "macbucheron", "firstname":"Ibrahim", "lastname":"Diallo"}' \
  http://localhost:3000/user/update
```

It will output:

```
{"status":"success","msg":"OK"}                           
```

5. Delete a user

Send a Delete (REST protocol) request using terminal

```bash
curl --header "Content-Type: application/json" \
  --request DELETE \
  http://localhost:3000/user/macbucheron
```

It will output:

```
{"status":"success","msg":1}%                          
```


## Testing

From the root directory of the project, run:

```
npm test
```

## To do list 

- [ ] complete readme
- [ ] Doc all the file
- [ ] Transform all the .js in .ts (make sur  that all variable have a type)
- [ ] add postman way to test 