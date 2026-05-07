import { useTranslation } from 'react-i18next';
import AdvancedNl from './Advanced.nl';
import AdvancedEn from './Advanced.en';

const Advanced = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <AdvancedNl /> : <AdvancedEn />;
};

export default Advanced;
