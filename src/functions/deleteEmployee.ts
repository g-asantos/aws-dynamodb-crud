import { APIGatewayProxyHandler } from 'aws-lambda';
import {document} from '../utils/dynamoDbClient';
import {AWSError} from 'aws-sdk';

export const handle: APIGatewayProxyHandler = async (event) => {
    
    const {id} = event.pathParameters;
    let message = "";
    let errorHappened = false;


    const params = {
        TableName: "employees",
        Key: {
            id
        },
        ConditionExpression: 'attribute_exists(id)'
    }


    await document.delete(params, (err: AWSError) => {
        if(err){
            message = "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2);
            errorHappened = true;
        } else {
            message = `Employee with id ${id} deleted`
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
            body: JSON.stringify({
                message
            }),
            headers: {
                "Content-type": "application/json"
                }
         }
    }
};