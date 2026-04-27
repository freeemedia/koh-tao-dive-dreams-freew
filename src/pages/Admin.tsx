import LanguageSwitcher from '../components/LanguageSwitcher';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const { t } = useTranslation();
  const jiraEmbedUrl = import.meta.env.VITE_JIRA_EMBED_URL || '';
  const jiraProjectUrl = import.meta.env.VITE_JIRA_PROJECT_URL || jiraEmbedUrl || 'https://divinginasia.atlassian.net';

  return (
    <div className="min-h-[80vh] pt-[10px] bg-gradient-to-br from-blue-50 to-emerald-50">
      <header className="w-full py-8 mb-8 bg-gradient-to-r from-blue-700 to-emerald-600 shadow-lg text-white rounded-b-3xl flex flex-col items-center relative">
        <div className="absolute top-4 right-6">
          <LanguageSwitcher />
        </div>
        <h1 className="text-3xl font-bold tracking-wide mb-2">{t('admin.dashboard_title', { defaultValue: 'Admin Dashboard' })}</h1>
      </header>
      <div className="flex flex-col items-center mb-8">
        <a
          href="/"
          className="mt-4 inline-block rounded bg-gray-500 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700 shadow"
        >
          {t('admin.back_to_main_page', { defaultValue: 'Back to Main Page' })}
        </a>
      </div>
      <div className="px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Project Manager</h2>
              <p className="text-sm text-gray-600">
                {t('admin.project_manager_jira_restriction', { defaultValue: 'Jira cannot be embedded due to Atlassian restrictions. Please use the button below to open the Jira project board in a new tab.' })}
              </p>
            </div>
            <a
              href={jiraProjectUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t('admin.open_jira', { defaultValue: 'Open Jira' })}
            </a>
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
            {t('admin.project_manager_embedding_not_supported', { defaultValue: '(Direct embedding is not supported by Jira. Use the button above to access your board.)' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;