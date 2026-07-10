import { useTranslation } from 'react-i18next';
import DiveAgainstDebrisNl from './DiveAgainstDebris.nl';
import DiveAgainstDebrisEn from './DiveAgainstDebris.en';

const DiveAgainstDebris = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DiveAgainstDebrisNl /> : <DiveAgainstDebrisEn />;
};

export default DiveAgainstDebris;
