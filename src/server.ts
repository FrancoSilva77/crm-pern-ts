import express from 'express';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue('Conexión exitosa a la base de datos'));
  } catch (error) {
    // console.log(error);
    console.log(
      colors.red.bold('Hubo un error al conectar en la base de datos')
    );
  }
}

connectDB();

// Instancia de express
const server = express();

// Leer datos de formulario
server.use(express.json());

server.use('/api/products', router);

// Documentacion
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// server.get('/api', (req, res) => {
//   res.json({msg: 'DESDE API'})
// })

export default server;
