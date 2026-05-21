import { ApiProperty } from "@nestjs/swagger"; 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_dietas" })
export class Dieta {

    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: 23.4, required: false }) 
    @Column("decimal", { precision: 5, scale: 2, nullable: true })
    imc?: number;

    @ApiProperty({ example: "Cutting (Perda de peso)" }) 
    @IsNotEmpty()
    @Column()
    tipo!: string;

    @ApiProperty({ example: "Café da manhã: 3 ovos cozidos e 100g de melão..." }) 
    @IsNotEmpty()
    @Column()
    descricao!: string;

    @ApiProperty({ example: "2026-05-20T22:18:21.000Z", required: false }) 
    @UpdateDateColumn()
    data!: Date;

    @ApiProperty({ 
        type: () => Usuario,
        example: { id: 1 }, 
        description: "Objeto contendo o ID do usuário dono desta dieta" 
    })
    @ManyToOne(() => Usuario, (usuario) => usuario.dietas, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}