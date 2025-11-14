import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PurchaseOrderDetail, PurchaseOrderDetailDocument } from './purchase-order-detail.schema';
import { CreatePoDetailDto } from './dto/create-po-detail.dto';

@Injectable()
export class PurchaseOrderDetailService {
  constructor(
    @InjectModel(PurchaseOrderDetail.name)
    private detailModel: Model<PurchaseOrderDetailDocument>,
  ) {}

  create(dto: CreatePoDetailDto) {
    const doc = new this.detailModel({
      ...dto,
      poId: new Types.ObjectId(dto.poId),
    });
    return doc.save();
  }

  // 🔥 FIXED
  findByPoId(poId: string) {
    return this.detailModel.find({
      poId: new Types.ObjectId(poId),
    }).lean();
  }

  findAll() {
    return this.detailModel.find().populate('poId').lean();
  }

  async update(id: string, payload: Partial<CreatePoDetailDto>) {
    const updateData: any = { ...payload };

    if (payload.poId) {
      updateData.poId = new Types.ObjectId(payload.poId);
    }

    const updated = await this.detailModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new NotFoundException('PO detail not found');

    return updated;
  }

  async delete(id: string) {
    const res = await this.detailModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('PO detail not found');
    return res;
  }
}
