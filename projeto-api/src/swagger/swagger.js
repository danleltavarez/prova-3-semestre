const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Cursos e Matrículas',
      version: '1.0.0',
      description: 'API REST para gestão de cursos, alunos e matrículas',
      contact: {
        name: 'Suporte',
        email: 'suporte@escola.com'
      }
    },
    servers: [
      {
        url: '[localhost](http://localhost)',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
