import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Simulate delay in API
 */
@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(delay(3000));
  }
}
