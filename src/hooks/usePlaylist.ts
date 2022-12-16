import { useTranslation } from 'react-i18next';

import useContentProtection from '#src/hooks/useContentProtection';
import { generatePlaylistPlaceholder } from '#src/utils/collection';
import type { GetPlaylistParams } from '#types/playlist';
import { getPlaylistById } from '#src/services/api.service';
import { queryClient } from '#src/providers/QueryProvider';

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

  const { trDescription = '', trTitle = '', playlist = [] } = data || {};
  if (currentLanguage == 'tr-TR') {
    const updatedPlaylist = [...playlist].map((playlistItem) => {
      const { trDescription: itemTrDescription = '', trTitle: itemTrTitle = '' } = playlistItem;
      return { ...playlistItem, title: itemTrTitle, description: itemTrDescription };
    });

    return { ...rest, data: { ...data, title: trTitle, description: trDescription, playlist: updatedPlaylist } };
  }

  return { data, ...rest };
}