import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ObjetivosService } from "../service/objetivos.service";
import { Objetivos } from "../entities/objetivos.entity";

@Controller("/objetivos")
export class ObjetivosController {

    constructor(private readonly objetivosService: ObjetivosService) {}

    @Get() // http://localhost:4000/Objetivos
    findAll() {
        return this.objetivosService.findAll();
    }

    @Get('/:id') // http://localhost:4000/Objetivos/1
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.objetivosService.findById(id);
    }

    @Post() // http://localhost:4000/Objetivos
    @HttpCode(HttpStatus.OK)
    create(@Body() objetivos: Objetivos) {
    return this.objetivosService.create(objetivos);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number,
    @Body() objetivos: Objetivos): Promise<Objetivos> {
        return this.objetivosService.update(id, objetivos);
    }

    @Delete('/:id') //ex: http://localhost:4000/loja/(id)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number){ // deletar
        return this.objetivosService.delete(id);
    }
    
}