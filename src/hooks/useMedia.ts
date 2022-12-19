import { useTranslation } from 'react-i18next';

import useContentProtection from '#src/hooks/useContentProtection';
import { getMediaById } from '#src/services/api.service';
import { getDescriptionTranslation, getTitleTranslation, isKeyPresent } from '#src/utils/common';

export default function useMedia(mediaId: string, enabled: boolean = true) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const callback = (token?: string, drmPolicyId?: string) => getMediaById(mediaId, token, drmPolicyId);

  const { data, ...rest } = useContentProtection('media', mediaId, callback, {}, enabled);
let {title: titleTranslation, description: descriptionTranslation} =data || {};

  if (data) {
    if (currentLanguage === 'tr-TR') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation = getTitleTranslation(data, 'tr-TR');
        descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
      }
    } else if (currentLanguage === 'uz-UZ') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation = getTitleTranslation(data, 'uz-UZ');
        descriptionTranslation = getDescriptionTranslation(data, 'uz-UZ');
      } else {
        if (isKeyPresent(data, 'tr-TR')) {
          titleTranslation = getTitleTranslation(data, 'tr-TR');
          descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
        }
      }
    } else if (currentLanguage === 'kr-KR') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation = getTitleTranslation(data, 'kr-KR');
        descriptionTranslation = getDescriptionTranslation(data, 'kr-KR');
      } else if (isKeyPresent(data, 'tr-TR')) {
        titleTranslation = getTitleTranslation(data, 'tr-TR');
        descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
      }
    }
  }
  return { ...rest, data: { ...data, title: titleTranslation, description: descriptionTranslation } };
}
