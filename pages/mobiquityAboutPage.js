var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

var MobiquityAboutPage = function(theBrowser) {
    browser = theBrowser;
    log.info("Mobiquity About Page initialized");

    // Custom Exported values here
    this.location = "http://mobiquityinc.com/about";
    this.aboutTitleText = 'About | Mobiquity';
    this.leadershipText = "Leadership"
    this.leadershipSelector = "a[href=\"about/leadership\"]"

};

MobiquityAboutPage.prototype.selectAndReturnText = function(selector, done) {
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

MobiquityAboutPage.prototype.returnText = function(el, done) {
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


module.exports = MobiquityAboutPage;