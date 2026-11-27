(() => {
  const screen = document.querySelector('.phone');
  const content = screen.querySelector('.content');
  const plans = screen.querySelector('.plans');
  const dialogOffer = screen.querySelector('.dialog-offer');
  const offerDetail = dialogOffer.querySelector('strong');
  const planButtons = [...plans.querySelectorAll('.plan')];
  const terms = screen.querySelector('.terms');
  const cta = screen.querySelector('.cta');
  const ctaLabel = cta.querySelector('.cta-label');
  const spinner = cta.querySelector('.billing-spinner');
  const restore = screen.querySelector('#restore-purchases');
  const sheet = screen.querySelector('.billing-sheet');
  const sheetClose = sheet.querySelector('button');
  const close = screen.querySelector('.close');
  const reopen = document.querySelector('#reopen');
  const { t } = smartHueLocale;
  const states = {
    ready: { label: 'continue', action: 'buy' },
    weekly: { label: 'continue', action: 'buy' },
    'weekly-intro': { label: 'continue', action: 'buy' },
    'weekly-trial': { label: 'startTrial', action: 'buy' },
    trial: { label: 'startTrial', action: 'buy' },
    loading: { label: 'loadBusy', busy: true, next: 'ready' },
    'load-error': { label: 'retry', message: 'loadError', action: 'load', lockPlans: true },
    eligibility: { label: 'checkingOffer', busy: true, next: 'ready' },
    opening: { label: 'opening', busy: true, next: 'cancelled' },
    cancelled: { label: 'continue', action: 'buy' },
    pending: { label: 'pending', message: 'pendingCopy', lockPlans: true },
    unverified: { label: 'checkStatus', message: 'unverified', action: 'verify', lockPlans: true },
    verifying: { label: 'checkingStatus', busy: true, next: 'purchased' },
    'purchase-error': { label: 'tryAgain', message: 'purchaseError', action: 'buy' },
    purchased: { label: 'continue', message: 'purchased', action: 'continue', access: true },
    restoring: { label: 'restoring', busy: true, next: 'restore-empty' },
    restored: { label: 'continue', message: 'restored', action: 'continue', access: true },
    'restore-empty': { label: 'continue', message: 'restoreEmpty', action: 'buy' },
    'restore-error': { label: 'retryRestore', message: 'restoreError', action: 'restore' },
    entitled: { label: 'continue', message: 'entitled', action: 'continue', access: true },
  };

  let state = 'ready';
  let trialOffer = false;
  let trialPlan = 'yearly';
  let weeklyIntroOffer = false;
  let previousFocus;
  let pendingTransition;

  function render() {
    const current = states[state];
    const selectedPlan = planButtons.find(plan => plan.getAttribute('aria-pressed') === 'true');
    const isDialog = screen.classList.contains('christmas-dialog');
    const singleOffer = isDialog;
    const selectedTrial = trialOffer && selectedPlan.dataset.plan === trialPlan;
    const selectedIntro = weeklyIntroOffer && selectedPlan.dataset.plan === 'weekly';
    const price = isDialog ? (selectedPlan.dataset.plan === 'weekly' ? 'dialogWeeklyRenewal' : 'dialogRenewal') : (selectedTrial ? (trialPlan === 'weekly' ? 'weeklyFreeTrialRenewal' : 'trialRenewal') : selectedIntro ? 'weeklyIntroRenewal' : `${selectedPlan.dataset.plan}Terms`);
    const label = current.action === 'buy' && ['continue', 'startTrial'].includes(current.label)
      ? (selectedTrial ? 'startTrial' : isDialog && selectedPlan.dataset.plan === 'weekly' ? 'dialogContinue' : 'continue') : current.label;
    screen.toggleAttribute('data-trial-offer', trialOffer);
    screen.dataset.billing = state;
    terms.textContent = t(current.message ?? price);
    terms.hidden = isDialog && trialOffer && !current.message;
    const yearlyDetail = plans.querySelector('[data-i18n="yearlyDetail"]');
    yearlyDetail.textContent = t(trialOffer && trialPlan === 'yearly' ? 'yearlyTrialDetail' : 'yearlyDetail');
    plans.querySelector('[data-i18n="weeklyDetail"]').textContent = t(trialOffer ? (trialPlan === 'weekly' ? 'weeklyFreeTrialDetail' : 'weeklyTrialDetail') : weeklyIntroOffer ? 'weeklyIntroDetail' : 'weeklyDetail');
    terms.setAttribute('aria-hidden', String(state === 'loading'));
    const hideOffer = Boolean(current.access || state === 'load-error');
    plans.hidden = hideOffer || singleOffer;
    dialogOffer.hidden = hideOffer || !singleOffer;
    const offerKey = isDialog ? (selectedTrial ? (trialPlan === 'weekly' ? 'dialogWeeklyTrialBilling' : 'dialogTrialBilling') : selectedPlan.dataset.plan === 'weekly' ? (selectedIntro ? 'dialogWeeklyIntroBilling' : 'dialogWeeklyBilling') : 'dialogBilling') : 'trialDuration';
    offerDetail.textContent = t(offerKey);
    planButtons.forEach(plan => {
      plan.disabled = Boolean(current.busy || current.lockPlans);
    });
    cta.disabled = !current.action;
    ctaLabel.textContent = t(label);
    ctaLabel.hidden = state === 'loading';
    cta.setAttribute('aria-label', t(label));
    cta.toggleAttribute('data-spinner-only', state === 'loading');
    spinner.hidden = !current.busy;
    restore.disabled = Boolean((current.busy && state !== 'loading') || state === 'pending');
    if (current.access) {
      restore.textContent = t('manage');
    } else {
      restore.textContent = t(state === 'restoring' ? 'restoreBusy' : 'restore');
    }
  }

  function setState(next, outcome, delay = 4500) {
    clearTimeout(pendingTransition);
    state = next;
    render();
    const result = outcome ?? states[next].next;
    if (result && delay !== null) pendingTransition = setTimeout(() => setState(result), delay);
  }

  function translateSheet() {
    sheet.querySelector('h3').textContent = t(sheet.dataset.title);
    sheet.querySelector('p').textContent = t(sheet.dataset.copy);
  }

  function showSheet(title, copy, trigger, focus = true) {
    previousFocus = trigger;
    sheet.dataset.title = title;
    sheet.dataset.copy = copy;
    translateSheet();
    sheet.show();
    content.inert = true;
    if (focus) sheetClose.focus({ preventScroll: true });
  }

  function showPolicy(policy, trigger, focus = true) {
    showSheet(policy, 'policyPending', trigger, focus);
  }

  const actions = {
    buy: () => setState('opening', 'purchased', 1400),
    load: () => setState('loading', 'ready', 1000),
    restore: () => setState('restoring', 'restore-empty', 1200),
    verify: () => setState('verifying', 'purchased', 1200),
    continue: () => showSheet('unlocked', 'unlockedCopy', cta),
  };
  cta.addEventListener('click', () => actions[states[state].action]?.());
  restore.addEventListener('click', () => {
    if (states[state].access) {
      showSheet('manage', 'manageCopy', restore);
    } else {
      actions.restore();
    }
  });
  document.querySelector('#size').addEventListener('change', render);
  screen.addEventListener('languagechange', () => {
    render();
    if (sheet.open) translateSheet();
  });
  planButtons.forEach(plan => plan.addEventListener('click', () => {
    planButtons.forEach(button => button.setAttribute('aria-pressed', String(button === plan)));
    render();
  }));
  screen.querySelectorAll('[data-policy]').forEach(button => {
    button.addEventListener('click', () => showPolicy(button.dataset.policy, button));
  });
  sheetClose.addEventListener('click', () => sheet.close());
  sheet.addEventListener('keydown', event => {
    if (event.key === 'Escape') sheet.close();
  });
  sheet.addEventListener('close', () => {
    if (sheet.open) return;
    content.inert = false;
    previousFocus?.focus({ preventScroll: true });
  });
  close.addEventListener('click', () => {
    screen.style.visibility = 'hidden';
    reopen.focus();
  });
  reopen.addEventListener('click', () => {
    if (sheet.open) sheet.close();
    screen.style.visibility = 'visible';
    setState('ready');
    close.focus({ preventScroll: true });
  });
  setState('ready');
})();
