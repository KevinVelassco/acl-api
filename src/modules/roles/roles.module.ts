import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { Role } from './entities/role.entity';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    CompaniesModule
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesService]
})
export class RolesModule {}
