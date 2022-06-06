import {
  Footer as UIFooter,
  FooterProps,
  SectionContainer,
} from '@bratislava/ui-bratislava';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { usePageWrapperContext } from '../layouts/PageWrapper';

const Footer = (props: FooterProps) => {
  const { locale: currentLocale, localizations = [] } = usePageWrapperContext();
  const [t] = useTranslation('common');

  const languageLinks = localizations.map(({ locale, slug }) => ({
    title: t(`language_long.${locale}`),
    url: locale === currentLocale ? undefined : slug,
    locale,
  }));

  return (
    <SectionContainer>
      <UIFooter
        className="mt-32 pb-14"
        {...props}
        languageLinks={languageLinks}
      />
    </SectionContainer>
  );
};

export default Footer;
