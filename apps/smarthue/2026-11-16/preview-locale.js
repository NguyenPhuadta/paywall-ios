const smartHueLocale = (() => {
  const strings = {
    en: {
      headline: 'Light up before', headlineAccent: 'time’s up.',
      countdown: 'Christmas offer ends in', expired: 'Christmas offer ended',
      days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
      yearly: 'Yearly', weekly: 'Weekly', savings: 'Save 92%',
      yearlyDetail: '$0.77/week · billed $39.99/year', weeklyDetail: '$9.99/week',
      startTrial: 'Start Free Trial', trialDuration: '3-day free trial',
      trialRenewal: 'Then $39.99/year. Auto-renews unless canceled.',
      dialogBilling: 'Billed $39.99/year', dialogTrialBilling: '3 days free, then $39.99/year',
      dialogRenewal: 'Subscription auto-renews. Cancel anytime.',
      yearlyTerms: '$39.99 per year. Auto-renews unless canceled.',
      weeklyTerms: '$9.99 per week. Auto-renews unless canceled.',
      planOne: 'Plan 1', planTwo: 'Plan 2', periodPending: 'Period pending',
      pricingPending: 'Price and renewal terms to be confirmed.',
      close: 'Close paywall', closeSheet: 'Close sheet',
      paywall: 'SmartHue Christmas paywall', purchase: 'Subscription options',
      roomA: 'A Christmas tree beside a color-changing smart floor lamp',
      roomB: 'A Christmas tree and a tall color-changing floor lamp beside the gifts',
      privacy: 'Privacy Policy', terms: 'Terms of Use',
      policyPending: 'The official SmartHue policy is pending for this preview.',
      restore: 'Restore Purchases', restoreBusy: 'Restoring…',
      manage: 'Manage Subscription', manageCopy: 'In the app, this opens your App Store subscription settings.',
      unlocked: 'SmartHue unlocked', unlockedCopy: 'The preview now has access to SmartHue.',
      continue: 'Continue', loadBusy: 'Loading plans…', retry: 'Retry',
      loadError: 'Plans couldn’t load. Try again.',
      checkingOffer: 'Checking offer…', opening: 'Opening App Store…',
      pending: 'Purchase pending', pendingCopy: 'Your purchase is still processing. You can close this screen.',
      checkStatus: 'Check status', unverified: 'We couldn’t verify your purchase yet.',
      checkingStatus: 'Checking status…', tryAgain: 'Try again',
      purchaseError: 'Your purchase couldn’t be completed.',
      purchased: 'Your subscription is active.',
      restoring: 'Restoring purchases…', restored: 'Your subscription was restored.',
      restoreEmpty: 'No active subscription was found for this Apple Account.',
      retryRestore: 'Retry Restore', restoreError: 'We couldn’t restore your purchases. Try again.',
      entitled: 'You already have an active SmartHue subscription.',
    },
    de: {
      headline: 'Jetzt strahlen.', headlineAccent: 'Zeit wird knapp!',
      countdown: 'Weihnachtsangebot endet in', expired: 'Weihnachtsangebot beendet',
      days: 'Tage', hours: 'Stunden', minutes: 'Minuten', seconds: 'Sekunden',
      yearly: 'Jährlich', weekly: 'Wöchentlich', savings: '92 % sparen',
      yearlyDetail: '0,77 €/Woche · 39,99 €/Jahr', weeklyDetail: '9,99 €/Woche',
      startTrial: 'Kostenlos testen', trialDuration: '3 Tage kostenlos',
      trialRenewal: 'Danach 39,99 €/Jahr. Automatische Verlängerung, jederzeit kündbar.',
      dialogBilling: '39,99 € pro Jahr', dialogTrialBilling: '3 Tage gratis, dann 39,99 €/Jahr',
      dialogRenewal: 'Automatische Verlängerung. Jederzeit kündbar.',
      yearlyTerms: '39,99 € pro Jahr. Automatische Verlängerung. Jederzeit kündbar.',
      weeklyTerms: '9,99 € pro Woche. Automatische Verlängerung. Jederzeit kündbar.',
      planOne: 'Abo 1', planTwo: 'Abo 2', periodPending: 'Laufzeit offen',
      pricingPending: 'Preis und Verlängerung stehen noch nicht fest.',
      close: 'Paywall schließen', closeSheet: 'Fenster schließen',
      paywall: 'SmartHue-Weihnachtsangebot', purchase: 'Abo-Optionen',
      roomA: 'Ein Weihnachtsbaum neben einer smarten Stehleuchte mit Farbwechsel',
      roomB: 'Ein Weihnachtsbaum mit Geschenken und einer Stehleuchte mit Farbwechsel',
      privacy: 'Datenschutz', terms: 'AGBs',
      policyPending: 'Die offiziellen SmartHue-Richtlinien stehen für diese Vorschau noch aus.',
      restore: 'Wiederherstellen', restoreBusy: 'Wird wiederhergestellt…',
      manage: 'Abo verwalten', manageCopy: 'In der App öffnen sich hier deine Abonnement-Einstellungen im App Store.',
      unlocked: 'SmartHue freigeschaltet', unlockedCopy: 'In dieser Vorschau hast du jetzt Zugriff auf SmartHue.',
      continue: 'Weiter', loadBusy: 'Abos werden geladen…', retry: 'Erneut versuchen',
      loadError: 'Die Abos konnten nicht geladen werden. Versuche es erneut.',
      checkingOffer: 'Angebot wird geprüft…', opening: 'App Store wird geöffnet…',
      pending: 'Kauf ausstehend', pendingCopy: 'Dein Kauf wird noch bearbeitet. Du kannst dieses Fenster schließen.',
      checkStatus: 'Status prüfen', unverified: 'Dein Kauf konnte noch nicht bestätigt werden.',
      checkingStatus: 'Status wird geprüft…', tryAgain: 'Erneut versuchen',
      purchaseError: 'Dein Kauf konnte nicht abgeschlossen werden.',
      purchased: 'Dein Abo ist aktiv.',
      restoring: 'Käufe werden wiederhergestellt…', restored: 'Dein Abo wurde wiederhergestellt.',
      restoreEmpty: 'Für diesen Apple Account wurde kein aktives Abo gefunden.',
      retryRestore: 'Erneut wiederherstellen', restoreError: 'Deine Käufe konnten nicht wiederhergestellt werden. Versuche es erneut.',
      entitled: 'Du hast bereits ein aktives SmartHue-Abo.',
    },
    da: {
      headline: 'Lys op nu.', headlineAccent: 'Tiden er knap!',
      countdown: 'Juletilbuddet slutter om', expired: 'Juletilbuddet er slut',
      days: 'Dage', hours: 'Timer', minutes: 'Minutter', seconds: 'Sekunder',
      yearly: 'Årligt', weekly: 'Ugentligt', savings: 'Spar 92 %',
      yearlyDetail: '5,77 kr./uge · 299,99 kr./år', weeklyDetail: '74,99 kr./uge',
      startTrial: 'Start gratis prøveperiode', trialDuration: '3 dages gratis prøve',
      trialRenewal: 'Derefter 299,99 kr./år. Fornyes automatisk og kan opsiges når som helst.',
      dialogBilling: '299,99 kr. om året', dialogTrialBilling: '3 dage gratis, derefter 299,99 kr./år',
      dialogRenewal: 'Fornyes automatisk. Kan altid opsiges.',
      yearlyTerms: '299,99 kr. om året. Fornyes automatisk. Kan altid opsiges.',
      weeklyTerms: '74,99 kr. om ugen. Fornyes automatisk. Kan altid opsiges.',
      planOne: 'Abonnement 1', planTwo: 'Abonnement 2', periodPending: 'Periode afventer',
      pricingPending: 'Pris og vilkår for fornyelse afventer bekræftelse.',
      close: 'Luk tilbuddet', closeSheet: 'Luk vinduet',
      paywall: 'Juletilbud fra SmartHue', purchase: 'Abonnementer',
      roomA: 'Et juletræ ved siden af en smart gulvlampe, der skifter farve',
      roomB: 'Et juletræ med gaver ved siden af en gulvlampe, der skifter farve',
      privacy: 'Privatlivspolitik', terms: 'Vilkår for brug',
      policyPending: 'SmartHues officielle vilkår afventer i denne forhåndsvisning.',
      restore: 'Gendan køb', restoreBusy: 'Gendanner…',
      manage: 'Administrer abonnement', manageCopy: 'I appen åbner dette dine abonnementsindstillinger i App Store.',
      unlocked: 'SmartHue er låst op', unlockedCopy: 'Du har nu adgang til SmartHue i forhåndsvisningen.',
      continue: 'Fortsæt', loadBusy: 'Indlæser abonnementer…', retry: 'Prøv igen',
      loadError: 'Abonnementerne kunne ikke indlæses. Prøv igen.',
      checkingOffer: 'Tjekker tilbud…', opening: 'Åbner App Store…',
      pending: 'Køb afventer', pendingCopy: 'Dit køb behandles stadig. Du kan lukke denne skærm.',
      checkStatus: 'Tjek status', unverified: 'Dit køb kunne endnu ikke bekræftes.',
      checkingStatus: 'Tjekker status…', tryAgain: 'Prøv igen',
      purchaseError: 'Dit køb kunne ikke gennemføres.',
      purchased: 'Dit abonnement er aktivt.',
      restoring: 'Gendanner køb…', restored: 'Dit abonnement er gendannet.',
      restoreEmpty: 'Der blev ikke fundet et aktivt abonnement for denne Apple-konto.',
      retryRestore: 'Prøv at gendanne igen', restoreError: 'Dine køb kunne ikke gendannes. Prøv igen.',
      entitled: 'Du har allerede et aktivt SmartHue-abonnement.',
    },
  };
  const screen = document.querySelector('.phone');
  const picker = document.querySelector('#preview-language');
  const units = ['day', 'hour', 'minute', 'second'];
  let language;
  let unitFormatters;
  let listFormatter;
  const t = key => strings[language][key];
  const countdown = values => `${t('countdown')} ${listFormatter.format(values.map((value, index) => unitFormatters[index].format(value)))}`;

  function applyLanguage(value) {
    language = Object.hasOwn(strings, value) ? value : 'en';
    screen.lang = language;
    picker.value = language;
    unitFormatters = units.map(unit => new Intl.NumberFormat(language, { style: 'unit', unit, unitDisplay: 'long' }));
    listFormatter = new Intl.ListFormat(language, { style: 'long', type: 'conjunction' });
    screen.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    screen.querySelectorAll('[data-i18n-aria]').forEach(element => {
      element.setAttribute('aria-label', t(element.dataset.i18nAria));
    });
    screen.querySelectorAll('[data-i18n-alt]').forEach(element => {
      element.alt = t(element.dataset.i18nAlt);
    });
    screen.dispatchEvent(new Event('languagechange'));
  }

  picker.addEventListener('change', () => {
    applyLanguage(picker.value);
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', language);
    history.replaceState(history.state, '', url);
  });
  return { t, countdown, strings, initialize: () => applyLanguage(new URL(location.href).searchParams.get('lang')) };
})();
smartHueLocale.initialize();

if (new URLSearchParams(location.search).get('inspect') === '1') {
  window.smartHuePreviewStrings = smartHueLocale.strings;
}
