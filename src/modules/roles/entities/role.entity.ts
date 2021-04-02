import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
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
}
