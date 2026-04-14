import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
    type: 'decimal',  precision: 10, scale: 1 ,
    asExpression: 'peso / (altura * altura)',
    generatedType: 'STORED'
    })
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