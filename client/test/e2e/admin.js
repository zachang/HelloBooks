import config from './config';

module.exports = {
  'Demo test User': function (browser) {
    browser
      .url(config.baseUrl)
      .waitForElementVisible('body', 5000)
      .assert.title('Hellobooks')
      .waitForElementVisible('div[id=root]', 1000)
      .waitForElementVisible('a[href="/register"]', 1000)
      .assert.containsText('a[href="/register"]', 'JOIN US')
      .click('a[href="/register"]')
      .pause(1000)
  }
};