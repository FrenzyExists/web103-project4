const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
const port = 3002;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./routes/*.js', './webpack/swagger-config.yaml'], // Path to the API docs
};

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

