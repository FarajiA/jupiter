Feature('Billing @smoke');

Scenario('loads correctly', async (I, billing) => {
  I.login('/racker/jupiter/billing');
  I.see('Billing Information');

  I.assertDeepEqual(await I.grabTextFrom(billing.selectors.billingLabels), [
    'Street',
    'City',
    'Country',
    'State',
    'Zipcode'
  ]);

  I.assertDeepEqual(await I.grabTextFrom(billing.selectors.footers), [
    'Back',
    'Next'
  ]);
}).tag('@smoke');
