import { useTranslation } from 'react-i18next';
import VisasKohTaoNl from './VisasKohTao.nl';
import VisasKohTaoEn from './VisasKohTao.en';

const VisasKohTao = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <VisasKohTaoNl /> : <VisasKohTaoEn />;
};

export default VisasKohTao;
