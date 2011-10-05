This is a simple function that I've written as a jQuery plugin. It simply takes a url as a string and returns its attributes, much the same way that window.location does but with a bit more detail. 
You could extend the window.location object with this function but I don't like messing with prototyping native javascript methods.


Example Usage as a jquery plugin:

$('a.link').parseURL(window.location.href);

Example output:
{
	categorySlug: "spenoir",
	host: "www.github.com",
	parts: ["spenoir", "parseURL"],
	path: "spenoir/parseURL",
	protocol: "https:",
	url: "https://www.github.com/spenoir/parseURL"
}

Example Usage with no argument:
$('a.link').parseURL();

If you pass no argument then parseURL will try to take the previous elements href attribute.



In the pipeline:
Demos, jasmine tests, example of extending window.location.