export const scrollToWithOffset = (id: string, offset = 88, behavior: ScrollBehavior = 'smooth') => {
  const el = document.getElementById(id);
  if (!el) return false;
  if (el.getClientRects().length === 0) return false;
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const top = rect.top + scrollTop - offset;
  window.scrollTo({ top, behavior });
  return true;
};

export const tryAutoScroll = (id: string, offset = 88) => {
  // Retry a few times to let layout settle (used on mount)
  if (!id) return;
  let attempts = 0;
  const tryOnce = () => {
    const done = scrollToWithOffset(id, offset);
    attempts += 1;
    if (!done && attempts < 10) setTimeout(tryOnce, 100);
  };
  tryOnce();
};
