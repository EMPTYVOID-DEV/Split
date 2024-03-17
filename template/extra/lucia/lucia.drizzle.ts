import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { dev } from "$app/environment";
import { Lucia } from "lucia";
import { db } from "../database/database";
import { sessionTable, userTable } from "../database/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes: DatabaseSessionAttributes) => {
    return {
      ...attributes,
    };
  },
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface DatabaseSessionAttributes {}
