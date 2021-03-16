_postProcessContent
	- does nothing more than fixing relative URLs
	- coverts relative urls to absolute URLs
	- clears classes (if the required flag is set)

_removeNodes

[].forEach.call(arguments, callback, thisObject): The reason for using 
this convention to iterate, instead of directly using forEach is, some 
HTML Nodes (Node list items) do not support the callback natively.
NodeList.prototype.forEach()
