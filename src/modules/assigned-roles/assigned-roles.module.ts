import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AssignedRole } from './entities/assigned-role.entity';
import { AssignedRolesResolver } from './assigned-roles.resolver';
import { AssignedRolesService } from './assigned-roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignedRole]),
    RolesModule,
    UsersModule
  ],
  providers: [AssignedRolesResolver, AssignedRolesService],
  exports: [AssignedRolesService]
})
export class AssignedRolesModule {}
