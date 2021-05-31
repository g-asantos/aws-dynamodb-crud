import {document} from '../utils/dynamoDbClient';
import { v4 as uuidv4 } from 'uuid';

interface ICreateEmployee{
    name: string;
    age: string;
    role: string;
}


export const handle = async (event) => {
    
    const { name, age, role} = JSON.parse(event.body) as ICreateEmployee;

    const id = uuidv4();

    await document.put({
        TableName: "employees",
        Item: {
            id: id,
            name,
            age,
            role,
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Employee created"
        }),
        headers: {
            "Content-type": "application/json"
        }
    };

};