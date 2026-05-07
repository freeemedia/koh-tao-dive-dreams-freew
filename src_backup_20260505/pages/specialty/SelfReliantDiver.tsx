import { useTranslation } from 'react-i18next';
import SelfReliantDiverNl from './SelfReliantDiver.nl';
import SelfReliantDiverEn from './SelfReliantDiver.en';

const SelfReliantDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <SelfReliantDiverNl /> : <SelfReliantDiverEn />;
};

export default SelfReliantDiver;
