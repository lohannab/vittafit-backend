import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioController } from './controller/usuarios.controller';
import { UsuarioService } from './service/usuarios.service';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario])
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService]
})
export class UsuarioModule {}