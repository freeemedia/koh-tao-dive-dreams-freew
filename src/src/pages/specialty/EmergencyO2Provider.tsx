import { useTranslation } from 'react-i18next';
import EmergencyO2ProviderNl from './EmergencyO2Provider.nl';
import EmergencyO2ProviderEn from './EmergencyO2Provider.en';

const EmergencyO2Provider = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <EmergencyO2ProviderNl /> : <EmergencyO2ProviderEn />;
};

export default EmergencyO2Provider;
