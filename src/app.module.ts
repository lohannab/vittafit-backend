import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Treinos } from './treinos/entities/treinos.entity';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { Dieta } from './dieta/entities/dieta.entity';
import { Objetivos } from './objetivos/entities/objetivos.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { ObjetivosModule } from './objetivos/objetivos.module';
import { DietaModule } from './dieta/dieta.module';
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
      entities: [Treinos, Usuario, Dieta, Objetivos],
      synchronize: true
    }),

    TreinoModule,
    DietaModule,
    ObjetivosModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }