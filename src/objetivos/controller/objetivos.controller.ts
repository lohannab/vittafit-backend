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
import { ObjetivosService } from "../service/objetivos.service";
import { Objetivos } from "../entities/objetivos.entity";

@Controller("/objetivos")
export class ObjetivosController {

    constructor(private readonly objetivosService: ObjetivosService) {}

    @Get()
    findAll(): Promise<Objetivos[]> {
        return this.objetivosService.findAll();
    }

    @Get("/:id")
    findById(@Param("id", ParseIntPipe) id: number): Promise<Objetivos> {
        return this.objetivosService.findById(id);
    }


    @Post()
    create(@Body() objetivo: Objetivos): Promise<Objetivos> {
        return this.objetivosService.create(objetivo);

    }

    @Put("/:id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() objetivo: Objetivos
    ): Promise<Objetivos> {
        return this.objetivosService.update(id, objetivo);
    }

    @Delete("/:id")
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.objetivosService.delete(id);
    }
}