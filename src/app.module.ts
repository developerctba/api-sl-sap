import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { SapModule } from './core/sap/sap.module';

@Module({
  imports: [
    SapModule
  ]
})
export class AppModule { }
