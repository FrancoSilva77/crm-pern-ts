import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products',
      },
    ],
    info: {
      title: 'REST API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API Docs for products',
    },
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://franco-silva-cv.vercel.app/img/Logo.png');
      height: auto;
      width: 40px;
    }
    .swagger-ui .topbar {
      background-color: black;
    }
  `,
  customSiteTitle: 'Documentación REST API Express / API',
};

export default swaggerSpec
export {
  swaggerUiOptions
}