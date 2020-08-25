import { ServiceLayerModule } from './service-layer/service-layer.module';
import { Module, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './service-layer/auth/auth.interceptor';
var https = require('https');

@Module({
    imports: [
        ServiceLayerModule,
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 50000,
                maxRedirects: 5,
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }),
        })
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthInterceptor,
        }
    ]
})
export class SapModule { }
