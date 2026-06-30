import { useTranslation } from 'react-i18next';
import DPVDiverNl from './DPVDiver.nl';
import DPVDiverEn from './DPVDiver.en';

const DPVDiver = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DPVDiverNl /> : <DPVDiverEn />;
};

export default DPVDiver;
