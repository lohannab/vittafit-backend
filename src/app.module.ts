import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/entities/usuarios.entity';;
import { Dieta } from './dieta/entities/dieta.entity';
import { Treinos } from './treinos/entities/treinos.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DietaModule } from './dieta/dieta.module';
import { TreinoModule } from './treinos/treinos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,

      username: 'root',
      password: '1234',
      database: 'db_vittafit',
      entities: [Usuario, Dieta, Treinos],
      synchronize: true

    }),

    UsuarioModule,
    DietaModule,
    TreinoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}