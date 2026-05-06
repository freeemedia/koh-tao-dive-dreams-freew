type SendBookingNotificationArgs = {
  endpointUrl: string;
  payload: Record<string, any>;
};

type SendBookingNotificationResult = {
  success: boolean;
  warning?: string;
  message?: string;
  provider: 'backend' | 'web3forms' | 'none';
};

const DEFAULT_WEB3FORMS_KEY = 'b42b4f7a-b0b3-4ba9-8197-cf5abe9f09e6';

function summarizePayload(payload: Record<string, any>) {
  return [
    `Booking/Inquiry: ${payload.item_title || 'N/A'}`,
    `Name: ${payload.name || 'N/A'}`,
    `Email: ${payload.email || 'N/A'}`,
    `Phone: ${payload.phone || 'N/A'}`,
    `Preferred Date: ${payload.preferred_date || 'N/A'}`,
    `Experience Level: ${payload.experience_level || 'N/A'}`,
    `Payment Choice: ${payload.payment_choice || 'N/A'}`,
    '',
    'Message:',
    payload.message || 'N/A',
  ].join('\n');
}

async function sendViaBackend(endpointUrl: string, payload: Record<string, any>) {
  if (!endpointUrl) {
    return { success: false, message: 'Booking email endpoint not configured' };
  }

  const res = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return {
      success: false,
      message: 'Booking email endpoint returned non-JSON response',
    };
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      success: false,
      message: data?.message || data?.error || `HTTP ${res.status}`,
    };
  }

  return {
    success: Boolean(data?.success ?? true),
    warning: data?.warning,
    message: data?.message,
  };
}

async function sendViaWeb3Forms(payload: Record<string, any>) {
  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_KEY).trim();
  if (!accessKey) {
    return { success: false, message: 'Web3Forms access key missing' };
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Booking Inquiry - ${payload.item_title || 'Dive Booking'}`,
      from_name: payload.name || 'Website Visitor',
      email: payload.email || 'no-email-provided@example.com',
      message: summarizePayload(payload),
    }),
  });

  const data = await res.json().catch(() => ({}));
  return {
    success: Boolean(res.ok && data?.success),
    message: data?.message || (!res.ok ? `HTTP ${res.status}` : undefined),
  };
}

export async function sendBookingNotification({ endpointUrl, payload }: SendBookingNotificationArgs): Promise<SendBookingNotificationResult> {
  try {
    const backendResult = await sendViaBackend(endpointUrl, payload);
    if (backendResult.success) {
      return { ...backendResult, provider: 'backend' };
    }
  } catch (error) {
    console.warn('Primary booking email endpoint failed, using Web3Forms fallback.', error);
  }

  try {
    const web3Result = await sendViaWeb3Forms(payload);
    if (web3Result.success) {
      return { ...web3Result, provider: 'web3forms' };
    }
    return {
      ...web3Result,
      provider: 'none',
      message: web3Result.message || 'Email service unavailable',
    };
  } catch (error) {
    return {
      success: false,
      provider: 'none',
      message: error instanceof Error ? error.message : 'Email service unavailable',
    };
  }
}
