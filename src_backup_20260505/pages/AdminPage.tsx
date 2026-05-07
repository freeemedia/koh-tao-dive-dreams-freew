
import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminBookings from '../components/AdminBookings';


const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{t('admin.panel')}</h1>
      <AdminBookings />
    </div>
  );
};

export default AdminPage;
