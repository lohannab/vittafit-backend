import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Treinos } from "./entities/treinos.entity";
import { TreinoController } from "./controller/treinos.controller";
import { TreinoService } from "./service/treinos.service";
import { Usuario } from "../usuarios/entities/usuarios.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Treinos, Usuario])
    ],
    controllers: [TreinoController],
    providers: [TreinoService],
    exports: [TreinoService]
})
export class TreinoModule {}