import { useTranslation } from 'react-i18next';
import WhaleSharkAwarenessNl from './WhaleSharkAwareness.nl';
import WhaleSharkAwarenessEn from './WhaleSharkAwareness.en';

const WhaleSharkAwareness = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <WhaleSharkAwarenessNl /> : <WhaleSharkAwarenessEn />;
};

export default WhaleSharkAwareness;
