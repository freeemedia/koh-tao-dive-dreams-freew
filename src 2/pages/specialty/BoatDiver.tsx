import { useTranslation } from 'react-i18next';
import BoatDiverNl from './BoatDiver.nl';
import BoatDiverEn from './BoatDiver.en';

const BoatDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <BoatDiverNl /> : <BoatDiverEn />;
};

export default BoatDiver;
