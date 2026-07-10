import { useTranslation } from 'react-i18next';
import FunDivingNl from './FunDiving.nl';
import FunDivingEn from './FunDiving.en';

const FunDiving = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <FunDivingNl /> : <FunDivingEn />;
};

export default FunDiving;
