import { useTranslation } from 'react-i18next';
import DivemasterInternshipNl from './Divemaster.nl';
import DivemasterInternshipEn from './Divemaster.en';

const DivemasterInternship = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <DivemasterInternshipNl /> : <DivemasterInternshipEn />;
};

export default DivemasterInternship;
