import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // seu usuário aqui
      password: 'root', // sua senha aqui
      entities: [],
      synchronize: true
    }),
  ],
})
export class AppModule { }
