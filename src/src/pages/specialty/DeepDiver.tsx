import { useTranslation } from 'react-i18next';
import DeepDiverNl from './DeepDiver.nl';
import DeepDiverEn from './DeepDiver.en';

const DeepDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DeepDiverNl /> : <DeepDiverEn />;
};

export default DeepDiver;
