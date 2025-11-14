import { Controller, Get } from '@nestjs/common';
import { PoStatusService } from './po-status.service';

@Controller('po-status')
export class PoStatusController {
  constructor(private readonly svc: PoStatusService) {}

  // ONLY REPORT ENDPOINT
  @Get()
  getReport() {
    return this.svc.generateReport();
  }
}
