import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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
}
