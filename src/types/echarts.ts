import type { CallbackDataParams } from 'echarts/types/dist/shared.d.ts';

export interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string;
  axisIndex: number;
  axisType: string;
  axisId: string;
  axisValue: string;
  axisValueLabel: string;
}
