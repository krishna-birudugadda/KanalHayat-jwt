import { useTranslation } from 'react-i18next';

import useContentProtection from '#src/hooks/useContentProtection';
import { generatePlaylistPlaceholder } from '#src/utils/collection';
import type { GetPlaylistParams } from '#types/playlist';
import { getPlaylistById } from '#src/services/api.service';
import { queryClient } from '#src/providers/QueryProvider';
import { getDescriptionTranslation, getTitleTranslation, isKeyPresent } from '#src/utils/common';
import { languageDescriptionMap, languageTitleMap } from '#src/config';

const placeholderData = generatePlaylistPlaceholder(30);

export default function usePlaylist(playlistId?: string, params: GetPlaylistParams = {}, enabled: boolean = true, usePlaceholderData: boolean = true) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const callback = async (token?: string, drmPolicyId?: string) => {
    const playlist = await getPlaylistById(playlistId, { token, ...params }, drmPolicyId);

    // This pre-caches all playlist items and makes navigating a lot faster. This doesn't work when DRM is enabled
    // because of the token mechanism.
    playlist?.playlist?.forEach((playlistItem) => {
      queryClient.setQueryData(['media', playlistItem.mediaid, {}, undefined], playlistItem);
    });

    return playlist;
  };


  const { data, ...rest } = useContentProtection('playlist', playlistId, callback, params, enabled, usePlaceholderData ? placeholderData : undefined);
  
  const {  playlist = [] } = data || {};
  const getUpdatedPlayList =(playlist: any, title : any, description: any) =>{
    const updatedPlayList = [...playlist].map((playlistItem) => {
      return { ...playlistItem, title: playlistItem[title], description: playlistItem[description]};
    });
    return updatedPlayList;
  }
  let {title: titleTranslation, description: descriptionTranslation} = data || {}
  let playListTranslation: any=  playlist;
  const titleKey = languageTitleMap[currentLanguage];
  const descriptionKey = languageDescriptionMap[currentLanguage];
  if (data) {
    if (currentLanguage === 'tr-TR') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation =  getTitleTranslation(data, 'tr-TR');
        descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
        playListTranslation = getUpdatedPlayList(playlist, titleKey, descriptionKey)
      }
    } else if (currentLanguage === 'uz-UZ') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation = getTitleTranslation(data, 'uz-UZ');
        descriptionTranslation = getDescriptionTranslation(data, 'uz-UZ');
        playListTranslation = getUpdatedPlayList(playlist, titleKey, descriptionKey)
      } else {
        if (isKeyPresent(data, 'tr-TR')) {
          titleTranslation = getTitleTranslation(data, 'tr-TR');
          descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
          playListTranslation = getUpdatedPlayList(playlist, languageTitleMap['tr-TR'], languageDescriptionMap['tr-TR'])
        }
      }
    } else if (currentLanguage === 'kr-KR') {
      if (isKeyPresent(data, currentLanguage)) {
        titleTranslation = getTitleTranslation(data, 'kr-KR');
        descriptionTranslation = getDescriptionTranslation(data, 'kr-KR');
        playListTranslation = getUpdatedPlayList(playlist, titleKey, descriptionKey)
      } else if (isKeyPresent(data, 'tr-TR')) {
        titleTranslation = getTitleTranslation(data, 'tr-TR');
        descriptionTranslation = getDescriptionTranslation(data, 'tr-TR');
        playListTranslation = getUpdatedPlayList(playlist, languageTitleMap['tr-TR'], languageDescriptionMap['tr-TR'])
      }
    }
  }
  return { ...rest, data: { ...data, title: titleTranslation, description: descriptionTranslation, playlist: playListTranslation } };

}