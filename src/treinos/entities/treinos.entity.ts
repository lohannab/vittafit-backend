import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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
    data!: Date;

    @Column()
    intensidade!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.treinos, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}