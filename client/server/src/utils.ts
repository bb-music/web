import * as BBTypes from '@bb-music/bb-types';

export function validateOrigin(origin: string) {
  return [BBTypes.OriginType.BiliOriginName, BBTypes.OriginType.YouTubeOriginName].includes(
    origin as BBTypes.OriginType,
  );
}

export function successResp(data: any) {
  return {
    code: 200,
    msg: 'success',
    data,
  };
}
