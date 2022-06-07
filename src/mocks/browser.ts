import { rest, setupWorker } from 'msw';
import { db, mockedProperties } from './db';

export const worker = setupWorker(...db.property.toHandlers('rest'));

// export const worker = setupWorker(
//   rest.get('/properties', (req, res, ctx) => {
//     return res(ctx.delay(400), ctx.status(200), ctx.json(mockedProperties));
//   }),

//   rest.put(`/properties/:id`, (req, res, ctx) => {
//     console.log('body', req.params);

//     const newData = mockedProperties.map((prop) => {
//       console.log('body', req.body);
//       if (prop.id === req.params.id) {
//         return {
//           ...prop,
//           status: req.body,
//         };
//       }
//       return prop;
//     });

//     console.log('newData', newData);

//     return res(ctx.delay(400), ctx.status(200), ctx.json(newData));
//   }),
// );
