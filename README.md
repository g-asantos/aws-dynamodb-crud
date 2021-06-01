# AWS DYNAMODB CRUD

REST API for a CRUD employee management system, using serverless framework, aws and dynamodb

### Installation


Clone the project with:

```sh
git clone https://github.com/g-asantos/aws-dynamodb-crud.git
```

Get in the project's path, then install the dependencies with:

```sh
yarn install
```

In case you wanna test the project locally, to start dynamodb run:

```sh
yarn dynamo:start
```

Then you can start the project with:

```sh
yarn dev
```

To deploy in AWS:

```sh
yarn deploy
```

# AWS DYNAMODB CRUD API Specification


### 1. Create Employee

**Resource URL (public resource)**

    POST /createEmployee

**Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|name|string|Name of the employee |true|
|age|string|Aage of the employee|true|
|role|string|Role of the employee|true|

Returns message telling if employee was created or not.

**Example Request**

    {
      "name": "testname",
      "age": "12",
      "role": "manager"
    }

**Example Response**

    Response Code: 201 - CREATED
    Body:
    {
      "message": "Employee created"
    }
    
### 2. Get all employees

**Resource URL (public resource)**

    GET /getAllEmployees

**Parameters**

No parameters required.

Returns a list with all employees registered in the system.

**Example Request**

No body necessary in the request.

**Example Response**

    Response Code: 200 - OK
    Body:
    [
      {
        "name": "testnamez",
        "id": "69f202ab-85a3-4a93-9272-5c3b0a131ba6",
        "role": "manager",
        "age": "12"
      }
    ]
    
### 3. Get employee by id

**Resource URL (public resource)**

    GET /getEmployeeById/{id}

**Query Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|id|string|id of the employee |true|

Returns employee information that matches id in the query params.

**Example Request**


No body necessary in the request.


**Example Response**

    Response Code: 200 - OK
    Body:
    {
      "name": "testname",
      "id": "fd90e2e5-8073-4dad-a0ec-aa84552a564b",
      "role": "manager",
      "age": "12"
    }

### 4. Update employee

**Resource URL (public resource)**

    PUT /updateEmployee/{id}

**Query Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|id|string|id of the employee |true|

Returns updated employee information that matches id in the query params.

**Example Request**
    
    {
      "name": "thiswillwork",
      "age": "1000",
      "role": "unknown"
    }

**Example Response**

    Response Code: 200 - OK
    Body:
    {
      "name": "thiswillwork",
      "age": "1000",
      "role": "unknown"
    }

### 5. Delete a employee

**Resource URL (public resource)**

    DELETE /deleteEmployee/{id}

**Query Parameters**

|Parameter|Type|Description|Required|
|---------|----|-----------|--------|
|id|string|id of the employee |true|

Returns message if the employee was deleted.

**Example Request**

No body necessary in the request.    

**Example Response**

    Response Code: 200 - OK
    Body:
    {
      "message": "Employee with id 69f202ab-85a3-4a93-9272-5c3b0a131ba6 deleted"
    }

## Built with

- NodeJS
- Typescript
- Serverless
- AWS
- DynamoDB

## Author

  **Guilherme Azevedo dos Santos**

* Github: [@g-asantos](https://github.com/g-asantos)
* Linkedin: [@guilherme-azevedo-dos-santos-417a70159](https://www.linkedin.com/in/guilherme-azevedo-dos-santos-417a70159/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
