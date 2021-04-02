import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('parameters')
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
  @Column({ type: 'varchar', length: 100, unique: true })
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
