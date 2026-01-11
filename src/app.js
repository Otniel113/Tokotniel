import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }', // Optional: Remove the top bar for a cleaner look
  customSiteTitle: "Tokotniel API Docs",
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello World!</h1>
    <p>To test the API, go to <a href="/api-docs">Swagger UI in /api-docs</a></p>
  `);
});

export default app;
