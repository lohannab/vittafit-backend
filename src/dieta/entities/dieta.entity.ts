import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    id!: number;

    // @IsNotEmpty()
    // @Column({ type: "decimal", precision: 5, scale: 2 })
     imc!: number;

    @IsNotEmpty()
    @Column()
    tipo!: string;

    @IsNotEmpty()
    @Column()
    descricao!: string;

    @UpdateDateColumn()
    data!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.dieta, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}