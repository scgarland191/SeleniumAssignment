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

module.exports = MobiquityPage;