import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dieta } from "./entities/dieta.entity";
import { DietaService } from "./service/dieta.service";
import { DietaController } from "./controller/dieta.controller";
import { Usuario } from "../usuarios/entities/usuarios.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Dieta, Usuario])
    ],
    providers: [DietaService],
    controllers: [DietaController],
    exports: [DietaService]
})
export class DietaModule {}