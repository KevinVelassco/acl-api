import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
