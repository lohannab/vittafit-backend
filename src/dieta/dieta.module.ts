import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dieta } from "./entities/dieta.entity";
import { DietaService } from "./service/dieta.service";
import { DietaController } from "./controller/dieta.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Dieta])],
    providers: [DietaService],
    controllers: [DietaController],
    exports: [DietaService]
})
export class DietaModule {} 