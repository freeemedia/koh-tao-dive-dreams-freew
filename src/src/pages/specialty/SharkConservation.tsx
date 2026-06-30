import { useTranslation } from 'react-i18next';
import SharkConservationNl from './SharkConservation.nl';
import SharkConservationEn from './SharkConservation.en';

const SharkConservation = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <SharkConservationNl /> : <SharkConservationEn />;
};

export default SharkConservation;
