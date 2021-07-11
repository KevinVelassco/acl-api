import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('projects')
@Unique('uq_projects_code-company', ['code', 'company'])
@ObjectType()
export class Project {
  /*
   * ID del usuario
   */
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Código del proyecto
   */
  @Field(() => String)
  @Column({ type: 'varchar', length: 5 })
  code: string;

  /*
   * Nombre del proyecto
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

  // relations

  @Field(() => Company)
  @ManyToOne(() => Company, (company: Company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
