import { rest, setupWorker } from 'msw';
import { PropertyProps } from '../types/types';
import { db } from './db';
import { Params, PathParams, UpdateRequestBody } from './types';

export const worker = setupWorker(
  rest.get<undefined, PathParams, PropertyProps[]>(
    '/properties',
    (req, res, ctx) => {
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json(db.property.getAll()),
      );
    },
  ),

  rest.put<UpdateRequestBody, Params>('/properties/:id', (req, res, ctx) => {
    db.property.update({
      where: {
        id: {
          equals: req.params.id as string,
        },
      },
      data: {
        isActive: req.body.isActive,
      },
    });
    return res(ctx.delay(1000), ctx.status(204));
  }),
);
