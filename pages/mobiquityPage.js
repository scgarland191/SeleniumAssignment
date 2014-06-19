var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

var MobiquityPage = function(theBrowser) {
    browser = theBrowser;
    log.info("Mobiquity Page initialized");

    // Custom Exported values here
    this.location = "http://mobiquityinc.com/";
    this.mobiquityTitleText = 'Enterprise Mobile Apps, Strategy & Solutions | Mobiquity';
    this.titleSelector = "head title";
    this.aboutSelector = "a[href=\"/about\"]"
    this.howSelector = "a[href=\"/how\"]"
    this.portfolioSelector = "a[title=\"Portfolio\"]"
    this.sloganSelector = "#section_front_tagline h2"
    this.phoneSelector = "#footer_bottom_tel"
    this.aboutText = "About"
    this.howText = "How"
    this.portfolioText = "Portfolio"
    this.sloganText = "We make mobile simple. You make mobile matter."
    this.phoneText = "T: +1 (781) 591 4800"
};

MobiquityPage.prototype.selectAndReturnText = function(selector, done) {
    var self = this;
    log.info("About to get element selector: "+selector);
    
    browser.waitForElementByCssSelector(selector, function(err, el) {
        if(err) {
            log.error("DID NOT SUCCESSFULLY USE THE SELECTOR");
            done(err);
        }
        else {
            log.info("Selector utilized, awaiting text...");
            self.returnText(el, function (err, val){
                if(err) {
                    log.error("DID NOT START OBTAINING TEXT");
                    done(err);
                }
                else {
                    log.info("Text is being obtained...")
                    done(null, val);
                }
            });
        }
    });
}

MobiquityPage.prototype.returnText = function(el, done) {
    el.getAttribute("innerHTML", function(err, val) {
        if(err) {
            log.error("COULD NOT OBTAIN TEXT FROM THE ELEMENT")
            done(err);
        }
        else {
            log.info("Element text obtained")
            done(null, val);
        }
    });
}

MobiquityPage.prototype.selectAndClick = function(selector, done) {
    var self = this;
    log.info("About to get element selector: "+selector);
    
    browser.waitForElementByCssSelector(selector, function(err, el) {
        if(err) {
            log.err("DID NOT SUCCESSFULLY USE THE SELECTOR");
            done(err);
        }
        else {
            log.info("Selector utilized, awaiting click...");
            self.clickElement(el, function (){
                 done();
            });
        }
    });
}

MobiquityPage.prototype.clickElement = function(el, done) {
    el.click(function(err) {
        if(err) {
            log.err("COULD NOT CLICK ELEMENT")
            done(err);
        }
        else {
            log.info("Successfully clicked element");
            done(null);
        }
    });
}


module.exports = MobiquityPage;