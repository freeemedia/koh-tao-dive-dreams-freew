CREATE TABLE IF NOT EXISTS public.role_change_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL CHECK (action IN ('add', 'remove')),
  target_user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  changed_by uuid NULL,
  changed_by_email text NULL,
  note text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_role_change_audit_created_at
  ON public.role_change_audit(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_role_change_audit_target_user
  ON public.role_change_audit(target_user_id);

ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'role_change_audit'
      AND policyname = 'Admins can view role change audit'
  ) THEN
    CREATE POLICY "Admins can view role change audit"
      ON public.role_change_audit
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
