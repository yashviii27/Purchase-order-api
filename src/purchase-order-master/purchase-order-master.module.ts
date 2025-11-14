import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrderMaster, PurchaseOrderMasterSchema } from './purchase-order-master.schema';
import { PurchaseOrderMasterService } from './purchase-order-master.service';
import { PurchaseOrderMasterController } from './purchase-order-master.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseOrderMaster.name, schema: PurchaseOrderMasterSchema },
    ]),
  ],
  controllers: [PurchaseOrderMasterController],
  providers: [PurchaseOrderMasterService],
  exports: [
    MongooseModule,  // 👈 This is correct
  ],
})
export class PurchaseOrderMasterModule {}
