import { useTranslation } from 'react-i18next';
import EFRNl from './EFR.nl';
import EFREn from './EFR.en';

const EFR = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <EFRNl /> : <EFREn />;
};

export default EFR;
