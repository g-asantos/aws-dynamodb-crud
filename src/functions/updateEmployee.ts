import {document} from '../utils/dynamoDbClient';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {AWSError} from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

interface IUpdateEmployee{
    name: string;
    age: string;
    role: string;
}


export const handle: APIGatewayProxyHandler  = async (event) => {
    
    const { name, age, role} = JSON.parse(event.body) as IUpdateEmployee;
    const {id} = event.pathParameters;
    let message = "";
    const Items = [];
    let errorHappened = false;

    if(!name || !age || !role){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Missing parameter"
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
    }
    
    const params = {
        TableName: "employees",
        Key: {
            id: id
        },
        UpdateExpression: "set #name = :n, #age = :a, #role = :r",
        ExpressionAttributeValues: {
            ":n": name,
            ":a": age,
            ":r": role
        },
        ExpressionAttributeNames: {
            "#name": "name",
            "#age": "age",
            "#role": "role",
          },
        ReturnValues:"UPDATED_NEW",
        ConditionExpression: 'attribute_exists(id)'
    }

    await document.update(params, (err: AWSError, data: DocumentClient.UpdateItemOutput) => {
        if(err){
            message = "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2);
            errorHappened = true;
        } else {
            Items.push(data.Attributes);
        }
    }).promise();


    if(errorHappened){
        return {
                statusCode: 400,
                body: JSON.stringify({
                    message
                }),
                headers: {
                    "Content-type": "application/json"
                    }
        }
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify(Items[0]),
            headers: {
                "Content-type": "application/json"
                }
         }
    }

};