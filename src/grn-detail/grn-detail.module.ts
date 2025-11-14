import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GrnDetail, GrnDetailSchema } from './grn-detail.schema';
import { GrnDetailService } from './grn-detail.service';
import { GrnDetailController } from './grn-detail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GrnDetail.name, schema: GrnDetailSchema },
    ]),
  ],
  controllers: [GrnDetailController],
  providers: [GrnDetailService],
  exports: [MongooseModule],
})
export class GrnDetailModule {}
