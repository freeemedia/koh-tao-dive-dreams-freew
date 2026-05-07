import { useTranslation } from 'react-i18next';
import UnderwaterNavigatorNl from './UnderwaterNavigator.nl';
import UnderwaterNavigatorEn from './UnderwaterNavigator.en';

const UnderwaterNavigator = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <UnderwaterNavigatorNl /> : <UnderwaterNavigatorEn />;
};

export default UnderwaterNavigator;
