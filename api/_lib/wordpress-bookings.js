function clean(value) {
  return String(value || '').trim();
}

function getPositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordPressBookingsConfig() {
  let baseUrl = clean(
    process.env.WORDPRESS_BOOKINGS_API_URL ||
    process.env.WP_BOOKINGS_API_URL ||
    process.env.WP_BOOKING_URL ||
    process.env.WORDPRESS_API_BASE_URL ||
    ''
  ).replace(/\/$/, '');

  const apiKey = clean(
    process.env.WORDPRESS_BOOKINGS_API_KEY ||
    process.env.WP_BOOKINGS_API_KEY ||
    process.env.WP_BOOKING_API_KEY ||
    process.env.KTD_BOOKING_API_KEY ||
    ''
  );

  if (!baseUrl) {
    throw new Error('Missing WORDPRESS_BOOKINGS_API_URL');
  }
  if (!apiKey) {
    throw new Error('Missing WORDPRESS_BOOKINGS_API_KEY');
  }

  if (!/\/wp-json\/ktd\/v1$/i.test(baseUrl)) {
    if (/\/wp-json\/ktd\/v1\//i.test(baseUrl)) {
      baseUrl = baseUrl.replace(/\/wp-json\/ktd\/v1\/.*/i, '/wp-json/ktd/v1');
    } else if (/\/wp-json$/i.test(baseUrl)) {
      baseUrl = `${baseUrl}/ktd/v1`;
    } else {
      baseUrl = `${baseUrl}/wp-json/ktd/v1`;
    }
  }

  return { baseUrl, apiKey };
}

async function wordpressRequest(path, options = {}) {
  const { baseUrl, apiKey } = getWordPressBookingsConfig();
  const timeoutMs = getPositiveInt(process.env.WORDPRESS_BOOKINGS_TIMEOUT_MS, 12000);
  const maxAttempts = getPositiveInt(process.env.WORDPRESS_BOOKINGS_RETRIES, 3);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-ktd-api-key': apiKey,
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text || null;
      }

      if (response.ok) {
        return data;
      }

      // Retry only transient upstream failures.
      if ((response.status === 429 || response.status >= 500) && attempt < maxAttempts) {
        await sleep(250 * attempt);
        continue;
      }

      const message = (data && (data.message || data.error || data.code)) || text || `WordPress request failed (${response.status})`;
      throw new Error(String(message));
    } catch (error) {
      const isAbort = error && typeof error === 'object' && error.name === 'AbortError';
      const isNetwork = error instanceof TypeError && /fetch failed|network|socket|timed out/i.test(String(error.message || ''));
      const cause = error && typeof error === 'object' ? error.cause : null;
      const causeDetails = cause && typeof cause === 'object'
        ? [cause.code, cause.address, cause.port].filter(Boolean).join(' ')
        : '';

      if ((isAbort || isNetwork) && attempt < maxAttempts) {
        await sleep(250 * attempt);
        continue;
      }

      if (isAbort) {
        throw new Error(`WordPress request timeout after ${timeoutMs}ms`);
      }

      if (isNetwork) {
        const detailSuffix = causeDetails ? ` (${causeDetails})` : '';
        throw new Error(`WordPress network error: ${String(error.message || 'fetch failed')}${detailSuffix}`);
      }

      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  throw new Error('WordPress request failed after retries');
}

function normalizeWordPressRow(row) {
  if (!row || typeof row !== 'object') return row;
  return {
    ...row,
    id: row.id != null ? String(row.id) : row.id,
    course_title: row.course_title || row.item_title || '',
    item_title: row.item_title || row.course_title || '',
    internal_notes: row.internal_notes || row.message || '',
    message: row.message || row.internal_notes || '',
  };
}

function toWordPressPayload(payload = {}) {
  return {
    ...payload,
    item_title: payload.item_title || payload.course_title || '',
    booking_type: payload.booking_type || payload.item_type || '',
  };
}

export async function listWordPressBookings() {
  const data = await wordpressRequest('/bookings');
  const rows = Array.isArray(data?.data) ? data.data : [];
  return rows.map(normalizeWordPressRow);
}

export async function getWordPressBookingById(id) {
  const data = await wordpressRequest(`/bookings/${encodeURIComponent(String(id))}`);
  const row = data?.booking || data?.data || data;

  if (!row || typeof row !== 'object') {
    throw new Error('Booking not found');
  }

  return normalizeWordPressRow(row);
}

export async function insertWordPressBooking(payload) {
  const wpPayload = toWordPressPayload(payload);
  const data = await wordpressRequest('/bookings', {
    method: 'POST',
    body: wpPayload,
  });

  const id = data?.id != null ? String(data.id) : null;
  if (!id) {
    throw new Error('WordPress booking create did not return id');
  }

  return normalizeWordPressRow({
    ...payload,
    ...wpPayload,
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function updateWordPressBookingById(id, updates) {
  const wpUpdates = toWordPressPayload(updates);
  const data = await wordpressRequest(`/bookings/${encodeURIComponent(String(id))}`, {
    method: 'PATCH',
    body: wpUpdates,
  });

  const row = data?.booking;
  if (!row || typeof row !== 'object') {
    throw new Error('WordPress update did not return booking');
  }

  return normalizeWordPressRow(row);
}

export async function deleteWordPressBookingById(id) {
  const data = await wordpressRequest(`/bookings/${encodeURIComponent(String(id))}`, {
    method: 'DELETE',
  });

  if (data?.success === false) {
    throw new Error(data?.message || 'WordPress delete failed');
  }

  return { deleted: String(id) };
}
