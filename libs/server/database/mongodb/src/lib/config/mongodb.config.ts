import { registerAs } from "@nestjs/config";

export interface MongodbConfig {
  "mongodb.user": string;
  "mongodb.password": string;
  "mongodb.host": string;
  "mongodb.db": string;
  "mongodb.port": string;
  "mongodb.url": string;
  "mongodb.isLocal": boolean;
}

export const MONGODB_CONFIG = registerAs("mongodb", () => {
  const userName = process.env["MONGO_DATABASE_USER"];
  const password = process.env["MONGO_DATABASE_PASSWORD"];
  const host = process.env["MONGO_DATABASE_HOST"];
  const db = process.env["MONGO_DATABASE_NAME"];
  const port = process.env["MONGO_DATABASE_PORT"];

  return {
    user: userName,
    password,
    host,
    db,
    port,
    get url() {
      if (process.env["NODE_ENV"] === "local") {
        return {
          uri: `mongodb://localhost:27017/${db}`,
        };
      }

      return `mongodb+srv://${userName}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    },
    get isLocal() {
      return process.env["DATABASE_HOST"]?.includes("localhost") ?? false;
    },
  };
});
