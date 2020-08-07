Feature('SignUp @smoke');

Scenario('loads correctly', async (I, customerInfo) => {
  I.login();
  I.see('Rackspace Internal Cart');
  I.see('Customer Information');

  I.assertDeepEqual(await customerInfo.customerInfoLabel(), [
    'Select Customer Type',
    'Select Product',
    'Select Channel'
  ]);
});
