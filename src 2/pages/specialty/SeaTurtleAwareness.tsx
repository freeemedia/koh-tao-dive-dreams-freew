import { useTranslation } from 'react-i18next';
import SeaTurtleAwarenessNl from './SeaTurtleAwareness.nl';
import SeaTurtleAwarenessEn from './SeaTurtleAwareness.en';

const SeaTurtleAwareness = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <SeaTurtleAwarenessNl /> : <SeaTurtleAwarenessEn />;
};

export default SeaTurtleAwareness;
