-- One-time cleanup of legacy HTML/encoded HTML saved in dive-site page_content rows.
-- Normalizes content to plain text for sections used by DiveSiteDetail.

UPDATE public.page_content
SET content_value = trim(
  BOTH E' \n\r\t' FROM regexp_replace(
    regexp_replace(
      regexp_replace(
        replace(
          replace(
            replace(
              replace(
                replace(
                  content_value,
                  '&nbsp;',
                  ' '
                ),
                '&amp;',
                '&'
              ),
              '&lt;',
              '<'
            ),
            '&gt;',
            '>'
          ),
          E'\r\n',
          E'\n'
        ),
        '<br\\s*/?>',
        E'\n',
        'gi'
      ),
      '</(p|div|li|h[1-6])>',
      E'\n',
      'gi'
    ),
    '<li[^>]*>|<[^>]*>',
    ' ',
    'gi'
  )
)
WHERE (
    page_slug LIKE 'dive-sites/%'
    OR page_slug IN (
      'sail-rock',
      'shark-island',
      'htms-sattakut',
      'japanese-gardens',
      'mango-bay',
      'twins-pinnacle',
      'south-west-pinnacle',
      'chumphon-pinnacle'
    )
  )
  AND section_key IN (
    'overview',
    'quick_facts_depth',
    'quick_facts_difficulty',
    'quick_facts_location',
    'quick_facts_best_time',
    'what_you_can_see',
    'marine_life_highlights',
    'diving_tips',
    'images'
  )
  AND content_value ~* '(<[^>]+>|&lt;|&gt;|&nbsp;|&amp;)';
