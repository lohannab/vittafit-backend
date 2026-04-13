import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Dieta } from "../entities/dieta.entity";
import { DietaService } from "../service/dieta.service";

@Controller("/dieta")
export class DietaController {

    constructor(private readonly dietaService: DietaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Dieta[]> {
        return this.dietaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Dieta> {
        return this.dietaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findAllBydescricao(@Param('descricao') descricao: string): Promise<Dieta[]> {
        return this.dietaService.findAllByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() dieta: Dieta): Promise<Dieta> {
        return this.dietaService.create(dieta);
    }


    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number,
    @Body() dieta: Dieta): Promise<Dieta> {
        return this.dietaService.update(id, dieta);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.dietaService.delete(id);
    }

}