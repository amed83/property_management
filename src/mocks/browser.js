import { rest, setupWorker } from 'msw';
import { db } from './db';

export const worker = setupWorker(
  rest.get('/properties', (req, res, ctx) => {
    return res(ctx.delay(400), ctx.status(200), ctx.json(db.property.getAll()));
  }),

  rest.put('/properties/:id', (req, res, ctx) => {
    const updateProperty = db.property.update({
      where: {
        id: {
          equals: req.params.id,
        },
      },

      data: {
        status: req.body.status,
      },
    });

    return res(ctx.delay(1000), ctx.status(200), ctx.json(updateProperty));
  }),
);
