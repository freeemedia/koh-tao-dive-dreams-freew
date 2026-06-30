import { useTranslation } from 'react-i18next';
import AdaptiveSupportDiverNl from './AdaptiveSupportDiver.nl';
import AdaptiveSupportDiverEn from './AdaptiveSupportDiver.en';

const AdaptiveSupportDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <AdaptiveSupportDiverNl /> : <AdaptiveSupportDiverEn />;
};

export default AdaptiveSupportDiver;
