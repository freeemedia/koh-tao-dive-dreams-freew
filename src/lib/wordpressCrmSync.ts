type WordPressCrmSyncPayload = {
  source: string;
  source_page: string;
  event_type: string;
  booking_id?: string;
  submitted_at: string;
  contact: {
    full_name: string;
    email: string;
    phone?: string;
    country?: string;
  };
  booking: {
    course_interest?: string;
    preferred_start_date?: string;
    experience_level?: string;
    guest_count?: number;
    accommodation_interest?: string;
    message?: string;
    payment_choice?: string;
    payment_mode?: string;
    payment_status?: string;
    deposit_amount?: number;
    total_amount?: number;
    currency?: string;
  };
  tags?: string[];
};

type QueueWordPressCrmSyncArgs = {
  wpApiBase: string;
  wpApiKey: string;
  payload: WordPressCrmSyncPayload;
};

export function queueWordPressCrmSync({ wpApiBase, wpApiKey, payload }: QueueWordPressCrmSyncArgs) {
  const base = wpApiBase.trim().replace(/\/+$/, '');
  const apiKey = wpApiKey.trim();

  if (!base || !apiKey) {
    return;
  }

  void fetch(`${base}/wp-json/ktd/v1/crm-intake`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ktd-api-key': apiKey,
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).then(async (response) => {
    if (response.ok) {
      return;
    }

    const errorText = await response.text().catch(() => 'unknown error');
    console.warn('WordPress CRM sync failed', response.status, errorText);
  }).catch((error) => {
    console.warn('WordPress CRM sync request failed', error);
  });
}