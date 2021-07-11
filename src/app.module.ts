import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ParametersModule } from './modules/parameters/parameters.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RolesModule } from './modules/roles/roles.module';
import { AssignedRolesModule } from './modules/assigned-roles/assigned-roles.module';
import { ProjectsModule } from './modules/projects/projects.module';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.config.schema';

const NODE_ENV = process.env.NODE_ENV || 'local';
const envPath = path.resolve(__dirname, `../.env.${NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      load: [appConfig],
      validationSchema: appConfigSchema
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: true
      })
    }),

    ParametersModule,
    UsersModule,
    CompaniesModule,
    RolesModule,
    AssignedRolesModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
