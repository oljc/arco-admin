import { post } from '@/utils/request';
export interface BaseInfoModel {
  activityName: string;
  channelType: string;
  promotionTime: string[];
  promoteLink: string;
}
export interface ChannelInfoModel {
  advertisingSource: string;
  advertisingMedia: string;
  keyword: string[];
  pushNotify: boolean;
  advertisingContent: string;
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel;

export function submitChannelForm(data: UnitChannelModel) {
  return post('/api/channel-form/submit', { data });
}
