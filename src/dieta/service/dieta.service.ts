import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Dieta } from "../entities/dieta.entity";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Injectable()
export class DietaService {

  constructor(
    @InjectRepository(Dieta)
    private dietaRepository: Repository<Dieta>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Dieta[]> {
    return this.dietaRepository.find({
      relations: ["usuario"]
    });
  }

  async findById(id: number): Promise<Dieta> {
    const dieta = await this.dietaRepository.findOne({
      where: { id },
      relations: ["usuario"]
    });

    if (!dieta) {
      throw new HttpException("Dieta não encontrada!", HttpStatus.NOT_FOUND);
    }

    return dieta;
  }

  async findByDescricao(descricao: string): Promise<Dieta[]> {
    return this.dietaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`)
      },
      relations: ["usuario"]
    });
  }

  async create(dieta: Dieta): Promise<Dieta> {

    const usuario = await this.usuarioRepository.findOne({
      where: { id: dieta.usuario?.id }
    });

    if (!usuario) {
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);
    }

    dieta.usuario = usuario;
    dieta.imc = usuario.imc;

    return this.dietaRepository.save(dieta);
  }

  async update(id: number, dados: Dieta): Promise<Dieta> {
    const dieta = await this.findById(id);

    const atualizado = this.dietaRepository.merge(dieta, dados);
    return this.dietaRepository.save(atualizado);
  }

  async delete(id: number): Promise<void> {
    const dieta = await this.findById(id);
    await this.dietaRepository.remove(dieta);
  }
}