import { ItemModule } from './item/item.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        ItemModule
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class ServiceLayerModule { }
