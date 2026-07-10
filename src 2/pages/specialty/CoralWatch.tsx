import { useTranslation } from 'react-i18next';
import CoralWatchNl from './CoralWatch.nl';
import CoralWatchEn from './CoralWatch.en';

const CoralWatch = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <CoralWatchNl /> : <CoralWatchEn />;
};

export default CoralWatch;
