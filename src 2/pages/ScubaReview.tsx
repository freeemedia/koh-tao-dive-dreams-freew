import { useTranslation } from 'react-i18next';
import ScubaReviewNl from './ScubaReview.nl';
import ScubaReviewEn from './ScubaReview.en';

const ScubaReview = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <ScubaReviewNl /> : <ScubaReviewEn />;
};

export default ScubaReview;
