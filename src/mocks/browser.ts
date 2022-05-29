import { rest, setupWorker } from 'msw';
import { db } from './db';

export const worker = setupWorker(...db.property.toHandlers('rest'));

// simulate error

// export const worker = setupWorker(
//   rest.get('/login', (req, res, ctx) => {
//     return res(
//       // Send a valid HTTP status code
//       ctx.status(403),
//       // And a response body, if necessary
//       ctx.json({
//         errorMessage: `error fetching data`,
//       }),
//     );
//   }),
// );
