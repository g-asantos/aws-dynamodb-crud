import {document} from '../utils/dynamoDbClient';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {AWSError} from 'aws-sdk';
import {APIGatewayProxyHandler} from 'aws-lambda';

export const handle = async (event) => {
   
    const params = {
        TableName: "employees"
    };
    let message = "";
    const Items = [];
    let errorHappened = false;

    await document.scan(params, onScan).promise();
    
    

    function onScan(err: AWSError, data: DocumentClient.ScanOutput){
        
        if(err){
            message = "Unable to scan the table. Error JSON:" + JSON.stringify(err, null, 2);
            errorHappened = true;
            
        }
        Items.push(data.Items);
      
    }
    console.log(Items);
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

}