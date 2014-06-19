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

    it('has an initial empty test for kicks', function(done) {
        done();
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
                    log.info("Got Mobiquityinc.com home page!");
                    done();
                }
            });
        });
        it('should verify the text for \'About\'', function(done) {
            mobiquity.selectAndReturnText(mobiquity.aboutSelector, function(err, aboutText){
                if (err){
                    log.error("COULD NOT OBTAIN THE TEXT WITHIN \'ABOUT\'");
                    done(err);
                }
                else {
                    log.info("Aquired text: "+aboutText);
                    try {
                        assert.equal(aboutText, mobiquity.aboutText);
                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        })
        it('should verify the text for \'How\'', function(done) {
            mobiquity.selectAndReturnText(mobiquity.howSelector, function(err, howText){
                if (err){
                    log.error("COULD NOT OBTAIN THE TEXT WITHIN \'HOW\'");
                    done(err);
                }
                else {
                    log.info("Aquired text: "+howText);
                    try {
                        assert.equal(howText, mobiquity.howText);
                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        })
        it('should verify the text for \'Portfolio\'', function(done) {
            mobiquity.selectAndReturnText(mobiquity.portfolioSelector, function(err, portfolioText){
                if (err){
                    log.error("COULD NOT OBTAIN THE TEXT WITHIN \'PORTFOLIO\'");
                    done(err);
                }
                else {
                    log.info("Aquired text: "+portfolioText);
                    try {
                        assert.equal(portfolioText, mobiquity.portfolioText);
                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        })
        it('should verify the text for \'Slogan\'', function(done) {
            mobiquity.selectAndReturnText(mobiquity.sloganSelector, function(err, sloganText){
                if (err){
                    log.error("COULD NOT OBTAIN THE TEXT WITHIN \'SLOGAN\'");
                    done(err);
                }
                else {
                    log.info("Aquired text: "+sloganText);
                    try {
                        assert.equal(sloganText, mobiquity.sloganText);
                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        })
        it('should verify the text for \'phone\'', function(done) {
            mobiquity.selectAndReturnText(mobiquity.phoneSelector, function(err, phoneText){
                if (err){
                    log.error("COULD NOT OBTAIN THE TEXT WITHIN \'PHONE\'");
                    done(err);
                }
                else {
                    log.info("Aquired text: "+phoneText);
                    try {
                        assert.equal(phoneText, mobiquity.phoneText);
                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        })
        it('should click on the \'About\' link and return home', function(done) {
            log.info("About to run the link clicking functions...")
            mobiquity.selectAndClick(mobiquity.aboutSelector, function(err) {
                if(err) {
                    log.error("Unable to click \'About\' anchor: " + err);
                    done(err)
                }
                else {
                    log.info("Click successful!");
                    try {
                        browser.waitFor(asserters.jsCondition('$("title") ? true : false'), bootstrap.MaxWaittime, function(err, status) {
                            if (err) {
                                log.error("COULD NOT LOAD ABOUT PAGE");
                                done(err);
                            }
                            else {
                                log.info("Page loaded successfully")
                                done();
                                // mobiquityAbout.selectAndReturnText(mobiquityAbout.leadershipSelector, function(err, leadershipText){
                                //     if (err){
                                //         log.error("COULD NOT OBTAIN THE TEXT WITHIN \'LEADERSHIP\'");
                                //         done(err);
                                //     }
                                //     else {
                                //         log.info("Aquired text: "+leadershipText);
                                //         try {
                                //             assert.equal(leadershipText, mobiquityAbout.leadershipText);
                                //             browser.title(function(err, titleText){
                                //                 if(err) {
                                //                     log.error("UNABLE TO GET THE TITLE: " + err);
                                //                     done(err);
                                //                 }
                                //                 else {
                                //                     log.info("Title obtained: "+titleText);
                                //                     try {
                                //                         assert.equal(titleText, mobiquityAbout.aboutTitleText);
                                //                         log.info("Title Matches!!!")
                                //                         done();
                                //                     }
                                //                     catch(err) {
                                //                         done(err);
                                //                     }
                                //                 }
                                //             });
                                //         }
                                //         catch(err) {
                                //             log.error("Syntax error in waitFor(): "+err)
                                //             done();
                                //         }
                                //     }
                                // });
                            }
                        });
                    }
                    catch(err) {
                        done(err);
                    }
                }
            });
        });
        // xit('should have a title that matches'+mobiquityAbout.aboutTitleText, function(done) {
        //     browser.title(function(err, titleText){
        //         if(err) {
        //             log.error("Unable to get the title: " + err);
        //             done(err);
        //         }
        //         else {
        //             log.info("Title obtained: "+titleText);
        //             assert.equal(titleText, mobiquityAbout.aboutTitleText);
        //             done();
        //         }
        //     });
        // });
    })

});

