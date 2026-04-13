import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ type: "decimal", precision: 5, scale: 2 })
    imc!: number;

    @IsNotEmpty()
    @Column()
    tipo!: string;

    @IsNotEmpty()
    @Column()
    descricao!: string;

    @IsNotEmpty()
    @UpdateDateColumn()
    data!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.dietas, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;
}