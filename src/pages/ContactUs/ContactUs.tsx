import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ContactUs.module.scss';

const ContactUs = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <iframe
      id={'JotFormIFrame-223523499217460'}
      title={'TBN Contact Form '}
      allowFullScreen={false}
      src={`https://form.jotform.com/223523499217460?language=${currentLanguage.split('-')[0]}`}
      style={{
        minWidth: '100%',
        height: '130%',
        border: 'none',
      }}
      scrolling={'no'}
    />
  );
};

export default ContactUs;
