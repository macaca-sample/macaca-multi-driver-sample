'use strict';

var _ = require('macaca-utils');

var AndroidChromeOpts = {
  platformName: 'Android',
  browserName: 'Chrome'
};

var ElectronOpts = {
  platformName: 'desktop',
  browserName: 'electron'
};

var android_chrome_wd = require('webdriver-client')(AndroidChromeOpts);
var desktop_electron_wd = require('webdriver-client')(ElectronOpts);

describe('macaca mobile sample', function() {

  this.timeout(5 * 60 * 1000);

  var driver1 = android_chrome_wd.initPromiseChain();
  var driver2 = desktop_electron_wd.initPromiseChain();

  before(function() {
    return driver2
      .initDriver();
  });

  after(function() {
    return driver2
      .sleep(1000)
      .quit();
  });

  it('#0 should get url', function() {
    return driver2
      .setWindowSize(800, 600)
      .get('https://www.weibo.com')
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
        
      })
      .sleep(5000);
  });

});
