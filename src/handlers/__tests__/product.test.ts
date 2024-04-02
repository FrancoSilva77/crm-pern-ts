import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Monitor curvo',
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('should validate that the price is a number and is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Monitor curvo',
      price: 'Hola',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it('Should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Pilas - Tesing',
      price: 10,
    });

    // expect(response.status).toBe(201);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('error');
  });
});

describe('GET /api/products', () => {
  it('should check if /api/products', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(404);
  });

  it('GET a JSON response with products', async () => {
    const response = await request(server).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products/:id', () => {
  it('Should return a 404 response for a non-exitent product', async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Producto no encontrado');
  });

  it('should check a valid ID in URL', async () => {
    const response = await request(server).get('/api/products/not-valid-url');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no Válido');
  });

  it('get a JSON response for a single product', async () => {
    const response = await request(server).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /api/products/:id', () => {
  it('should check a valid ID in URL', async () => {
    const response = await request(server)
      .put('/api/products/not-valid-url')
      .send({
        name: 'Television 30 pulgadas Actualizado',
        price: 100,
        availability: false,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no Válido');
  });

  it('should display validation error messages when updating a product', async () => {
    const response = await request(server).put('/api/products/1').send({});

    expect(response.status).toBe(400);
    // * Las siguientes 2 opciones es lo mismo
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).put('/api/products/1').send({
      name: 'Television 30 pulgadas Actualizado',
      price: 0,
      availability: false,
    });

    expect(response.status).toBe(400);
    // * Las siguientes 2 opciones es lo mismo
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('El precio no es válido');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should return a 404 response for a non-existent product', async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Television 30 pulgadas Actualizado',
        price: 100,
        availability: false,
      });

    expect(response.status).toBe(404);
    // * Las siguientes 2 opciones es lo mismo
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should update an existing product with valid data', async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: 'Television 30 pulgadas Actualizado',
      price: 100,
      availability: true,
    });

    expect(response.status).toBe(200);
    // * Las siguientes 2 opciones es lo mismo
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('DELETE /api/products/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/products/not-valid');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('ID no Válido');
  });

  it('should return a 404 response for a npn-existent product', async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
  });

  it('should delete a product', async ()=> {
    const response = await request(server).delete('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('Producto eliminado');

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
});
