import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(BadRequestException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const properError = new WsException(exception.getResponse());
    super.catch(properError, host);
  }
}
