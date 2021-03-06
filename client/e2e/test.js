import path from 'path';
import config from './config';

module.exports = {
  'Demo test User': function (browser) {
    browser
      .url(config.baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Hellobooks', 1000)
      .useXpath()
      .waitForElementVisible('//*[@id="root"]', 1000)
      .useCss()
      .waitForElementVisible('a[href="/register"]', 1000)
      .assert.containsText('a[href="/register"]', 'JOIN US')
      .click('a[href="/register"]')
      .pause(1000)
      .waitForElementVisible('button[name=action]', 1000)
      .assert.containsText('button[name=action]', 'SIGN UP')
      .click('button[name=action]')
      .pause(1000)
      .setValue('input[name=fullname]', 'Nouwatin Jacob')
      .pause(1000)
      .setValue('input[name=username]', 'sansarisric')
      .pause(1000)
      .setValue('input[name=email]', 'sansa@gmail.com')
      .pause(1000)
      .setValue('input[name=phoneNo]', '08044444444')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .setValue('input[name=password_confirmation]', 'password')
      .click('button[name=action]')
      .pause(1000)
      .waitForElementVisible('.mat-icon', 1000)
      .click('.mat-icon')
      .pause(1000)
      .click('.mat-icon')
      .pause(1000)
      .waitForElementVisible('#logout', 1000)
      .click('#logout')
      .pause(1000)
      .useXpath()
      .waitForElementVisible('//*[@id="index-banner"]/div/div/div/div[2]/a[2]',
        1000)
      .assert.containsText('//*[@id="index-banner"]/div/div/div/div[2]/a[2]',
        'LOGIN')
      .click('//*[@id="index-banner"]/div/div/div/div[2]/a[2]')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button',
        1000)
      .assert.containsText(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button',
        'LOGIN')
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .pause(1000)
      .useCss()
      .setValue('input[name=username]', 'sansarisric')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .pause(1000)
      .click('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i')
      .waitForElementVisible('//*[@id="dropdown1"]/li[7]/a', 1000)
      .click('//*[@id="dropdown1"]/li[7]/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div/div/div/div/form/button',
        1000)
      .click('//*[@id="root"]/div/div[3]/div/div/div/div/div/form/button')
      .pause(1000)
      .useCss()
      .setValue('input[name=oldPassword]', 'password')
      .pause(1000)
      .setValue('input[name=newPassword]', 'passwords')
      .pause(1000)
      .setValue('input[name=newPassword_confirmation]', 'passwords')
      .pause(1000)
      .useXpath()
      .click('//*[@id="root"]/div/div[3]/div/div/div/div/div/form/button')
      .pause(1000)
      .waitForElementVisible('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i',
        1000)
      .click('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i')
      .pause(1000)
      .waitForElementVisible('//*[@id="logout"]', 1000)
      .click('//*[@id="logout"]')
      .pause(1000)
      .click('//*[@id="index-banner"]/div/div/div/div[2]/a[2]')
      .pause(1000)
      .useCss()
      .setValue('input[name=username]', 'sansarisric')
      .pause(1000)
      .setValue('input[name=password]', 'passwords')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div[4]/div[1]/div[2]/div/div[4]/a[2]/i',
        1000)
      .click(
        '//*[@id="root"]/div/div[3]/div/div[4]/div[1]/div[2]/div/div[4]/a[2]/i')
      .pause(1000)
      .waitForElementVisible('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i',
        1000)
      .click('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i')
      .pause(5000)
      .waitForElementVisible('//*[@id="logout"]', 1000)
      .click('//*[@id="logout"]')
      .pause(1000)
      .click('//*[@id="index-banner"]/div/div/div/div[2]/a[2]')
      .useCss()
      .setValue('input[name=username]', 'ebeneza')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a',
        1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[2]/a',
        1000)
      .click(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[2]/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div[3]/table/tbody/tr[2]/td[6]/a',
        1000)
      .click('//*[@id="root"]/div/div[3]/div/div[3]/table/tbody/tr[2]/td[6]/a')
      .pause(1000)
      .waitForElementVisible('/html/body/div[22]/div/div[10]/button[1]', 1000)
      .click('/html/body/div[22]/div/div[10]/button[1]')
      .pause(1000)
      .waitForElementVisible('/html/body/div[22]/div/div[10]/button[1]', 1000)
      .click('/html/body/div[22]/div/div[10]/button[1]')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i', 1000)
      .click('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i')
      .pause(1000)
      .waitForElementVisible('//*[@id="dropdown1"]/li[7]/a', 1000)
      .click('//*[@id="dropdown1"]/li[7]/a')
      .pause(1000)
      .click('//*[@id="index-banner"]/div/div/div/div[2]/a[2]')
      .useCss()
      .setValue('input[name=username]', 'sansarisric')
      .pause(1000)
      .setValue('input[name=password]', 'passwords')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a', 1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[2]/a',
        1000)
      .click(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[2]/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div[3]/div/div/div[4]/button', 1000)
      .click('//*[@id="root"]/div/div[3]/div/div[3]/div/div/div[4]/button')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i', 1000)
      .click('//*[@id="root"]/div/div[1]/div/nav/div/ul[1]/a/i')
      .waitForElementVisible('//*[@id="logout"]', 1000)
      .click('//*[@id="logout"]')
      .pause(1000)
      .click('//*[@id="index-banner"]/div/div/div/div[2]/a[2]')
      .useCss()
      .setValue('input[name=username]', 'ebeneza')
      .pause(1000)
      .setValue('input[name=password]', 'password')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="index-banner"]/div/div/div/form/div[4]/div/div[1]/button')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a', 1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[3]/a',
        1000)
      .click(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/div/ul/li[3]/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div[3]/table/tbody/tr[2]/td[7]/a', 1000)
      .click('//*[@id="root"]/div/div[3]/div/div[3]/table/tbody/tr[2]/td[7]/a')
      .pause(1000)
      .waitForElementVisible('/html/body/div[32]/div/div[10]/button[1]', 1000)
      .click('/html/body/div[32]/div/div[10]/button[1]')
      .pause(1000)
      .waitForElementVisible('/html/body/div[32]/div/div[10]/button[1]', 1000)
      .click('/html/body/div[32]/div/div[10]/button[1]')
      .pause(1000)
      .waitForElementVisible('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[1]/a',
        1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[1]/a')
      .pause(1000)
      .useCss()
      .setValue('input[name=userImage]',
        path.join(__dirname, '../../src/build/imgs/eben2.jpg'))
      .useXpath()
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div/div/div/div/div/form/div[2]/button',
        1000)
      .click(
        '//*[@id="root"]/div/div[3]/div/div/div/div/div/div/form/div[2]/button')
      .pause(5000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[2]/ul/li/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[3]/ul/li/a', 1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[3]/ul/li/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[3]/ul/li/div/ul/li[2]/a',
        1000)
      .click(
        '//*[@id="root"]/div/div[2]/div/div[3]/ul/li[3]/ul/li/div/ul/li[2]/a')
      .pause(1000)
      .waitForElementVisible(
        '//*[@id="root"]/div/div[3]/div/div/div/div/form/div[2]/div/button',
        1000)
      .click(
        '//*[@id="root"]/div/div[3]/div/div/div/div/form/div[2]/div/button')
      .pause(5000)
      .useCss()
      .setValue('input[name=categoryName]', 'Arts')
      .pause(1000)
      .useXpath()
      .click(
        '//*[@id="root"]/div/div[3]/div/div/div/div/form/div[2]/div/button')
      .pause(1000)
      .waitForElementVisible('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[5]/a',
        1000)
      .click('//*[@id="root"]/div/div[2]/div/div[3]/ul/li[5]/a')
      .pause(1000)
      .end();
  }
};
