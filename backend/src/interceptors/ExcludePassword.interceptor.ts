import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data && data.user) {
          delete data.user.password;
        } else if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.user) {
              delete item.user.password;
            }
          });
        }
        return data;
      })
    );
  }
}