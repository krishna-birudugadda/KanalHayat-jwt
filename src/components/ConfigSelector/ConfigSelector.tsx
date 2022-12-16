import { ChangeEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import styles from './ConfigSelector.module.scss';

import Dropdown from '#components/Dropdown/Dropdown';
import { getConfigNavigateCallback } from '#src/utils/configOverride';
import { configs } from '#src/config';

interface Props {
  selectedConfig: string | undefined;
}

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

  return <Dropdown size="small" options={configs} name="config-select" value={selectedConfig || ''} onChange={onChange} />;
};

export default ConfigSelector;
