import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treinos } from '../entities/treinos.entity';
import { Usuario } from '../../usuarios/entities/usuarios.entity';
import { InjectRepository as InjectRepoUsuario } from '@nestjs/typeorm';

@Injectable()
export class TreinoService {

  constructor(
    @InjectRepository(Treinos)
    private treinoRepository: Repository<Treinos>,

    @InjectRepoUsuario(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(data: Treinos): Promise<Treinos> {

    const usuario = await this.usuarioRepository.findOne({
      where: { id: data.usuario?.id }
    });

    if (!usuario) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    data.usuario = usuario;

    return this.treinoRepository.save(data);
  }

  async findAll(): Promise<Treinos[]> {
    return this.treinoRepository.find({
      relations: ["usuario"]
    });
  }

  async findOne(id: number): Promise<Treinos> {
    const treino = await this.treinoRepository.findOne({
      where: { id },
      relations: ["usuario"]
    });

    if (!treino) {
      throw new NotFoundException("Treino não encontrado!");
    }

    return treino;
  }

  async update(id: number, data: Treinos): Promise<Treinos> {
    const treino = await this.findOne(id);

    const atualizado = this.treinoRepository.merge(treino, data);
    return this.treinoRepository.save(atualizado);
  }

  async remove(id: number): Promise<void> {
    const treino = await this.findOne(id);
    await this.treinoRepository.remove(treino);
  }
}