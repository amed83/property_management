import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { db } from './db';

// export const server = setupServer(...db.property.toHandlers('rest'));

export const server = setupServer(
  rest.get('/properties', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1a',
          address: 'Red Deer Road, Cambuslang, Glasgow G72',
          askingPrice: 120000,
          status: 'active',
          bedroomsNumber: 3,
          imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg1a.jpeg`,
        },
        {
          id: '2a',
          address: `"Lockwood" at Mayfield Boulevard, East Kilbride, Glasgow G75`,
          askingPrice: 145000,
          status: 'expired',
          bedroomsNumber: 5,
          imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg2a.jpeg`,
        },
        {
          id: '3a',
          address: `222 Nitshill Road, Glasgow G53`,
          askingPrice: 350000,
          status: 'active',
          bedroomsNumber: 2,
          imageUrl: `${process.env.PUBLIC_URL} assets/images/houseImg3a.jpeg`,
        },
      ]),
    );
  }),

  rest.put('/properties/:id', (req, res, ctx) => {
    const updateProperty = db.property.update({
      where: {
        id: {
          equals: req.params.id,
        },
      },
      data: {
        status: req.body?.status,
      },
    });

    return res(ctx.status(200), ctx.json(updateProperty));
  }),
);
