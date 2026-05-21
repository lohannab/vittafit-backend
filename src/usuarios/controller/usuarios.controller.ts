import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"; 
import { UsuarioService } from "../service/usuarios.service";
import { Usuario } from "../entities/usuarios.entity";

@ApiTags("Usuários") 
@Controller("/usuarios")
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    @ApiOperation({ summary: "Listar todos os usuários" }) 
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Buscar um usuário pelo ID" })
    findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: "Cadastrar um novo usuário" })
    @ApiResponse({ status: 201, description: "Usuário cadastrado com sucesso e IMC calculado." })
    @ApiResponse({ status: 400, description: "Usuário/E-mail já cadastrado ou dados inválidos." })
    create(@Body() usuario: Usuario) {
        return this.usuarioService.create(usuario);
    }

    @Put("/:id")
    @ApiOperation({ summary: "Atualizar os dados de um usuário" })
    @ApiResponse({ status: 200, description: "Usuário atualizado com sucesso e IMC recalculado." })
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() usuario: Usuario
    ): Promise<Usuario> {
        usuario.id = id; 
        return this.usuarioService.update(usuario);
    }

    @Delete("/:id")
    @ApiOperation({ summary: "Remover um usuário do sistema" })
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.usuarioService.delete(id);
    }
}