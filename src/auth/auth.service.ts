import { Injectable } from '@nestjs/common';
import { AppRoles, roles } from 'src/authorization/nest-access-control/app.roles';
import { UserService } from 'src/users/users.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Injectable()
export class AuthService {
  constructor (private userService: UserService, private jwtStrategy: JwtStrategy) {}

  async register(user: any){
    const checkUser = await this.userService.createUser(user)
    if (checkUser.message == "already exists") {
        return {message : "already exists"}
    }
    return checkUser
  }

 
  async login(user: any): Promise<{ access_token: string; } | {message:string}>  {
    const checkedUser = await this.checkUserInDB(user.email, user.password);
    if (!checkedUser) {
      return {message: "email or password incorrect"};
    }
    checkedUser.roles = AppRoles.ADMIN;
    return this.jwtStrategy.generateToken(checkedUser)
  }

  async checkUserInDB(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}