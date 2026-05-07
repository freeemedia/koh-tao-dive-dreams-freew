import { useTranslation } from 'react-i18next';
import DiscoverScubaDeluxeNl from './DiscoverScubaDeluxe.nl';
import DiscoverScubaDeluxeEn from './DiscoverScubaDeluxe.en';

const DiscoverScubaDeluxe = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DiscoverScubaDeluxeNl /> : <DiscoverScubaDeluxeEn />;
};

export default DiscoverScubaDeluxe;
