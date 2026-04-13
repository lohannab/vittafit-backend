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

    async delete(id: number): Promise<void> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.remove(usuario);
    }

    // =========================
    // 🧠 IMC LOGIC
    // =========================

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

    const imcCalculado = this.calcularIMC(usuario.peso, usuario.altura);
    usuario.imc = Number(imcCalculado.toFixed(2));

    const savedUser = await this.usuarioRepository.save(usuario);

    const classificacao = this.classificarIMC(savedUser.imc);

    return {
        usuario: savedUser,
        imc: savedUser.imc,
        classificacao
    };
}

    async update(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findById(usuario.id);

    const emailExistente = await this.findByUsuario(usuario.usuario);
    if (emailExistente && emailExistente.id !== usuario.id)
        throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

    if (usuario.peso && usuario.altura) {
        const imcCalculado = this.calcularIMC(usuario.peso, usuario.altura);
        usuario.imc = Number(imcCalculado.toFixed(2));
    }

    const usuarioAtualizado = this.usuarioRepository.merge(buscaUsuario, usuario);
    return await this.usuarioRepository.save(usuarioAtualizado);
    }
}