import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

function getClient() {
    if (!process.env.POSTGRES_URL) {
          throw new Error('POSTGRES_URL environment variable is not set');
    }
    return postgres(process.env.POSTGRES_URL);
}

let _client: ReturnType<typeof postgres> | undefined;
let _db: PostgresJsDatabase<typeof schema> | undefined;

export function getDb() {
    if (!_db) {
          _client = getClient();
          _db = drizzle(_client, { schema });
    }
    return _db;
}

// Keep backward-compatible exports using lazy getters
export const client = new Proxy({} as ReturnType<typeof postgres>, {
    get(_, prop) {
          if (!_client) _client = getClient();
          return (_client as any)[prop];
    },
});

export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
    get(_, prop) {
          return (getDb() as any)[prop];
    },
});
