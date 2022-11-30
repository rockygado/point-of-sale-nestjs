import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Category } from './products/categories/Category';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
