import { useTranslation } from 'react-i18next';
import InstructorInternshipNl from './Instructor.nl';
import InstructorInternshipEn from './Instructor.en';

const InstructorInternship = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <InstructorInternshipNl /> : <InstructorInternshipEn />;
};

export default InstructorInternship;
