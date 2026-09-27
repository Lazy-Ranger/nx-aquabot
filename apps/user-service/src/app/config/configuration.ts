import { MONGODB_CONFIG } from "@org/database/mongodb";
import { JWT_CONFIG } from "@org/server/auth";
import { REDIS_CONFIG } from "@org/server/cache";
import { BCRYPT_CONFIG } from "@org/server/common";
import { APP_CONFIG, PLATFORM_CONFIG } from "@org/server/core";

export const configuration = [
  JWT_CONFIG,
  BCRYPT_CONFIG,
  APP_CONFIG,
  MONGODB_CONFIG,
  PLATFORM_CONFIG,
  REDIS_CONFIG,
];
