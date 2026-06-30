import { useTranslation } from 'react-i18next';
import UnderwaterNaturalistNl from './UnderwaterNaturalist.nl';
import UnderwaterNaturalistEn from './UnderwaterNaturalist.en';

const UnderwaterNaturalist = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <UnderwaterNaturalistNl /> : <UnderwaterNaturalistEn />;
};

export default UnderwaterNaturalist;
