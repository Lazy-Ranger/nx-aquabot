import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { userAgentMiddleware } from "@org/server/common";
import { UserAppConfig, UserAppEnv } from "@org/server/core";
import { BadRequest } from "@org/server/exceptions";
import { ErrorCode } from "@org/utils/codes";
import cookieParser from "cookie-parser";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<UserAppConfig>);

  const port = configService.getOrThrow<number>("user-app.port");
  const appEnv = configService.getOrThrow<UserAppEnv>("user-app.env");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const fieldViolations = errors.flatMap((error) =>
          Object.values(error.constraints ?? {}).map((message) => ({
            field: error.property,
            description: message,
          })),
        );
        const statusCode = ErrorCode.INVALID_ARGUMENT;
        const error = new BadRequest(fieldViolations);
        error.code = statusCode;
        error.message =
          "Request is improperly formatted or contains invalid values.";
        return error;
      },
    }),
  );

  app.use(cookieParser());
  app.use(userAgentMiddleware());

  await app.listen(port);

  console.log(
    `User Application is running on: http://localhost:${port} in env ${appEnv}`,
  );
}
bootstrap();
