/*
 * Tata v1.0.0
 * Add a scroll-to-top button on any number of containers
 * by Joseph Ayo-Vaughan
 * http://joievonne.com
 * MIT License
 */

/*global jQuery:false */
(function ($) {
    "use strict";
	$.fn.tata = function(options) {

        var body = $("body");
        var html = $("html");
        var both = $('body, html');

        // DEFAULT SETTINGS
        var settings = $.extend({
            tataWait : 600, // the position the scroll bar has to be at before Tata shows up
            fadeInSpeed : 200, // Tata fade in speed
            fadeOutSpeed: 200, // Tata fade out speed
            scrollSpeed : 500, // the scroll speed to the top
            scrollAnimType : "swing", // the scroll animation type. use the jquery easing plugin for more options i.e. 'easeOutElastic' for a more rubbery effect :)
            distRight : 30, // the position of Tata from the right of its container
            distBottom : 20 // the postiion of Tata from the bottom of its container
        }, options);

        // CHECKS IF THE SELECTOR IS THE BODY OR HTML
        function isbodyOrHtml(param) {
//            return (param === body[0]) || (param === html[0]);
	        return ($(param).outerHeight() === body.height()) || ($(param).outerHeight() === body.outerHeight()) || (param === body[0]) || (param === html[0]);
        }

        // GETS CORRECT OBJECT TO CALCULATE the 'scrollTop' ACCORDING TO THE BROWSER
        function getScrollTop(param){
            if(isbodyOrHtml(param)){ // is the selector the body or html?
                if(typeof window.pageYOffset !== 'undefined'){
                    //most browsers except IE before #9
                    return window.pageYOffset;
                }
                else{
                    var B = document.body; //IE 'quirks'
                    var D = document.documentElement; //IE with doctype
                    D = (D.clientHeight)? D: B;
                    return D.scrollTop;
                }
            }else {
                return param.scrollTop;
            }

        }

        // CHECK WHAT WAS SCROLLED
        function objectToScroll(param) {

            if(isbodyOrHtml(param)) {
                // if the selector is the body or html element,
                // check if the 'window' was scrolled
                return window;
            }else {
                // if not, check if the selector was scrolled
                return param;
            }
        }

        // WHAT OBJECT TO SCROLL
        function performScrollTarget(param) {

            if (isbodyOrHtml(param)) {
                return both;
            }else {
                return $(param);
            }
        }

		if(this.length) { // check if selector(s) exist(s) on page
            return this.each(function() {
                var container = this; // the object to scroll
	            var randNumContainer = Math.random().toString().replace(/\./, ""); // generate a random class for the container
	            var containerStringDot = ".tata-container-" + randNumContainer; // container string to use as jquery selector
	            var containerString = "tata-container-" + randNumContainer; // container class without '.' to use for other general purposes
	            var containerClass;

                var randNumTataDiv = Math.random().toString().replace(/\./, ""); // generate a random class for the Tata button
                var mainTataStringDot = ".tata-" + randNumTataDiv; // Tata button jquery safe class string
                var mainTataString = "tata-" + randNumTataDiv; // Tata button class string without '.' for other general purposes
                var tataDiv = "<div class='tata " + mainTataString +"'></div>"; // Tata div with random generated class
	            var mainTataClass;

                (function() {
                    // basically this will support the use of 'html' as a selector
                    if(container === html[0]) { // if container is the html element,
	                    body.addClass(containerString); // add the random class to the body
	                    containerClass = $(containerStringDot); // create a handler for the new class
                        $(tataDiv).appendTo(body); // add the element with our new class as the last BODY child
                    }else {
	                    $(container).addClass(containerString);
	                    containerClass = $(containerStringDot);
                        $(tataDiv).appendTo(containerClass);
                    }
	                mainTataClass = $(mainTataStringDot); // handler for the Tata button

	                // set the element with our new class as the container.
	                // using this version of the container will force numerous Tata buttons
	                // into only affecting it's container with a certain class
                    container = $(containerStringDot)[0];

                    if(!isbodyOrHtml(container)) { // if the selector is NOT the body or html,
                        // set the position of the Tata button to the bottom right of the container
                        mainTataClass.css('left', containerClass.offset().left + containerClass.outerWidth() - mainTataClass.width() - settings.distRight);
                        mainTataClass.css('top', containerClass.offset().top + containerClass.outerHeight() - mainTataClass.height() - settings.distBottom);
                    }else {
                        // set the Tata button to the bottom right of the page
                        mainTataClass.css('right', settings.distRight); // NOTICE we don't set the distance from the left for the sake of responsiveness
                        mainTataClass.css('bottom', settings.distBottom); // NOTICE we don't set the distance from the top for the sake of responsiveness
                    }

                    // if the distance of the Tata button from the top is 'NaN', keep it that way.
                    // otherwise, set 'mainTataTop' to that distance
                    // you can get NaN as a result if the container is the body or html,
                    // as the function above doesn't set the Tata button's distance from the top if it's container is the body or html
                    var mainTataTop = isNaN(parseInt(mainTataClass.css("top"), 10)) !== true ? parseInt(mainTataClass.css("top"), 10) : NaN;

                    if(getScrollTop(container) >= settings.tataWait) { // if the scrolled distance from the top is at the point we want Tata to show,
                        mainTataClass.fadeIn(settings.fadeInSpeed); // fade it in with specified speed
                    }
                    containerClass.hover(function mouseIn() { // when we hover over the container,
                            mainTataClass.css("top", mainTataTop - html.scrollTop() - body.scrollTop()); // make sure the Tata button is in place

                            // check again if the scrolled distance from the top
                            // is at the point we want Tata to show
                            if(getScrollTop(container) >= settings.tataWait) {
                                mainTataClass.fadeIn(settings.fadeInSpeed);
                            }
                            $(objectToScroll(container)).on('scroll', function() { // when we scroll the container
                                mainTataClass.css("top", mainTataTop - html.scrollTop() - body.scrollTop()); // make sure the Tata button is in place

                                // check again if the scrolled distance from the top
                                // is at the point we want Tata to show
                                if(getScrollTop(container) >= settings.tataWait) {
                                    mainTataClass.fadeIn(settings.fadeInSpeed);
                                }else {
                                    mainTataClass.fadeOut(settings.fadeOutSpeed);
                                }
                            });
                        },
                        function mouseOut() {
                            mainTataClass.fadeOut(settings.fadeOutSpeed);
                        });

	                mainTataClass.on('click', function() { // when we click the Tata button,
	                    performScrollTarget(container).stop().animate({
	                        'scrollTop' : 0 // scroll to the top of the container,
	                    },settings.scrollSpeed, settings.scrollAnimType); // with the specified speed and animation type
	                });
                })();

            });

		}else{ // if selector(s) cease(s) to exist,
            return this; // just return it :P
        }
	};
}(jQuery));

/*Tata!*/