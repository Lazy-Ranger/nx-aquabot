import { BCRYPT_CONFIG, JWT_CONFIG } from "@org/server/common";
import {
  APP_CONFIG,
  DATABASE_CONFIG,
  PLATFORM_CONFIG,
  REDIS_CONFIG,
} from "@org/server/core";

export const configuration = [
  JWT_CONFIG,
  BCRYPT_CONFIG,
  APP_CONFIG,
  DATABASE_CONFIG,
  PLATFORM_CONFIG,
  REDIS_CONFIG,
];
