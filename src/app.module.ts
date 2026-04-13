import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treino } from './treinos/entities/treinos.entity';
import { TreinoModule } from './treinos/treinos.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // seu usuário aqui
      password: 'root', // sua senha aqui
      database: 'db_vittafit',
      entities: [Treino],
      synchronize: true
    }),
    TreinoModule
  ],
})
export class AppModule { }