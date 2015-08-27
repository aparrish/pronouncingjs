pronouncing-js
--------------

A simple interface to the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict). By [Allison Parrish](http://www.decontextualize.com/).

This module is a work in progress (obviously).

Installation
------------

	$ npm install aparrish/pronouncingjs

Or if you're using the browserified version, download `pronouncing-browser.js`
from the `build` directory and include it using a `<script>` tag:

	<script src="pronouncing-browser.js"></script>

Usage
-----

This library has feature parity with
the [Pronouncing](https://pypi.python.org/pypi/pronouncing) Python module.
All of the examples in [the Tutorial and
Cookbook](https://pronouncing.readthedocs.org/en/latest/tutorial.html) for
the Python module also work in Javascript, though the functions in
`pronouncing.js` use camelCase instead of underscores (e.g., Python's
`search_stresses` becomes `searchStresses` in Javascript).

Use the module in Node like so:

	> var pronouncing = require('pronouncing');
	undefined
	> pronouncing.phonesForWord("adverse")
	[ 'AE0 D V ER1 S', 'AE1 D V ER2 S', 'AE2 D V ER1 S' ]
	> pronouncing.syllableCount(pronouncing.phonesForWord("adverse")[0])
	2
	> pronouncing.rhymes("sinking")
	[ 'blinking',
		'drinking',
		'linking',
		'plinking',
		'rethinking',
		'shrinking',
		'stinking',
		'thinking',
		'unthinking',
		'winking' ]
	> pronouncing.search("^S K R AE1")
	[ 'scrabble',
		'scragg',
		'scraggle',
		'scraggly',
		... output omitted for brevity ...
		'scraps',
		'scratching',
		'scratchy',
		'skramstad' ]
    > pronouncing.stresses(pronouncing.phonesForWord("snappiest")[0])
    '102'
    > pronouncing.searchStresses("^00[12]00[12]$")
    [ 'neopositivist', 'undercapitalize', 'undercapitalized' ]

A browserified version of the library is in `build`. Check `demo/index.html`
for an example of how it works!

License
-------

Code in this module is distributed under an MIT license. The CMU pronouncing
dictionary itself is included with this module, but has its own license; check
the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict)
page for more information.

Acknowledgements
----------------

This package was originally developed as part of my Spring 2015 research
fellowship at [ITP](http://itp.nyu.edu/itp/). Thank you to the program and
its students for their interest and support!
