import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({ name: "tb_treinos" })
export class Treinos {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipoTreino!: string;

    @Column({ type: "text" })
    descricao!: string;

    @Column({ type: "date" })
    data!: string;

    @Column()
    intensidade!: string;

}