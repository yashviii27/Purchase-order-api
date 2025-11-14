import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PurchaseOrderDetail, PurchaseOrderDetailSchema } from './purchase-order-detail.schema';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseOrderDetail.name, schema: PurchaseOrderDetailSchema },
    ]),
  ],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
  exports: [MongooseModule],
})
export class PurchaseOrderDetailModule {}
