import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioService } from './service/usuarios.service';
import { UsuarioController } from './controller/usuarios.controller';
 
@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), 
  forwardRef(() => UsuarioModule)],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}