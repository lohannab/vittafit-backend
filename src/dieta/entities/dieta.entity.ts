import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    id!: number;


    @Column("decimal", { precision: 5, scale: 2, nullable: true })
    imc?: number;


    @IsNotEmpty()
    @Column()
    tipo!: string;

    @IsNotEmpty()
    @Column()
    descricao!: string;

    @UpdateDateColumn()
    data!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.dietas, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}