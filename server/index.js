import express from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { studentsRouter } from './routes/students.js';
import { coursesRouter } from './routes/courses.js';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';

const PORT = 3000;
export const app = express();

const options = {
  info: {
    title: 'Schedule API',
    version: '1.0.0',
    description: 'Schedule API',
  },
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          surname: { type: 'string' },
          email: { type: 'string' },
        },
      },
      Schedule: {
        type: 'object',
        properties: {
          day: { type: 'string' },
          group: { type: 'string' },
          time: { type: 'string' },
          course: { type: 'string' },
          location: { type: 'string' },
        },
      },
    },
  },
};

const route = ['./server/index.js'];
const def = await swaggerAutogen({ openapi: '3.0.0' })('./swagger.json', route, options);

app.use(cors({ origin: '*' }));
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

if (def) {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(def));
}

app.get('/hello/:id', (req, res) => {
  faker.internet.email();
  const id = req.params.id;
  res.send('world');
});

app.listen(PORT, () => {
  console.log(`Started on port: ${PORT}!`);
});

function generateSchedule() {
  return {
    day: faker.date.weekday(),
    group: faker.person.firstName(),
    time: faker.date.future().toLocaleDateString(),
    course: faker.word.noun(),
    location: faker.location.city(),
  };
}
