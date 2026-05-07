import { useTranslation } from 'react-i18next';
import OpenWaterNl from './OpenWater.nl';
import OpenWaterEn from './OpenWater.en';

const OpenWater = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <OpenWaterNl /> : <OpenWaterEn />;
};

export default OpenWater;
