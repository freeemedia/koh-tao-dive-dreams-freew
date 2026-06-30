import { useTranslation } from 'react-i18next';
import FishIdentificationNl from './FishIdentification.nl';
import FishIdentificationEn from './FishIdentification.en';

const FishIdentification = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <FishIdentificationNl /> : <FishIdentificationEn />;
};

export default FishIdentification;
