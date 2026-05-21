import { ApiProperty } from "@nestjs/swagger"; 
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dieta } from "../../dieta/entities/dieta.entity";
import { Treinos } from "../../treinos/entities/treinos.entity";

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: 'João Silva' }) 
    @IsNotEmpty()
    @Column({ length: 255 })
    nome!: string;

    @ApiProperty({ example: 'joao@email.com' }) 
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255 })
    usuario!: string;

    @ApiProperty({ example: 'senha1234', minLength: 8 }) 
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255 })
    senha!: string;

    @ApiProperty({ example: 'https://linkdafoto.com/foto.jpg', required: false }) 
    @Column({ length: 5000, nullable: true })
    foto!: string;

    @ApiProperty({ example: 1.75 }) 
    @IsNotEmpty()
    @Column("decimal", { precision: 5, scale: 2 })
    altura!: number;

    @ApiProperty({ example: 75.5 }) 
    @IsNotEmpty()
    @Column("decimal", { precision: 10, scale: 2 })
    peso!: number;

    @ApiProperty({ example: 24.6, required: false }) 
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    imc!: number;

    @OneToMany(() => Dieta, (dieta) => dieta.usuario)
    dietas!: Dieta[];

    @OneToMany(() => Treinos, (treino) => treino.usuario)
    treinos!: Treinos[];

}