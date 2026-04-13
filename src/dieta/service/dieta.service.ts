import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
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

  async findById(id: number): Promise<Dieta> {
    const dieta = await this.dietaRepository.findOne({
      where: { id },
      relations: { usuario: true }
    });

    if (!dieta) {
      throw new HttpException('Dieta não encontrada!', HttpStatus.NOT_FOUND);
    }

    return dieta;
  }

  async findAll(): Promise<Dieta[]> {
    return this.dietaRepository.find({
      relations: { usuario: true }
    });
  }

  async findAllByDescricao(descricao: string): Promise<Dieta[]> {
    return this.dietaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`)
      },
      relations: { usuario: true }
    });
  }

  async create(dados: any): Promise<Dieta> {

    const usuario = await this.usuarioRepository.findOne({
      where: { id: dados.usuarioId }
    });

    if (!usuario) {
      throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    const dieta = this.dietaRepository.create({
      tipo: dados.tipo,
      descricao: dados.descricao,
      data: dados.data,
      imc: usuario.imc,
      usuario: usuario
    });

    return this.dietaRepository.save(dieta);
  }

  async update(id: number, dados: any): Promise<Dieta> {
    const dieta = await this.findById(id);

    if (dados.tipo !== undefined) dieta.tipo = dados.tipo;
    if (dados.descricao !== undefined) dieta.descricao = dados.descricao;
    if (dados.data !== undefined) dieta.data = dados.data;

    return this.dietaRepository.save(dieta);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.dietaRepository.delete(id);
  }
}