import { Column, Entity } from 'typeorm';
import { BaseModelEntity } from './base.model.entity';

@Entity('prom')
export class PromEntity extends BaseModelEntity {
  @Column()
  saved_register: string;
}
