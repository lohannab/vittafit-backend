import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dieta } from './dieta/entities/dieta.entity';
import { DietaModule } from './dieta/dieta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // seu usuário aqui
      password: 'root', // sua senha aqui
      database: 'db_vittafit',
      entities: [Dieta],
      synchronize: true
    }),
    DietaModule
  ],
})
export class AppModule { }
