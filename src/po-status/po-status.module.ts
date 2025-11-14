import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PoStatusController } from './po-status.controller';
import { PoStatusService } from './po-status.service';

import { PurchaseOrderMaster, PurchaseOrderMasterSchema } from '../purchase-order-master/purchase-order-master.schema';
import { PurchaseOrderDetail, PurchaseOrderDetailSchema } from '../purchase-order-detail/purchase-order-detail.schema';
import { GrnDetail, GrnDetailSchema } from '../grn-detail/grn-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseOrderMaster.name, schema: PurchaseOrderMasterSchema },
      { name: PurchaseOrderDetail.name, schema: PurchaseOrderDetailSchema },
      { name: GrnDetail.name, schema: GrnDetailSchema },
    ]),
  ],
  controllers: [PoStatusController],
  providers: [PoStatusService],
})
export class PoStatusModule {}
