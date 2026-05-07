import { useTranslation } from 'react-i18next';
import PhotographyNl from './Photography.nl';
import PhotographyEn from './Photography.en';

const Photography = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <PhotographyNl /> : <PhotographyEn />;
};

export default Photography;
