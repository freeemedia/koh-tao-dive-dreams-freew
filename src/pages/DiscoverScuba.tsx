import { useTranslation } from 'react-i18next';
import DiscoverScubaNl from './DiscoverScuba.nl';
import DiscoverScubaEn from './DiscoverScuba.en';

const DiscoverScuba = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DiscoverScubaNl /> : <DiscoverScubaEn />;
};

export default DiscoverScuba;
