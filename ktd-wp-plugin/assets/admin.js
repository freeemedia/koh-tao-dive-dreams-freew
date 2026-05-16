/* global jQuery, ktdAjax */
jQuery(function ($) {

    // ── Save booking edits ──────────────────────────────────────────────
    $('#ktd-edit-form').on('submit', function (e) {
        e.preventDefault();
        const $form   = $(this);
        const $status = $form.find('.ktd-save-status');
        const id      = $form.data('id');
        const data    = { action: 'ktd_update_booking', nonce: ktdAjax.nonce, id };

        $form.serializeArray().forEach(function (f) { data[f.name] = f.value; });

        $status.text('Saving…');
        $.post(ktdAjax.url, data)
            .done(function (res) {
                if (res.success) {
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
                    const m = line.match(/^\[([^\]]+)\]\s+Admin:\s+(.+)$/);
                    if (m) {
                        const d = new Date(m[1]);
                        const dateStr = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
                        html += '<div class="ktd-comment"><span class="ktd-comment-date">' + dateStr + '</span><span class="ktd-comment-text">' + m[2] + '</span></div>';
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

    // ── Quick status update from list table (future enhancement) ────────
    $(document).on('change', '.ktd-quick-status', function () {
        const $sel = $(this);
        const id   = $sel.data('id');
        $.post(ktdAjax.url, {
            action: 'ktd_update_booking',
            nonce:  ktdAjax.nonce,
            id:     id,
            status: $sel.val(),
        });
    });

});
