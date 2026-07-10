-- Supabase SQL: Create project_tasks table for admin task management

CREATE TABLE IF NOT EXISTS project_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'To Do',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for quick lookup by assigned user
CREATE INDEX IF NOT EXISTS idx_project_tasks_assigned_to ON project_tasks(assigned_to);
