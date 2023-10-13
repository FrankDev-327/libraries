import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Analitics {
  @Prop()
  type_user: string;

  @Prop()
  type_request: string;

  @Prop()
  createdDate: Date;
}

export const AnaliticsSchema = SchemaFactory.createForClass(Analitics);
