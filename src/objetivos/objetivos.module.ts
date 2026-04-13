import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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