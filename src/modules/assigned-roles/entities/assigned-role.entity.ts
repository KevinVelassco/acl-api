import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
@Entity('assigned_roles')
@ObjectType()
export class AssignedRole {
  /*
   * ID de asignación de rol
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Fecha cuando se realizó el registro
   */
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  /*
   * Fecha cuando se actualiza el registro
   */
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  // relations

  @Field(() => Role)
  @ManyToOne(() => Role, (role: Role) => role.assignedRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
