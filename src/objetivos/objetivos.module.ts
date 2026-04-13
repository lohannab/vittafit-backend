<<<<<<< HEAD
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
=======
import { TypeOrmModule } from "@nestjs/typeorm";
import Module from "module";
>>>>>>> e0f17c26c26632fb7d6a74bdd25f6fd01d491bad
import { Objetivos } from "./entities/objetivos.entity";
import { ObjetivosController } from "./controller/objetivos.controller";
import { ObjetivosService } from "./service/objetivos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Objetivos])],
  controllers: [ObjetivosController],
  providers: [ObjetivosService],
  exports: [ObjetivosService]
})
export class ObjetivosModule {}