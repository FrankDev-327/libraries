import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultLabels: {
        app: 'Monitoring-Libraries',
      },
    }),
  ],
  providers: [
    MetricsService,
    makeCounterProvider({
      name: 'library_request_counter',
      help: 'library_request_counter_helper',
    }),
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
