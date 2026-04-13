import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_objetivos"})
export class Objetivos {

    @PrimaryGeneratedColumn()
    id!: number; // primary key

    @IsNotEmpty()
    @Column({ length: 255 })
    descricao!: string; // descrição do objetivo

    @IsNotEmpty()
    @Column("decimal", { precision: 5, scale: 2 })
    peso_objetivo!: number; // objetivo de peso

    @IsNotEmpty()
    @Column({ type: "date" })
    data_inicio!: Date; // data de inicio do projeto

    @IsNotEmpty()
    @Column({ type: "date" }) 
    data_limite!: Date; // data limite do projeto

    //@ManyToOne(() => Usuario, (usuario) => usuario.objetivos) // 
    //usuario!: Usuario;  // relacionamento com o usuário
    }
