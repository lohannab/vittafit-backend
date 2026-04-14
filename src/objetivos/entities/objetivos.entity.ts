import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuarios.entity";

@Entity({ name: "tb_objetivos" })
export class Objetivos {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 255 })
    descricao!: string;

    @IsNotEmpty()
    @Column("decimal", { precision: 5, scale: 2 })
    peso_objetivo!: number;

    @IsNotEmpty()

    @Column({ type: "date" })
    data_inicio!: Date;

    @IsNotEmpty()
    @Column({ type: "date" })
    data_limite!: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.objetivos, {
        onDelete: "CASCADE"
    })
    usuario!: Usuario;
}

