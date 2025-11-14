import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GrnDetail, GrnDetailDocument } from './grn-detail.schema';
import { CreateGrnDetailDto } from './dto/create-grn-detail.dto';

@Injectable()
export class GrnDetailService {
  constructor(
    @InjectModel(GrnDetail.name)
    private readonly model: Model<GrnDetailDocument>,
  ) {}

  // -------------------------------
  // CREATE GRN DETAIL
  // -------------------------------
  create(dto: CreateGrnDetailDto) {
    const data: any = {
      ...dto,
      grnId: new Types.ObjectId(dto.grnId), // FIXED
    };

    if (dto.poId) {
      data.poId = new Types.ObjectId(dto.poId);
    }

    return this.model.create(data);
  }

  // -------------------------------
  // FIND GRN DETAILS BY GRN ID
  // -------------------------------
  findByGrnId(grnId: string) {
    return this.model
      .find({
        grnId: new Types.ObjectId(grnId), // FIXED
      })
      .populate('grnId')
      .lean();
  }

  // -------------------------------
  // GET ALL GRN DETAILS
  // -------------------------------
  findAll() {
    return this.model.find().populate('grnId').lean();
  }

  // -------------------------------
  // UPDATE GRN DETAIL
  // -------------------------------
  async update(id: string, payload: Partial<CreateGrnDetailDto>) {
    const updateData: any = { ...payload };

    if (payload.grnId) {
      updateData.grnId = new Types.ObjectId(payload.grnId);
    }

    if (payload.poId) {
      updateData.poId = new Types.ObjectId(payload.poId);
    }

    const updated = await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('GRN detail not found');
    }

    return updated;
  }

  // -------------------------------
  // DELETE GRN DETAIL
  // -------------------------------
  async delete(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('GRN detail not found');
    }

    return deleted;
  }
}
