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
import { UsersModule } from './users/users.module';
import { Product } from './products/Product';
import { ProductsModule } from './products/products.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './authorization/nest-access-control/app.roles';
import configuration from './config/config'
import { User } from './users/user';


const nestAccess = AccessControlModule.forRoles(roles)

@Module({
  imports: [
    ProductsModule, 
    UsersModule, 
    AuthModule,
    CategoriesModule,
    ShiftsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().sql.host,
      port: configuration().sql.port,
      username: configuration().sql.username,
      password: configuration().sql.password,
      database: configuration().sql.database,
      entities: [Category, Product, Shift, User],
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
      ],
    }),
    nestAccess
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}