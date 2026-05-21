import { ApiProperty } from "@nestjs/swagger"; 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_treinos" })
export class Treinos {

    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: "Hipertrofia - Peito e Tríceps" }) 
    @Column()
    tipoTreino!: string;

    @ApiProperty({ example: "4 séries de 12 repetições no supino reto..." }) 
    @Column({ type: "text" })
    descricao!: string;

    @ApiProperty({ example: "2026-05-20" }) 
    @Column({ type: "date" })
    data!: Date;

    @ApiProperty({ example: "Alta" }) 
    @Column()
    intensidade!: string;

    @ApiProperty({ 
        type: () => Usuario,
        example: { id: 1 }, 
        description: "Objeto contendo o ID do usuário dono deste treino" 
    })
    @ManyToOne(() => Usuario, (usuario) => usuario.treinos, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario;
}