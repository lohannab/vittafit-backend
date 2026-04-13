import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treino } from '../entities/treinos.entity';

@Injectable()
export class TreinoService {
  constructor(
    @InjectRepository(Treino)
    private readonly treinoRepository: Repository<Treino>,
  ) {}

  async create(data: Partial<Treino>): Promise<Treino> {
    const treino = this.treinoRepository.create(data);
    return await this.treinoRepository.save(treino);
  }

  async findAll(): Promise<Treino[]> {
    return await this.treinoRepository.find();
  }

  async findOne(id: number): Promise<Treino> {
    const treino = await this.treinoRepository.findOne({
      where: { id },
    });

    if (!treino) {
      throw new NotFoundException(`Treino ${id} não encontrado`);
    }

    return treino;
  }

  async update(id: number, data: Partial<Treino>): Promise<Treino> {
    const treino = await this.findOne(id);

    Object.assign(treino, data);

    return await this.treinoRepository.save(treino);
  }

  async remove(id: number): Promise<void> {
    const treino = await this.findOne(id);
    await this.treinoRepository.remove(treino);
  }
}