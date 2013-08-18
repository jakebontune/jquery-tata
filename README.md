## Tata ##
...try saying "to top" really fast ![](http://erkani.de/images/smiley-tongue-out.gif)

**Tata** is a very simple jQuery plugin that scrolls your container to its top. The interesting part is that you can use it on multiple containers on the same page.

### Implementation ###

Again it's very simple to use:

Include jQuery, `tata.css`, and `tata.min.js` in your page like so:

    <link href="tata.css" rel="stylesheet" />
    <script src="jquery.min.js"></script>
    <script src="tata.min.js></script>

And also include the `up.png` near `tata.css`.

Then activate Tata:

<pre>var container = $('.container');
container.tata();</pre>

To call Tata on multiple containers:

<pre>var containers = $('.section, .anothersection');
containers.tata();</pre>

By default Tata will include a small arrow on the bottom right of the container. Of course, you can edit the css to use your own image.

There are a number of settings that you can alter to fully enjoy your Tata experience. Here are the defaults:

<pre>tataWait : 600, // the position the scroll bar has to be at before Tata shows up
fadeInSpeed: 200 // Tata fade in speed
fadeOutSpeed: 200 // Tata fade out speed
scrollSpeed: 500 // the scroll speed to the top
scrollAnimType: "swing", // the scroll animation type. use the jquery easing plugin for more options i.e. 'easeOutElastic' for a more rubbery effect :)
distRight: 30, // the position of Tata from the right of its container
distBottom: 20 // the postiion of Tata from the bottom of its container</pre>

To change the settings:
<pre>container = $('.container');
container.tata({
	scrollSpeed: 300,
	distRight: 40
});</pre>

There's a more advanced and customizable version Tata being built with bootstrap 3 in mind. So check back for updates.

###License
***
Tata is open source under the MIT license. Enjoy.
***
Copyright &copy; 2013. Joseph Ayo-Vaughan.
