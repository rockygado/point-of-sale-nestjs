import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Category } from './categories/Category';
import { CategoriesModule } from './categories/categories.module';
import { Shift } from './shifts/Shift';
import { ShiftsModule } from './shifts/shifts.module';
import { User } from './users/user';
import { UsersModule } from './users/users.module';
import { Product } from './products/Product';
import { ProductsModule } from './products/products.module';
import { Shift } from './users/shifts/Shift';
import { User } from './users/User';
import { UsersModule } from './users/users.module';
import configuration from './config/config'

@Module({
  imports: [ProductsModule, UsersModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().sql.host,
      port: configuration().sql.port,
      username: configuration().sql.username,
      password: configuration().sql.password,
      database: configuration().sql.database,
      entities: [Category, Product, User, Shift],
      synchronize: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error',
          format: winston.format.json()
        }),
        new winston.transports.File({
          filename: 'infos.log',
          level: 'info',
          format: winston.format.json()
        }),
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),  
      ],
    }),
  ],
import { Product } from './products/product';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './authorization/nest-access-control/app.roles';
// import { RolesGuard } from './authorization/RBAC/roles.guard';
// import { AccessControlModule } from 'nest-access-control';
// import { roles } from './authorization/nest-access-control/app.roles';

const dbConnection = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'darsh123',
  database: 'PoS',
  entities: [Category, Product, Shift, User],
  synchronize: true,
})
   



const nestAccess = AccessControlModule.forRoles(roles)

@Module({
  imports: [ 
    dbConnection,
    CategoriesModule,
    ShiftsModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    nestAccess    
 ],
  controllers: [AppController],
  providers: [AppService], //RolesGuard --- for testing authorization with RBAC
})
export class AppModule {}
