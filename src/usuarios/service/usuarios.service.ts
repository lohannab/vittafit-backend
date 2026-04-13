import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuarios.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { usuario }
        });
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
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

    async create(usuario: Usuario): Promise<any> {
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        const savedUser = await this.usuarioRepository.save(usuario);

        const imc = this.calcularIMC(savedUser.peso, savedUser.altura);
        const classificacao = this.classificarIMC(imc);

        return {
            usuario: savedUser,
            imc: Number(imc.toFixed(2)),
            classificacao
        };
    }

    async update(usuario: Usuario): Promise<Usuario> {
    
    if (!usuario.id) {
        throw new HttpException('O ID do usuário é obrigatório para atualização!', HttpStatus.BAD_REQUEST);
    }

    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
        throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

    return await this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<string> {
        await this.findById(id);
        await this.usuarioRepository.delete(id);

        return `O usuário com o ID ${id} foi deletado com sucesso!`; // lembrar dessa jossa aparecer no insomnia
    }
}