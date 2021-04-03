import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
@Entity('companies')
@Unique('uq_companies_uuid', ['uuid'])
@Unique('uq_companies_name', ['name'])
@ObjectType()
export class Company {
  /*
   * ID del company
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   *  UUID del company
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 21 })
  uuid: string;

  /*
   * Nombre del company
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  name: string;

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

  // ralations

  @Field(() => [Role])
  @OneToMany(() => Role, (role: Role) => role.company)
  roles: Role[];

  @Field(() => [User])
  @OneToMany(() => User, (user: User) => user.company)
  users: User[];
}
