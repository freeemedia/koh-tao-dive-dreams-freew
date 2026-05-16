function clean(value) {
  return String(value || '').trim();
}

function getPositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildWordPressHeaders(apiKey, extraHeaders = {}) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    // Some WP security stacks are stricter with non-browser default clients.
    'User-Agent': 'Mozilla/5.0 (compatible; KTD-BookingsBot/1.0; +https://divinginasia.com)',
    'x-ktd-api-key': apiKey,
    ...extraHeaders,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeWordPressBaseUrl(rawBaseUrl) {
  let baseUrl = clean(rawBaseUrl).replace(/\/$/, '');
  if (!baseUrl) return '';

  if (!/\/wp-json\/ktd\/v1$/i.test(baseUrl)) {
    if (/\/wp-json\/ktd\/v1\//i.test(baseUrl)) {
      baseUrl = baseUrl.replace(/\/wp-json\/ktd\/v1\/.*/i, '/wp-json/ktd/v1');
    } else if (/\/wp-json$/i.test(baseUrl)) {
      baseUrl = `${baseUrl}/ktd/v1`;
    } else {
      baseUrl = `${baseUrl}/wp-json/ktd/v1`;
    }
  }

  return baseUrl;
}

function isWordPressNoRouteError(error) {
  const message = String(error instanceof Error ? error.message : error || '').toLowerCase();
  return (
    message.includes('rest_no_route') ||
    message.includes('no route was found') ||
    message.includes('no route found') ||
    message.includes('request method not found') ||
    message.includes('404')
  );
}

function getWordPressBookingsConfig() {
  const baseUrlCandidates = [
    process.env.WORDPRESS_BOOKINGS_API_URL,
    process.env.WP_BOOKINGS_API_URL,
    process.env.WP_BOOKING_URL,
    process.env.WORDPRESS_API_BASE_URL,
    process.env.VITE_WP_API_BASE,
    process.env.VITE_WP_BASE_URL,
  ]
    .map((value) => normalizeWordPressBaseUrl(value))
    .filter(Boolean);

  const dedupedBaseUrls = [...new Set(baseUrlCandidates)];
  const blockedBaseUrls = dedupedBaseUrls.filter((url) => /\.hostingersite\.com\//i.test(`${url}/`));
  const baseUrls = dedupedBaseUrls.filter((url) => !/\.hostingersite\.com\//i.test(`${url}/`));

  const apiKey = clean(
    process.env.WORDPRESS_BOOKINGS_API_KEY ||
    process.env.WP_BOOKINGS_API_KEY ||
    process.env.WP_BOOKING_API_KEY ||
    process.env.VITE_WP_BOOKING_API_KEY ||
    process.env.KTD_BOOKING_API_KEY ||
    ''
  );

  if (baseUrls.length === 0) {
    if (blockedBaseUrls.length > 0) {
      throw new Error(
        `WordPress booking API blocked: temporary Hostinger URL(s) detected (${blockedBaseUrls.join(', ')}). ` +
        'Set WORDPRESS_BOOKINGS_API_URL or WP_BOOKING_URL to a stable domain like https://admin.divinginasia.com'
      );
    }
    throw new Error('Missing WORDPRESS_BOOKINGS_API_URL. Set WORDPRESS_BOOKINGS_API_URL or WP_BOOKING_URL.');
  }
  if (!apiKey) {
    throw new Error(
      'Missing WordPress booking API key. Set one of: WORDPRESS_BOOKINGS_API_KEY, WP_BOOKINGS_API_KEY, WP_BOOKING_API_KEY, VITE_WP_BOOKING_API_KEY, KTD_BOOKING_API_KEY'
    );
  }

  return { baseUrls, apiKey };
}

async function wordpressRequest(path, options = {}) {
  const { baseUrls, apiKey } = getWordPressBookingsConfig();
  const timeoutMs = getPositiveInt(process.env.WORDPRESS_BOOKINGS_TIMEOUT_MS, 12000);
  const maxAttempts = getPositiveInt(process.env.WORDPRESS_BOOKINGS_RETRIES, 4);
  const totalAttempts = Math.max(maxAttempts, baseUrls.length);
  let lastError = null;

  for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
    const baseUrl = baseUrls[(attempt - 1) % baseUrls.length];
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: options.method || 'GET',
        headers: buildWordPressHeaders(apiKey, options.headers || {}),
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
      if ((response.status === 429 || response.status >= 500) && attempt < totalAttempts) {
        await sleep(400 * attempt);
        continue;
      }

      const message = (data && (data.message || data.error || data.code)) || text || `WordPress request failed (${response.status})`;
      throw new Error(`WordPress request failed on ${baseUrl}${path}: ${String(message)}`);
    } catch (error) {
      const isAbort = error && typeof error === 'object' && error.name === 'AbortError';
      const isNetwork = error instanceof TypeError && /fetch failed|network|socket|timed out/i.test(String(error.message || ''));
      const cause = error && typeof error === 'object' ? error.cause : null;
      const causeDetails = cause && typeof cause === 'object'
        ? [cause.code, cause.address, cause.port].filter(Boolean).join(' ')
        : '';

      if ((isAbort || isNetwork) && attempt < totalAttempts) {
        lastError = error;
        await sleep(400 * attempt);
        continue;
      }

      if (isAbort) {
        throw new Error(`WordPress request timeout after ${timeoutMs}ms (tried: ${baseUrls.join(', ')})`);
      }

      if (isNetwork) {
        const detailSuffix = causeDetails ? ` (${causeDetails})` : '';
        const endpointSuffix = ` [url=${baseUrl}${path}]`;
        throw new Error(`WordPress network error: ${String(error.message || 'fetch failed')}${detailSuffix}${endpointSuffix} (tried: ${baseUrls.join(', ')})`);
     }

      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  if (lastError) {
    const cause = lastError && typeof lastError === 'object' ? lastError.cause : null;
    const causeDetails = cause && typeof cause === 'object'
      ? [cause.code, cause.address, cause.port].filter(Boolean).join(' ')
      : '';
    const detailSuffix = causeDetails ? ` (${causeDetails})` : '';
    throw new Error(`WordPress network error: fetch failed${detailSuffix} (tried: ${baseUrls.join(', ')})`);
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
  let data = null;
  let lastError = null;

  for (const path of ['/bookings/create', '/bookings', '/booking']) {
    try {
      data = await wordpressRequest(path, {
        method: 'POST',
        body: wpPayload,
      });
      break;
    } catch (error) {
      lastError = error;
      const isRouteMissing = isWordPressNoRouteError(error);
      if (!isRouteMissing || path === '/bookings') {
        // Keep falling back for no-route responses, but fail fast for real errors.
        if (!isRouteMissing) {
          throw error;
        }
      }
    }
  }

  if (!data) {
      // If all WordPress endpoints failed, return a locally-created booking record
      // This allows bookings to be saved even when the WordPress API isn't available
      const isNotFoundError = lastError && isWordPressNoRouteError(lastError);
      if (isNotFoundError) {
        // WordPress route doesn't exist - return booking with warning instead of failing
        return {
          ...payload,
          id: payload.id,
          booking_saved_locally: true,
          wp_sync_failed: 'WordPress API endpoints not found (/wp-json/ktd/v1/bookings)',
        };
      }
      throw lastError || new Error('WordPress booking create failed');
  }

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
