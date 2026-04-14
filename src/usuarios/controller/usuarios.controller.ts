import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import { UsuarioService } from "../service/usuarios.service";
import { Usuario } from "../entities/usuarios.entity";

@Controller("/usuarios")
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get("/:id")
    findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id);
    }

    @Post()
    create(@Body() usuario: Usuario) {
        return this.usuarioService.create(usuario);
    }

    @Put("/:id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() usuario: Usuario
    ): Promise<Usuario> {
        usuario.id = id;
        return this.usuarioService.update(usuario);
    }


    @Delete("/:id")
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.usuarioService.delete(id);
    }

}