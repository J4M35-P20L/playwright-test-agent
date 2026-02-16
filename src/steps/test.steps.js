const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is logged into the Edge portal', async function () {
  console.log('LoginStep executed');
});

When('the user clicks {string}', async function (buttonText) {
  console.log('Click step executed for:', buttonText);
});