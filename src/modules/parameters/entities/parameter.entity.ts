import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('parameters')
@Unique('uq_parameters_name', ['name'])
@ObjectType()
export class Parameter {
  /*
   * ID del parámetro
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Nombre del parámetro
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   * Valor del parámetro
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 200 })
  value: string;

  /*
   * Descripcón del parámetro
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 300 })
  description: string;

  /*
   * fecha cuando se realizó el registro
   */
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  /*
   * fecha cuando se actualiza el registro
   */
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
