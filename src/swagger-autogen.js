const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Todo API',
        description: 'This is a API to manage todos',
    },
    host: 'localhost:3000',
    schemes: ['http']
}

const outputFile = './swagger-output.json';
const endpointFile = ['./index.js'];

swaggerAutogen(outputFile, endpointFile);