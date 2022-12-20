import { useTranslation } from 'react-i18next';

import useContentProtection from '#src/hooks/useContentProtection';
import { getMediaById } from '#src/services/api.service';
import { getTranslatedData } from '#src/utils/common';

export default function useMedia(mediaId: string, enabled: boolean = true) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const callback = (token?: string, drmPolicyId?: string) => getMediaById(mediaId, token, drmPolicyId);

  const { data, ...rest } = useContentProtection('media', mediaId, callback, {}, enabled);
const updatedData = getTranslatedData(data, currentLanguage)
 
  return { ...rest, data: updatedData};
}
