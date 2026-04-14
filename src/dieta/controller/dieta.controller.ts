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
import { Dieta } from "../entities/dieta.entity";
import { DietaService } from "../service/dieta.service";

@Controller("/dietas")
export class DietaController {

    constructor(private readonly dietaService: DietaService) {}

    @Get()
    findAll(): Promise<Dieta[]> {
        return this.dietaService.findAll();
    }

    @Get("/:id")
    findById(@Param("id", ParseIntPipe) id: number): Promise<Dieta> {
        return this.dietaService.findById(id);
    }

    @Get("/descricao/:descricao")
    findByDescricao(@Param("descricao") descricao: string): Promise<Dieta[]> {
        return this.dietaService.findByDescricao(descricao);
    }

    @Post()

    create(@Body() dieta: Dieta): Promise<Dieta> {
        return this.dietaService.create(dieta);
    }

    @Put("/:id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() dieta: Dieta
    ): Promise<Dieta> {
        return this.dietaService.update(id, dieta);
    }

    @Delete("/:id")
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.dietaService.delete(id);
    }
}