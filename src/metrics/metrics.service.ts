import { Counter } from 'prom-client';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('library_request_counter') public counter: Counter<string>,
  ) {}

  async incrementCounter() {
    return this.counter.inc();
  }

  async resetCounter() {
    return this.counter.reset();
  }
}
