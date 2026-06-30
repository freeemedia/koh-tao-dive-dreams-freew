import { useTranslation } from 'react-i18next';
import RescueNl from './Rescue.nl';
import RescueEn from './Rescue.en';

const Rescue = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <RescueNl /> : <RescueEn />;
};

export default Rescue;
