import { useTranslation } from 'react-i18next';
import EnrichedAirDiverNl from './EnrichedAirDiver.nl';
import EnrichedAirDiverEn from './EnrichedAirDiver.en';

const EnrichedAirDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <EnrichedAirDiverNl /> : <EnrichedAirDiverEn />;
};

export default EnrichedAirDiver;
