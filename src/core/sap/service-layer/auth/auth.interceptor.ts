import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SAPSession } from '../shared/interface/sap-session.interface';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        console.log('Before...');
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        return await this.validateRequest().then( (sapSession: SAPSession) =>{
            request.sapSession = sapSession;
            
            return next.handle().pipe( tap( () => { 
                    console.log(`After... ${Date.now() - now}ms` )
                })
            );

        }).catch( e => {
            console.log(e)
            throw new UnauthorizedException("Falha de autenticação com SAP!");
        })
    }

    async validateRequest(): Promise<SAPSession> {
        const user: SAPSession = await this.authService.auth();
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
