import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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
}
