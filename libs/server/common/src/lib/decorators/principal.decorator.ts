import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IHttpRequest } from "@org/server/common";

export const Principal = createParamDecorator(
  (
    dataOrKey: keyof NonNullable<IHttpRequest["user"]> | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<IHttpRequest>();

    if (!request.user) {
      return null;
    }

    if (dataOrKey) {
      return request.user[dataOrKey];
    }

    return request.user;
  },
);
