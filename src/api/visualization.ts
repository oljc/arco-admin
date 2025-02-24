import { get, post } from '@/utils/request';
import type { GeneralChart } from '@/types/global';

export interface ChartDataRecord {
  x: string;
  y: number;
  name: string;
}
export interface DataChainGrowth {
  quota: string;
}

export interface DataChainGrowthRes {
  count: number;
  growth: number;
  chartData: {
    xAxis: string[];
    data: { name: string; value: number[] };
  };
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  return post<DataChainGrowthRes>('/api/data-chain-growth', data);
}

export interface PopularAuthorRes {
  list: {
    ranking: number;
    author: string;
    contentCount: number;
    clickCount: number;
  }[];
}

export function queryPopularAuthor() {
  return get<PopularAuthorRes>('/api/popular-author/list');
}

export interface ContentPublishRecord {
  x: string[];
  y: number[];
  name: string;
}

export function queryContentPublish() {
  return get<ContentPublishRecord[]>('/api/content-publish');
}

export function queryContentPeriodAnalysis() {
  return post<GeneralChart>('/api/content-period-analysis');
}

export interface PublicOpinionAnalysis {
  quota: string;
}
export interface PublicOpinionAnalysisRes {
  count: number;
  growth: number;
  chartData: ChartDataRecord[];
}
export function queryPublicOpinionAnalysis(data: DataChainGrowth) {
  return post<PublicOpinionAnalysisRes>('/api/public-opinion-analysis', data);
}
export interface DataOverviewRes {
  xAxis: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}

export function queryDataOverview() {
  return post<DataOverviewRes>('/api/data-overview');
}
