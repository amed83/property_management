import { setupServer } from 'msw/node';
import { db } from './db';

export const server = setupServer(...db.property.toHandlers('rest'));
