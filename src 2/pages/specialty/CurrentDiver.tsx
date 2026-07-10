import { useTranslation } from 'react-i18next';
import CurrentDiverNl from './CurrentDiver.nl';
import CurrentDiverEn from './CurrentDiver.en';

const CurrentDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <CurrentDiverNl /> : <CurrentDiverEn />;
};

export default CurrentDiver;
