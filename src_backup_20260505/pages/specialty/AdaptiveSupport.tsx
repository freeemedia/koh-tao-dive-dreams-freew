import { useTranslation } from 'react-i18next';
import AdaptiveSupportNl from './AdaptiveSupport.nl';
import AdaptiveSupportEn from './AdaptiveSupport.en';

const AdaptiveSupport = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <AdaptiveSupportNl /> : <AdaptiveSupportEn />;
};

export default AdaptiveSupport;
