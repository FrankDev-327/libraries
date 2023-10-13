import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get('/metrics')
  async incrementCounter(res: Response) {
    const metrics = await this.metricsService.incrementCounter();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
