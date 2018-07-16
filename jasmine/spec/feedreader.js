/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test is looping through each feed and making sure it has a valid URL and value

        it('has a URL for every Feed', function(){
            allFeeds.forEach(function (e){
                expect(e.url).toBeDefined();
                expect(e.url.length).toBeGreaterThan(0);
            })
        });

        // This test loops through each feed and makes sure it has a valid NAME and value

        it('has a Name for every Feed', function(){
            allFeeds.forEach(function (e){
                expect(e.name).toBeDefined();
                expect(e.name.length).toBeGreaterThan(0);
            })
        });
    });


    // This test suite tests the menu icon
    describe('The Menu',function(){
        var thisBody= document.querySelector('body');
        
        
        // This test checks for the precense of the menu element and that it is hidden
        
        it('should be hidden by default', function(){

            expect(thisBody).toHaveClass('menu-hidden');
        });

        // This test checks that the functionality of the menu allows it to work properly.
    
        it('should toggle visibility when clicked on', function(){
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(thisBody).not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect(thisBody).toHaveClass('menu-hidden');
            });
        


    });

    // This suite tests the initial feed entries

    describe('Initial Entries', function(){

        // beforeEach running loadFeed
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        
        // verifies that there's an entry after loadFeed is run.
       it('should populate an element entry',function(){
            var myFeed = document.querySelector('.feed .entry');
            expect(myFeed).toBeTruthy();
        });
    });
       
    // This suite tests the selection of a new feed.
    describe('New Feed Selection', function(){
        var firstFeed;
        var secondFeed;

        // before Each running loadFeed twice, each time grabbing the href attribute from the first item in the feed.
         beforeEach(function(done){
            loadFeed(0,function(){
                firstFeed = document.querySelector('.feed').getAttribute('href');
                loadFeed(1,function(){
                    secondFeed = document.querySelector('.feed').getAttribute('href');
                    done() 
                });
            });
         });

        // tests whether firstFeed and secondFeed have different content.
        it('should populate feeds one after another',function(){
            expect(firstFeed === secondFeed).toBeFalsy();
        });
    })
}());
