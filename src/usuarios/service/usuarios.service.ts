
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuarios.entity";


@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) {}

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({
            where: { usuario }
        });
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario) {
            throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);
        }

        return usuario;
    }


    async delete(id: number): Promise<void> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.remove(usuario);
    }


    private calcularIMC(peso: number, altura: number): number {
        return peso / (altura * altura);
    }

    private classificarIMC(imc: number): string {
        if (imc < 18.5) return "Abaixo do peso";
        if (imc < 25) return "Peso normal";
        if (imc < 30) return "Sobrepeso";
        if (imc < 35) return "Obesidade grau I";
        if (imc < 40) return "Obesidade grau II";
        return "Obesidade grau III";
    }


    async create(usuario: Usuario) {
        const existe = await this.findByUsuario(usuario.usuario);

        if (existe) {
            throw new HttpException("Usuário já existe!", HttpStatus.BAD_REQUEST);
        }

        const imc = this.calcularIMC(usuario.peso, usuario.altura);
        usuario.imc = Number(imc.toFixed(2));

        const saved = await this.usuarioRepository.save(usuario);

        return {
            ...saved,
            classificacao: this.classificarIMC(usuario.imc)
        };
    }

    async update(usuario: Usuario): Promise<Usuario> {
        const existente = await this.findById(usuario.id);

        const emailExistente = await this.findByUsuario(usuario.usuario);
        if (emailExistente && emailExistente.id !== usuario.id) {
            throw new HttpException("Usuário já cadastrado!", HttpStatus.BAD_REQUEST);
        }

        if (usuario.peso && usuario.altura) {
            const imc = this.calcularIMC(usuario.peso, usuario.altura);
            usuario.imc = Number(imc.toFixed(2));
        }

        const atualizado = this.usuarioRepository.merge(existente, usuario);
        return this.usuarioRepository.save(atualizado);

  
    }


/*     async delete(id: number): Promise<string> { 
        await this.findById(id);
        await this.usuarioRepository.delete(id);

        return `O usuário com o ID ${id} foi deletado com sucesso!`; // lembrar dessa jossa aparecer no insomnia
    } */
}