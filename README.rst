jQuery.textCloud
================

Arranges a set of texts in a cloud using randomized
placement. Note that not all texts are added, the
algorithm skips texts when it cant find a place for them.


Repo
----

https://github.com/jwagner/jquery.textCloud/blob/master/jquery.textCloud.js


Usage
-----

var terms = [
        {text: 'Hello', scale: 1.0},
        {text: 'World', scale: 1.2}
    ],
    options = {
        colors: '#833 #444 #955 #666 #777 #888 #975'.split(' '),
        iterations: 100
    };

$('#cloud').textCloud(terms, options);


CSS
---

While not strictly required it makes sense to style the items to
get some nice CSS3 transitions.

.textCloud-item {
  max-width: 10em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  padding: 0.2em;

  transition: left 1s ease-in-out;
  -moz-transition: left 1s ease-in-out;
  -webkit-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
}


Algorithm
---------

for term in terms:
    do
        pick random position
    while collision with already added term

    add term


License
-------

Copyright (C) 2011 by Jonas Wagner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
