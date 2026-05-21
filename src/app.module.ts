import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { Dieta } from './dieta/entities/dieta.entity';
import { Treinos } from './treinos/entities/treinos.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DietaModule } from './dieta/dieta.module';
import { TreinoModule } from './treinos/treinos.module';

@Module({
  imports: [
    // 1. Carrega o módulo de configuração para ler o .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configura o banco dinamicamente usando o ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [Usuario, Dieta, Treinos],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        } else {
          return {
            type: 'mysql',
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 3306),
            username: configService.get<string>('DB_USERNAME', 'root'),
            password: configService.get<string>('DB_PASSWORD', 'root'),
            database: configService.get<string>('DB_DATABASE', 'db_vittafit'),
            entities: [Usuario, Dieta, Treinos],
            synchronize: true,
          };
        }
      },
    }),

    UsuarioModule,
    DietaModule,
    TreinoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}