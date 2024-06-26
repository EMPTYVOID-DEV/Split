import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { Lucia } from "lucia";
import { db } from "$lib/server/database/database";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    return {
      username: attributes.username,
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
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}

interface DatabaseUserAttributes {
  username: string;
}
