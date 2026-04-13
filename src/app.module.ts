import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuarioModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // seu usuário aqui
      password: 'root', // sua senha aqui
      database: 'db_vittafit', // nome do banco de dados
      entities: [Usuario],
      synchronize: true
    }),
    UsuarioModule,
  ],
})
export class AppModule { }
