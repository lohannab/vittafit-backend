import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Objetivos } from "../entities/objetivos.entity";
import { Repository } from "typeorm";

@Injectable()
export class ObjetivosService {

    constructor(
        @InjectRepository(Objetivos)
        private objetivosRepository: Repository<Objetivos>
    ) {}

    async findAll(): Promise<Objetivos[]> {
        return this.objetivosRepository.find({
            relations: ["usuario"]
        });
    }

    async findById(id: number): Promise<Objetivos> {
        const objetivo = await this.objetivosRepository.findOne({
            where: { id },
            relations: ["usuario"]
        });

        if (!objetivo) {
            throw new NotFoundException("Objetivo não encontrado!");
        }

        return objetivo;
    }

    async create(objetivo: Objetivos): Promise<Objetivos> {

        if (objetivo.data_limite < objetivo.data_inicio) {
            throw new BadRequestException("A data limite não pode ser menor que a data de início");
        }

        return this.objetivosRepository.save(objetivo);
    }

    async update(id: number, dados: Objetivos): Promise<Objetivos> {

        const objetivo = await this.findById(id);

        if (dados.data_limite < dados.data_inicio) {
            throw new BadRequestException("A data limite não pode ser menor que a data de início");
        }

        const atualizado = this.objetivosRepository.merge(objetivo, dados);
        return this.objetivosRepository.save(atualizado);
    }

    async delete(id: number): Promise<void> {
        const objetivo = await this.findById(id);
        await this.objetivosRepository.remove(objetivo);
    }
}