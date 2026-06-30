import { useTranslation } from 'react-i18next';
import NightDiverNl from './NightDiver.nl';
import NightDiverEn from './NightDiver.en';

const NightDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <NightDiverNl /> : <NightDiverEn />;
};

export default NightDiver;
