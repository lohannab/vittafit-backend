import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { TreinoService } from "../service/treinos.service";
import { Treino } from "../entities/treinos.entity";


@Controller("treinos")
export class TreinoController {

    constructor(private readonly treinoService: TreinoService) {}

    @Post()
    create(@Body() data: Partial<Treino>) {
        return this.treinoService.create(data);
    }

    @Get()
    findAll() {
        return this.treinoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.treinoService.findOne(Number(id));
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() data: Partial<Treino>) {
        return this.treinoService.update(Number(id), data);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.treinoService.remove(Number(id));
    }
}