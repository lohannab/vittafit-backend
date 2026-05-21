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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"; 
import { Dieta } from "../entities/dieta.entity";
import { DietaService } from "../service/dieta.service";

@ApiTags("Dieta") 
@Controller("/dietas")
export class DietaController {

    constructor(private readonly dietaService: DietaService) {}

    @Get()
    @ApiOperation({ summary: "Listar todas as dietas" }) 
    findAll(): Promise<Dieta[]> {
        return this.dietaService.findAll();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Buscar uma dieta pelo ID" })
    findById(@Param("id", ParseIntPipe) id: number): Promise<Dieta> {
        return this.dietaService.findById(id);
    }

    @Get("/descricao/:descricao")
    @ApiOperation({ summary: "Buscar dietas por parte da descrição" })
    findByDescricao(@Param("descricao") descricao: string): Promise<Dieta[]> {
        return this.dietaService.findByDescricao(descricao);
    }

    @Post()
    @ApiOperation({ summary: "Cadastrar uma nova dieta" })
    @ApiResponse({ status: 21, description: "Dieta criada com sucesso." })
    @ApiResponse({ status: 400, description: "Dados inválidos ou ID de usuário não fornecido." })
    create(@Body() dieta: Dieta): Promise<Dieta> {
        return this.dietaService.create(dieta);
    }

    @Put("/:id")
    @ApiOperation({ summary: "Atualizar os dados de uma dieta" })
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() dieta: Dieta
    ): Promise<Dieta> {
        return this.dietaService.update(id, dieta);
    }

    @Delete("/:id")
    @ApiOperation({ summary: "Excluir uma dieta do sistema" })
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.dietaService.delete(id);
    }
}
