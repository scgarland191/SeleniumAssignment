var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');
var asserters = bootstrap.wd.asserters;

var mobiquityPage = require('../pages/mobiquityPage');
var mobiquityAboutPage = require('../pages/mobiquityAboutPage');
var mobiquity;
var mobiquityAbout;
var sessionid;
var sessionurl;

describe('Mobiquity Search - Basic Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        mobiquity = new mobiquityPage(browser);
        mobiquityAbout = new mobiquityAboutPage(browser);

        log.info("About to run browser init with desired options: " + JSON.stringify(bootstrap.desired, null, 4));
        bootstrap.desired.name="Mobiquity Search - Basic Search";

        browser.init({browserName:'chrome'}).then(function(adb) {
                log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;
                bootstrap.writeToFile("Mobiquity Search - " + sessionurl);
            });
            return;
        }).nodeify(done);
    });

    after(function(done) {
        browser.quit().nodeify(done);
    });

    describe('Mobiquity Testing', function() {
        it('should display our page first', function(done) {
            log.info("About to open mobiquity home page...");
            browser.get("http://mobiquityinc.com", function(err) {
                if(err) {
                    log.error("Unable to get mobiquity home page: " + err);
                    done(err);
                }
                else {
                    log.info("CHAD IS FAILING!");
                    try {
                        log.info("This appears to be working...");
                        browser.waitFor(asserters.jsCondition('$("title").html() ? true : false'), bootstrap.MaxWaittime, function(err, status) {
                            if (err) {
                                log.error("COULD NOT LOAD ABOUT PAGE");
                                done(err);
                            }
                            else {
                                log.info("Page loaded successfully")
                                done();
                            }
                        });
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        });
    })
});

