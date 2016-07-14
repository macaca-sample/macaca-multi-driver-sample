'use strict';

var _ = require('macaca-utils');
var webdriverClient = require('webdriver-client');

var AndroidChromeOpts = {
  platformName: 'Android',
  browserName: 'Chrome'
};

var ElectronOpts = {
  platformName: 'desktop',
  browserName: 'electron'
};

var android = webdriverClient(AndroidChromeOpts);
var electron = webdriverClient(ElectronOpts);

describe('macaca mobile sample', function() {

  this.timeout(5 * 60 * 1000);

  var driver1 = electron.initPromiseChain();
  var driver2 = android.initPromiseChain();

  before(function() {
    return driver1
      .initDriver();
  });

  after(function() {
    return Promise.all([
      driver1.quit(),
      driver2.quit()
    ]);
  });

  it('#0 should get url', function() {
    return driver1
      .setWindowSize(800, 600)
      .get('http://www.weibo.com')
      .sleep(5000)
      .elementByCss('input.W_input')
      .sendKeys('达峰的夏天')
      .sleep(3000)
      .elementByCss('[node-type="searchSubmit"]')
      .click()
      .sleep(5000)
      .elementByCss('#pl_weibo_directtop .star_card')
      .text()
      .then(content => {
        var arr = content.split(' ');
        var url = arr[arr.length - 1];
        console.log(`get url: ${url}`);
        return driver2
          .initDriver()
          .get(url)
          .sleep(5000);
      });
  });

});
