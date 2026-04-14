import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put
} from "@nestjs/common";
import { TreinoService } from "../service/treinos.service";
import { Treinos } from "../entities/treinos.entity";


@Controller("treinos")

export class TreinoController {

    constructor(private readonly treinoService: TreinoService) {}

    @Get()
    findAll(): Promise<Treinos[]> {
        return this.treinoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Treinos> {
        return this.treinoService.findOne(id);
    }

    @Post()
    create(@Body() data: Treinos): Promise<Treinos> {
        return this.treinoService.create(data);
    }

    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() data: Treinos
    ): Promise<Treinos> {
        return this.treinoService.update(id, data);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.treinoService.remove(id);
    }
}