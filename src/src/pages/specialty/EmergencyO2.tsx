import { useTranslation } from 'react-i18next';
import EmergencyO2Nl from './EmergencyO2.nl';
import EmergencyO2En from './EmergencyO2.en';

const EmergencyO2 = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <EmergencyO2Nl /> : <EmergencyO2En />;
};

export default EmergencyO2;
