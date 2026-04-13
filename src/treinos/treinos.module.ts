import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Treino } from "./entities/treinos.entity";
import { TreinoController } from "./controller/treinos.controller";
import { TreinoService } from "./service/treinos.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Treino]) 
    ],
    controllers: [TreinoController],
    providers: [TreinoService],
    exports: [TreinoService] 
})
export class TreinoModule {}