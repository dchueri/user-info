import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config'
import config from './database/orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(config()), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
