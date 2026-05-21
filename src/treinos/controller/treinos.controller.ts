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
import { TreinoService } from "../service/treinos.service";
import { Treinos } from "../entities/treinos.entity";

@ApiTags("Treinos") 
@Controller("treinos")
export class TreinoController {

    constructor(private readonly treinoService: TreinoService) {}

    @Get()
    @ApiOperation({ summary: "Listar todos os treinos" }) 
    findAll(): Promise<Treinos[]> {
        return this.treinoService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Buscar um treino pelo ID" })
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Treinos> {
        return this.treinoService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: "Cadastrar um novo treino" })
    @ApiResponse({ status: 201, description: "Treino criado com sucesso." })
    @ApiResponse({ status: 400, description: "Dados inválidos ou ID de usuário não fornecido." })
    create(@Body() data: Treinos): Promise<Treinos> {
        return this.treinoService.create(data);
    }

    @Put(":id")
    @ApiOperation({ summary: "Atualizar os dados de um treino" })
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() data: Treinos
    ): Promise<Treinos> {
        return this.treinoService.update(id, data);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Excluir um treino do sistema" })
    remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.treinoService.remove(id);
    }
}