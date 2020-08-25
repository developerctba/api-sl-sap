import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [AuthService]
})
export class AuthModule {}
