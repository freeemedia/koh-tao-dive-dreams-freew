import { useTranslation } from 'react-i18next';
import SearchRecoveryNl from './SearchRecovery.nl';
import SearchRecoveryEn from './SearchRecovery.en';

const SearchRecovery = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <SearchRecoveryNl /> : <SearchRecoveryEn />;
};

export default SearchRecovery;
