import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import ErrorPage from '#components/ErrorPage/ErrorPage';
import AccountModal from '#src/containers/AccountModal/AccountModal';
import LoadingOverlay from '#components/LoadingOverlay/LoadingOverlay';
import { cleanupQueryParams, getConfigSource } from '#src/utils/configOverride';
import { loadAndValidateConfig } from '#src/utils/configLoad';
import { initSettings } from '#src/stores/SettingsController';
import AppRoutes from '#src/containers/AppRoutes/AppRoutes';

const Root: FC = () => {
  const { t } = useTranslation('error');

  const settingsQuery = useQuery('settings-init', initSettings, {
    enabled: true,
    retry: 1,
    refetchInterval: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const configSource = useMemo(() => getConfigSource(searchParams, settingsQuery.data), [searchParams, settingsQuery.data]);
  // Update the query string to maintain the right params
  useEffect(() => {
    if (settingsQuery.data && cleanupQueryParams(searchParams, settingsQuery.data, configSource)) {
      setSearchParams(searchParams, { replace: true });
    }
  }, [configSource, searchParams, setSearchParams, settingsQuery.data]);

  const configQuery = useQuery('config-init-' + configSource, async () => await loadAndValidateConfig(configSource), {
    enabled: settingsQuery.isSuccess,
    retry: configSource ? 1 : 0,
    refetchInterval: false,
  });

  // Show the spinner while loading except in demo mode (the demo config shows its own loading status)
  if (settingsQuery.isLoading || configQuery.isLoading) {
    return <LoadingOverlay />;
  }

  if (settingsQuery.isError) {
    return (
      <ErrorPage
        title={t('settings_invalid')}
        message={t('check_your_settings')}
        error={settingsQuery.error as Error}
        helpLink={'https://github.com/jwplayer/ott-web-app/blob/develop/docs/initialization-file.md'}
      />
    );
  }

  return (
    <>
      {!configQuery.isError && !configQuery.isLoading && <AppRoutes />}
      {/*Show the error page when error except in demo mode (the demo mode shows its own error)*/}
      {configQuery.isError && (
        <ErrorPage
          title={t('config_invalid')}
          message={t('check_your_config')}
          error={configQuery.error as Error}
          helpLink={'https://github.com/jwplayer/ott-web-app/blob/develop/docs/configuration.md'}
        />
      )}
      <AccountModal />
    </>
  );
};

export default Root;
