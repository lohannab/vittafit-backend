import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treinos } from '../entities/treinos.entity';

@Injectable()
export class TreinoService {
  usuarioRepository: any;
  constructor(
    @InjectRepository(Treinos)
    private readonly treinoRepository: Repository<Treinos>,
  ) {}

  async create(data: any): Promise<Treinos[]> {
    const { usuarioId, ...treinoData } = data;

    if (!usuarioId) {
      throw new BadRequestException('usuarioId é obrigatório');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const treino = this.treinoRepository.create({
      ...treinoData,
      usuario, // relacionamento
    });

    return await this.treinoRepository.save(treino);
  }


  async findAll(): Promise<Treinos[]> {
    return await this.treinoRepository.find();
  }

  async findOne(id: number): Promise<Treinos> {
    const treino = await this.treinoRepository.findOne({
      where: { id },
    });

    if (!treino) {
      throw new NotFoundException(`Treino ${id} não encontrado`);
    }

    return treino;
  }

  async update(id: number, data: Partial<Treinos>): Promise<Treinos> {
    const treino = await this.findOne(id);

    Object.assign(treino, data);

    return await this.treinoRepository.save(treino);
  }

  async remove(id: number): Promise<void> {
    const treino = await this.findOne(id);
    await this.treinoRepository.remove(treino);
  }
}