/* global jQuery, ktdAjax */
jQuery(function ($) {

    // ── Keep Due in sync with Total - Deposit ──────────────────────────
    const $editForm = $('#ktd-edit-form');
    if ($editForm.length) {
        const $totalInput = $editForm.find('input[name="total_amount"]');
        const $depositInput = $editForm.find('input[name="deposit_amount"]');
        const $dueInput = $editForm.find('input[name="due_amount"]');

        const parseAmount = function (value) {
            const raw = String(value == null ? '' : value).trim().replace(/,/g, '');
            if (!raw) return null;
            const parsed = Number(raw);
            return Number.isFinite(parsed) ? parsed : null;
        };

        const formatAmount = function (value) {
            if (!Number.isFinite(value)) return '';
            return String(Math.round(value * 100) / 100);
        };

        const recalcDue = function () {
            const total = parseAmount($totalInput.val());
            const deposit = parseAmount($depositInput.val()) || 0;

            if (total === null) {
                $dueInput.val('');
                return;
            }

            const due = Math.max(0, total - deposit);
            $dueInput.val(formatAmount(due));
        };

        $totalInput.on('input change', recalcDue);
        $depositInput.on('input change', recalcDue);
        recalcDue();
    }

    // ── Save booking edits ──────────────────────────────────────────────
    $('#ktd-edit-form').on('submit', function (e) {
        e.preventDefault();
        const $form   = $(this);
        const $status = $form.find('.ktd-save-status');
        const id      = $form.data('id');
        const data    = { action: 'ktd_update_booking', nonce: ktdAjax.nonce, id };

        const editorValue = $('#ktd-comments-editor').length ? ($('#ktd-comments-editor').val() || '') : null;
        if (editorValue !== null && $('#ktd-internal-notes-hidden').length) {
            $('#ktd-internal-notes-hidden').val(editorValue);
        }

        $form.serializeArray().forEach(function (f) { data[f.name] = f.value; });

        $status.text('Saving…');
        $.post(ktdAjax.url, data)
            .done(function (res) {
                if (res.success) {
                    if (editorValue !== null && $('#ktd-comments-editor').length) {
                        $('#ktd-comments-editor').val(editorValue);
                    }
                    $status.css('color', '#155724').text('✓ Saved');
                } else {
                    $status.css('color', '#721c24').text('Error: ' + (res.data || 'Unknown'));
                }
            })
            .fail(function () {
                $status.css('color', '#721c24').text('Request failed');
            });
    });

    // ── Add comment ─────────────────────────────────────────────────────
    $('#ktd-comment-btn').on('click', function () {
        const id      = $('.ktd-add-comment').data('id');
        const comment = $('#ktd-comment-input').val().trim();
        const $status = $('#ktd-comment-status');

        if (!comment) { $status.text('Please enter a comment.'); return; }

        $status.text('Saving…');
        $.post(ktdAjax.url, {
            action:  'ktd_add_comment',
            nonce:   ktdAjax.nonce,
            id:      id,
            comment: comment,
        })
        .done(function (res) {
            if (res.success) {
                const notes = res.data.notes || '';
                // Re-render comments from notes
                const lines = notes.split('\n');
                let html = '';
                lines.forEach(function (line) {
                    const trimmed = String(line || '').trim();
                    if (!trimmed || trimmed.toLowerCase() === 'wordpress') {
                        return;
                    }

                    const m = trimmed.match(/^\[([^\]]+)\]\s+Admin:\s+(.+)$/);
                    if (m) {
                        const d = new Date(m[1]);
                        const dateStr = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
                        html += '<div class="ktd-comment"><span class="ktd-comment-date">' + dateStr + '</span><span class="ktd-comment-text">' + m[2] + '</span></div>';
                    } else {
                        html += '<div class="ktd-comment"><span class="ktd-comment-date">Note</span><span class="ktd-comment-text">' + $('<div>').text(trimmed).html() + '</span></div>';
                    }
                });
                $('#ktd-comments').html(html || '<p class="ktd-no-comments">No comments yet.</p>');
                $('#ktd-comment-input').val('');
                $status.css('color', '#155724').text('✓ Comment added');
            } else {
                $status.css('color', '#721c24').text('Error: ' + (res.data || 'Unknown'));
            }
        })
        .fail(function () {
            $status.css('color', '#721c24').text('Request failed');
        });
    });

    // ── Save editable comments (overwrite internal notes) ───────────────
    $('#ktd-save-comments-btn').on('click', function (e) {
        e.preventDefault();
        const id      = $('.ktd-add-comment').data('id');
        const notes   = $('#ktd-comments-editor').val() || '';
        const $status = $('#ktd-comment-status');

        if (!id) {
            $status.css('color', '#721c24').text('Missing booking ID');
            return;
        }

        $status.css('color', '#6c757d').text('Saving...');
        $.post(ktdAjax.url, {
            action: 'ktd_update_booking',
            nonce:  ktdAjax.nonce,
            id:     id,
            internal_notes: notes,
        })
            .done(function (res) {
                if (res.success) {
                    const cleanNotes = String(notes).trim().toLowerCase() === 'wordpress' ? '' : String(notes);
                    const lines = cleanNotes.split('\n');
                    let html = '';

                    lines.forEach(function (line) {
                        const trimmed = String(line || '').trim();
                        if (!trimmed || trimmed.toLowerCase() === 'wordpress') {
                            return;
                        }

                        const m = trimmed.match(/^\[([^\]]+)\]\s+Admin:\s+(.+)$/);
                        if (m) {
                            const d = new Date(m[1]);
                            const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                            html += '<div class="ktd-comment"><span class="ktd-comment-date">' + dateStr + '</span><span class="ktd-comment-text">' + $('<div>').text(m[2]).html() + '</span></div>';
                        } else {
                            html += '<div class="ktd-comment"><span class="ktd-comment-date">Note</span><span class="ktd-comment-text">' + $('<div>').text(trimmed).html() + '</span></div>';
                        }
                    });

                    $('#ktd-comments').html(html || '<p class="ktd-no-comments">No comments yet.</p>');
                    $status.css('color', '#155724').text('✓ Comments saved');
                } else {
                    $status.css('color', '#721c24').text('Error: ' + (res.data || 'Unknown'));
                }
            })
            .fail(function () {
                $status.css('color', '#721c24').text('Request failed');
            });
    });

    // ── Quick status update from list table ──────────────────────────────
    $(document).on('change', '.ktd-quick-status', function () {
        const $sel = $(this);
        const id   = $sel.data('id');
        const prev = $sel.data('current') || '';
        const next = $sel.val();
        const $cell = $sel.closest('td');
        const $badge = $cell.find('.ktd-badge');
        const $msg = $cell.find('.ktd-inline-status-message');

        if (!id || !next || prev === next) {
            return;
        }

        $sel.prop('disabled', true);
        $msg.css('color', '#6c757d').text('Saving...');

        $.post(ktdAjax.url, {
            action: 'ktd_update_booking',
            nonce:  ktdAjax.nonce,
            id:     id,
            status: next,
        })
            .done(function (res) {
                if (res.success) {
                    $sel.data('current', next);
                    $badge
                        .attr('class', 'ktd-badge ktd-status-' + next)
                        .text(next.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }));
                    $msg.css('color', '#155724').text('Saved');
                } else {
                    $sel.val(prev);
                    $msg.css('color', '#721c24').text('Error: ' + (res.data || 'Unknown'));
                }
            })
            .fail(function () {
                $sel.val(prev);
                $msg.css('color', '#721c24').text('Request failed');
            })
            .always(function () {
                $sel.prop('disabled', false);
            });
    });

    // ── Quick payment status update from list table ────────────────────
    $(document).on('change', '.ktd-quick-payment', function () {
        const $sel = $(this);
        const id   = $sel.data('id');
        const prev = $sel.data('current') || '';
        const next = $sel.val();
        const $cell = $sel.closest('td');
        const $badge = $cell.find('.ktd-badge');
        const $msg = $cell.find('.ktd-inline-payment-message');

        if (!id || !next || prev === next) {
            return;
        }

        $sel.prop('disabled', true);
        $msg.css('color', '#6c757d').text('Saving...');

        $.post(ktdAjax.url, {
            action: 'ktd_update_booking',
            nonce:  ktdAjax.nonce,
            id:     id,
            payment_status: next,
        })
            .done(function (res) {
                if (res.success) {
                    $sel.data('current', next);
                    $badge
                        .attr('class', 'ktd-badge ktd-pay-' + next)
                        .text(next.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }));
                    $msg.css('color', '#155724').text('Saved');
                } else {
                    $sel.val(prev);
                    $msg.css('color', '#721c24').text('Error: ' + (res.data || 'Unknown'));
                }
            })
            .fail(function () {
                $sel.val(prev);
                $msg.css('color', '#721c24').text('Request failed');
            })
            .always(function () {
                $sel.prop('disabled', false);
            });
    });

});
