import { IsEmail, IsNotEmpty } from "class-validator";
import { Shift } from "src/shifts/Shift";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    MANAGER = "Manager",
    ECONOMIST = "Economist",
    USER = "User",
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @IsNotEmpty()
    @Column()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    @Column()
    email: string;
    @Column({default : 123})
    password : string;
    @Column({
        type: "enum",
        enum: UserRole,
    })
    role: UserRole;

    @ManyToOne(() => Shift, (shift) => shift.name)
    @JoinColumn()
    shift: Shift;
}