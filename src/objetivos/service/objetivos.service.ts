import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Objetivos } from "../entities/objetivos.entity";
import { Repository } from "typeorm";

@Injectable()
export class ObjetivosService {

    constructor(
        @InjectRepository(Objetivos)
        private objetivosRepository: Repository<Objetivos>
    ){}

    async findAll(): Promise<Objetivos[]> {
        return this.objetivosRepository.find({
            relations: ['usuario']
        });
    }

    async findById(id: number): Promise<Objetivos | null> {
        return this.objetivosRepository.findOne({
        where: { id },
        relations: ["usuarios"]
        });
    }

    async create(Objetivos: Objetivos): Promise<Objetivos> {
          if (Objetivos.data_limite < Objetivos.data_inicio) {
    throw new Error("A data limite não pode ser menor que a data de início");
  }
        return this.objetivosRepository.save(Objetivos);
    }

    async update(id: number, objetivo: Objetivos): Promise<Objetivos> {
    if (objetivo.data_limite < objetivo.data_inicio) {
    throw new BadRequestException("A data limite não pode ser menor que a data de início");
    }
        const objetivoExistente = await this.findById(id);
        if (!objetivoExistente) {
        throw new Error("Objetivo não encontrado");
        }
    return this.objetivosRepository.save({
    ...objetivoExistente,
    ...objetivo,
    id
    });
    }   
    async delete(id: number): Promise<void> {
        await this.objetivosRepository.delete(id);
    }

}