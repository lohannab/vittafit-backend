import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Treinos } from "./entities/treinos.entity";
import { TreinoController } from "./controller/treinos.controller";
import { TreinoService } from "./service/treinos.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Treinos]) 
    ],
    controllers: [TreinoController],
    providers: [TreinoService],
    exports: [TreinoService] 
})
export class TreinoModule {}