import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { PurchaseOrderMaster } from '../purchase-order-master/purchase-order-master.schema';
import { PurchaseOrderDetail } from '../purchase-order-detail/purchase-order-detail.schema';
import { GrnDetail } from '../grn-detail/grn-detail.schema';

@Injectable()
export class PoStatusService {
  constructor(
    @InjectModel(PurchaseOrderMaster.name)
    private poMasterModel: Model<PurchaseOrderMaster>,

    @InjectModel(PurchaseOrderDetail.name)
    private poDetailModel: Model<PurchaseOrderDetail>,

    @InjectModel(GrnDetail.name)
    private grnDetailModel: Model<GrnDetail>,
  ) {}

  async generateReport() {
    // 1. Fetch all purchase orders
    const masters = await this.poMasterModel.find().lean();

    const report = [];

    for (const master of masters) {
      const poId = master._id;   // ObjectId
      const poNo = master.po_no; // String Po No

      // 2. Fetch PO Detail records for this PO
      const poDetails = await this.poDetailModel.find({ poId }).lean();

      // 3. Fetch GRN details for this PO
      const grnDetails = await this.grnDetailModel.find({ poId }).lean();

      for (const item of poDetails) {
        const productId = item.pro_id;

        // Sum received qty for this product
        const receivedQty = grnDetails
          .filter(g => g.pro_id === productId)
          .reduce((sum, g) => sum + g.qty, 0);

        const orderedQty = item.qty;

        report.push({
          po_no: poNo,
          sup_id: master.sup_id,
          pro_id: productId,
          ordered_qty: orderedQty,
          received_qty: receivedQty,
          pending_qty: orderedQty - receivedQty,
        });
      }
    }

    return report;
  }
}
