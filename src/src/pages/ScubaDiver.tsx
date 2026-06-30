import { useTranslation } from 'react-i18next';
import ScubaDiverNl from './ScubaDiver.nl';
import ScubaDiverEn from './ScubaDiver.en';

const ScubaDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <ScubaDiverNl /> : <ScubaDiverEn />;
};

export default ScubaDiver;
