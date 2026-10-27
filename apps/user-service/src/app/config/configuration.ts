import { MONGODB_CONFIG } from "@org/database/mongodb";
import { JWT_CONFIG } from "@org/server/auth";
import { REDIS_CONFIG } from "@org/server/cache";
import { BCRYPT_CONFIG } from "@org/server/common";
import { PLATFORM_CONFIG, USER_APP_CONFIG } from "@org/server/core";

export const configuration = [
  JWT_CONFIG,
  BCRYPT_CONFIG,
  USER_APP_CONFIG,
  MONGODB_CONFIG,
  PLATFORM_CONFIG,
  REDIS_CONFIG,
];
