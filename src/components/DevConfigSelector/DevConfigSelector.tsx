import { ChangeEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';

import styles from './DevConfigSelector.module.scss';

import Dropdown from '#components/Dropdown/Dropdown';
import { getConfigNavigateCallback } from '#src/utils/configOverride';
import { logDev } from '#src/utils/common';
import { useTranslation } from 'react-i18next';

interface Props {
  selectedConfig: string | undefined;
}

// const configs = import.meta.env.MODE === 'jwdev' ? jwDevEnvConfigs : testConfigs;
 const configs = [
  {
    value: 'pq0iuoqh',
    label: 'English',
    language: 'en-US',
  },
  {
    value: 'tckmkypm',
    label: 'Trukish',
    language: 'tr-TR',
  },
];

const ConfigSelector = ({ selectedConfig }: Props) => {
  const configNavigate = getConfigNavigateCallback(useNavigate());
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const getLanguage = (configValue: string) => {
    const currentConfig = configs.find(({ value }) => configValue === value);
    return currentConfig?.language;
  };
  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      configNavigate(event.target.value);
      i18n.changeLanguage(getLanguage(event.target.value));
      navigate(0);
    },
    [configNavigate, i18n, navigate],
  );
      // removed the className={styles.dropDown} because the dropDown is rendering at the bottom right corner.
  return <Dropdown size="small" options={configs} name="config-select" value={selectedConfig || ''} onChange={onChange} />;
};

export default ConfigSelector;
