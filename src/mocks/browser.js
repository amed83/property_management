import { rest, setupWorker } from 'msw';
import { db } from './db';

// export const worker = setupWorker(...db.property.toHandlers('rest'));

export const worker = setupWorker(
  rest.get('/properties', (req, res, ctx) => {
    return res(ctx.delay(1200), ctx.status(200), ctx.json([]));
  }),

  rest.put('/properties/:id', (req, res, ctx) => {
    console.log('params', req.params);
    console.log('body', req.body);
    const updateProperty = db.property.update({
      where: {
        id: {
          equals: req.params.id,
        },
      },
      data: {
        isActive: req.body?.isActive,
      },
    });

    return res(ctx.delay(1000), ctx.status(200), ctx.json(updateProperty));
  }),
);
