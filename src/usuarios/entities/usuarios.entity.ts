<<<<<<< HEAD
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Objetivos } from "../../objetivos/entities/objetivos.entity"
import { Dieta } from "../../dieta/entities/dieta.entity"
import { Treino } from "../../treinos/entities/treinos.entity"
 
=======
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Objetivos } from "../../objetivos/entities/objetivos.entity";
import { Dieta } from "../../dieta/entities/dieta.entity";
import { Treinos } from "../../treinos/entities/treinos.entity";

>>>>>>> e0f17c26c26632fb7d6a74bdd25f6fd01d491bad
@Entity({name: "tb_usuarios"})
export class Usuario {
 
    @PrimaryGeneratedColumn()
    id!: number
 
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome!: string
 
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario!: string
 
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    senha!: string
 
    @Column({length: 5000 })
    foto!: string

    @IsNotEmpty()
    @Column('decimal', { precision: 5, scale: 2 })
    altura!: number

    @IsNotEmpty()
    @Column('decimal', { precision: 10, scale: 2 })
    peso!: number

    @IsNotEmpty()
    @Column('decimal', { precision: 10, scale: 2 })
    imc: number = this.peso / (this.altura * this.altura)
 
    @OneToMany(() => Objetivos, (objetivos) => objetivos.usuario)
     objetivos!: Objetivos[];

    @OneToMany(() => Dieta, (dieta) => dieta.usuario)
    dieta!: Dieta[];
<<<<<<< HEAD
    
    @OneToMany(() => Treino, (treinos) => treinos.usuario)
    treino!: Treino[];
=======

    @OneToMany(() => Treinos, (treinos) => treinos.usuario)
    treinos!: Treinos;
>>>>>>> e0f17c26c26632fb7d6a74bdd25f6fd01d491bad
}