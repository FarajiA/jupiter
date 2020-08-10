Feature('Verify codecept');

Scenario('Verify codecept is loading circle ci', async (I) => {
  I.amOnPage('https://www.google.com/'); // opens google
  I.seeElement('#hplogo');
}).tag('@smoke');
