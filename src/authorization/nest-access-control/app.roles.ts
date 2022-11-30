import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    USER = 'user',
    ADMIN = 'admin', 
  }
  
  export const roles: RolesBuilder = new RolesBuilder();
  
  roles
    .grant(AppRoles.USER)  // switch to another role without breaking the chain
        .readAny('product')
        .readAny('category')
    .grant(AppRoles.ADMIN)
        .extend(AppRoles.USER) // inherit role capabilities. also takes an array
        .createOwn('product')   // equivalent to .createOwn('video', ['*'])
        .updateAny('product')
        .deleteOwn('product')
        .createAny('category')  // equivalent to .createOwn('video', ['*'])
        .updateAny('category')
        .deleteOwn('category')