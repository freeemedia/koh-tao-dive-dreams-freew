import { useTranslation } from 'react-i18next';
import SidemountDiverNl from './SidemountDiver.nl';
import SidemountDiverEn from './SidemountDiver.en';

const SidemountDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <SidemountDiverNl /> : <SidemountDiverEn />;
};

export default SidemountDiver;
