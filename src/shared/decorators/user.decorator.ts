import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '@interfaces';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as ITokenPayload;
});
