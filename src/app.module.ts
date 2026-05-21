import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { Dieta } from './dieta/entities/dieta.entity';
import { Treinos } from './treinos/entities/treinos.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DietaModule } from './dieta/dieta.module';
import { TreinoModule } from './treinos/treinos.module';

const isProduction = process.env.DATABASE_URL ? true : false;

@Module({
  imports: [
    TypeOrmModule.forRoot(
      isProduction
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [Usuario, Dieta, Treinos],
            synchronize: true, 
            ssl: {
              rejectUnauthorized: false, 
            },
          }
        : {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_vittafit',
            entities: [Usuario, Dieta, Treinos],
            synchronize: true,
          },
    ),

    UsuarioModule,
    DietaModule,
    TreinoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}