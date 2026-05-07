import { useTranslation } from 'react-i18next';
import WreckDiverNl from './WreckDiver.nl';
import WreckDiverEn from './WreckDiver.en';

const WreckDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <WreckDiverNl /> : <WreckDiverEn />;
};

export default WreckDiver;
