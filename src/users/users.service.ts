import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserUpdate } from "./dto/user-update.dto";
import { User } from './user';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(item: User) {
        const { email, password } = item
        const user = await this.userRepository.findOneBy({ email })
        if (user) {
            return { message: "already exists" }
        }
        const newUser = await this.userRepository.save({ email, password })
        delete newUser.password
        return { message: "created", newUser }
    }

    async getAllUsers() {
        const allUsers = await this.userRepository.find({
            relations: {
                shift: true,
            },
        })
        return { message: "all users", allUsers }
    }

    async getUserById(id: number) {
        const users = this.userRepository.find({
            relations: {
                shift: true,
            },
        });
        return (await users).filter(s => s.id == id)[0];
    }


    async getByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    async updateUser(id: number, item: UserUpdate) {
        const getUser = await this.userRepository.findOneBy({ id: Number(id) })
        if (!getUser) {
            return { message: "wrong entry" }
        }
        await this.userRepository.save({ ...item, id: getUser.id })
        return { message: "updated" }
    }
}