import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_treinos" })
export class Treinos {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipoTreino!: string;

    @Column({ type: "text" })
    descricao!: string;

    @Column({ type: "date" })
    data!: string;

    @Column()
    intensidade!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.objetivos) // 
    usuario!: Usuario;  // relacionamento com o usuário
}