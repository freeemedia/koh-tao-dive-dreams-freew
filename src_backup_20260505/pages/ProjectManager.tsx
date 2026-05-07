
import TaskTable from '../components/TaskTable';
import TaskCalendar from '../components/TaskCalendar';

const jiraEmbedUrl = process.env.NEXT_PUBLIC_JIRA_EMBED_URL || '';
const jiraProjectUrl = process.env.NEXT_PUBLIC_JIRA_PROJECT_URL || jiraEmbedUrl || 'https://divinginasia.atlassian.net';

export default function ProjectManager() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Project Manager</h1>
      <p className="mb-6 text-gray-600">This section will contain project management tools and links.</p>
      {/* Overview Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <div className="flex space-x-4">
          <div className="bg-blue-100 rounded p-4 flex-1">Summary Card 1</div>
          <div className="bg-green-100 rounded p-4 flex-1">Summary Card 2</div>
          <div className="bg-yellow-100 rounded p-4 flex-1">Summary Card 3</div>
        </div>
      </section>
      {/* Task Management Section */}
      <section className="bg-white rounded shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Task Management</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Table View</h3>
            <TaskTable />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={() => alert('Exporting all tasks to Jira (placeholder)')}
            >
              Export to Jira
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Calendar View</h3>
            <div className="border rounded p-2 bg-gray-50">
              <TaskCalendar />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Jira</h2>
            <p className="text-sm text-gray-600">
              View the Jira project here. If Atlassian blocks the embed in your browser, open it in a new tab.
            </p>
          </div>
          <a
            href={jiraProjectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open Jira
          </a>
        </div>

        {jiraEmbedUrl ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <iframe
              title="Jira Project"
              src={jiraEmbedUrl}
              className="h-[720px] w-full bg-white"
            />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
            Set `NEXT_PUBLIC_JIRA_EMBED_URL` to the embeddable Jira view and optionally `NEXT_PUBLIC_JIRA_PROJECT_URL`
            for the direct project link.
          </div>
        )}
      </section>
      {/* Calendar Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Calendar & Deadlines</h2>
        <div className="text-gray-500">[Calendar placeholder]</div>
      </section>
      {/* Team Management Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Team Management</h2>
        <div className="text-gray-500">[Team members placeholder]</div>
      </section>
      {/* Notes & Files Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Notes & Files</h2>
        <div className="text-gray-500">[Notes and file uploads placeholder]</div>
      </section>
      {/* Progress Tracking Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
        <div className="text-gray-500">[Milestones and progress bars placeholder]</div>
      </section>
      {/* Notifications Section */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="text-gray-500">[Notifications placeholder]</div>
      </section>
    </div>
  );
}
