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


function initElectron() {
  var electron_wd = webdriverClient(ElectronOpts);
  return electron_wd.initPromiseChain();
}

function initAndroidChrome() {
  var android_chrome_wd = webdriverClient(AndroidChromeOpts);
  return android_chrome_wd.initPromiseChain();
}

describe('macaca mobile sample', function() {

  this.timeout(5 * 60 * 1000);

  var driver2 = initElectron();

  before(function() {
    return driver2
      .initDriver();
  });

  after(function() {
    return driver2
      //.quit();
  });

  it('#0 should get url', function() {
    return driver2
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

        const driver1 = initAndroidChrome();
        return driver1
          .initDriver()
          .get(url)
          .sleep(5000);
      });
  });

});
