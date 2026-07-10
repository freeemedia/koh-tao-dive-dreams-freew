import { useTranslation } from 'react-i18next';
import PeakPerformanceBuoyancyNl from './PeakPerformanceBuoyancy.nl';
import PeakPerformanceBuoyancyEn from './PeakPerformanceBuoyancy.en';

const PeakPerformanceBuoyancy = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <PeakPerformanceBuoyancyNl /> : <PeakPerformanceBuoyancyEn />;
};

export default PeakPerformanceBuoyancy;
