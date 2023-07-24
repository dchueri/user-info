import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config'
import config from './database/orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config()),
    UsersModule,
    AuthModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule { }
