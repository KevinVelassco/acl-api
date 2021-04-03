import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { AssignedRole } from '../../assigned-roles/entities/assigned-role.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('users')
@Unique('uq_users_auth_uid', ['authUid'])
@Unique('uq_users_email', ['email'])
@ObjectType()
export class User {
  /*
   * ID del usuario
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Identificador unico del usuario
   */
  @Field(() => String)
  @Index('idx_auth_uid')
  @Column({ name: 'auth_uid', type: 'varchar', length: 100 })
  authUid: string;

  /*
   * Email del usuario
   */
  @Field(() => String)
  @Index('idx_email')
  @Column({ type: 'varchar', length: 100 })
  email: string;

  /*
   * Es usuario administrador
   */
  @Field(() => Boolean)
  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;

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

  @Field(() => [AssignedRole])
  @OneToMany(() => AssignedRole, (assignedRole: AssignedRole) => assignedRole.user)
  assignedRoles: AssignedRole[];

  @Field(() => Company)
  @ManyToOne(() => Company, (company: Company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
