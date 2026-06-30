import { useTranslation } from 'react-i18next';
import EquipmentSpecialistNl from './EquipmentSpecialist.nl';
import EquipmentSpecialistEn from './EquipmentSpecialist.en';

const EquipmentSpecialist = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');

  return isNl ? <EquipmentSpecialistNl /> : <EquipmentSpecialistEn />;
};

export default EquipmentSpecialist;
