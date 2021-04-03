import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import { AssignedRole } from '../../assigned-roles/entities/assigned-role.entity';

@Entity('roles')
@Unique('uq_roles_code-company', ['code', 'company'])
@Unique('uq_roles_name-company', ['name', 'company'])
@ObjectType()
export class Role {
  /*
   * ID del rol
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Código del rol
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 5 })
  code: string;

  /*
   * Nombre del rol
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  name: string

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

  @Field(() => Company)
  @ManyToOne(() => Company, (company: Company) => company.roles)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Field(() => [AssignedRole])
  @OneToMany(() => AssignedRole, (assignedRole : AssignedRole) => assignedRole.role)
  assignedRoles: AssignedRole[];
}
