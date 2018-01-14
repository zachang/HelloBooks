import config from './config';

export default {
  before: (browser) => {
    browser
      .url(config.baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Hellobooks')
      .waitForElementVisible('div[id=root]', 1000);
  },
  after: browser => browser.end()
};

// module.exports = {
//   'Demo test User': function (browser) {
//     browser
//       .url('http://localhost:8080')
//       .waitForElementVisible('body', 1000)
//       .assert.title('Hellobooks')
//       .waitForElementVisible('div[id=root]', 1000)
//       .waitForElementVisible('div[id=root]', 1000)
//   }
// };