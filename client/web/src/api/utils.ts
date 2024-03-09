import { UtilsApi } from '@bb-music/app';
import { transformImgUrl } from '../utils';

export class UtilsInstance implements UtilsApi {
  imgUrlTransform: UtilsApi['imgUrlTransform'] = (url) => {
    return transformImgUrl(url);
  };
}
