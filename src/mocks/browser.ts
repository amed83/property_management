import { setupWorker } from "msw";
import { db } from "./db";

export const worker = setupWorker(...db.property.toHandlers("rest"));
