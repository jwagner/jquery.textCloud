/*

jQuery.textCloud
================

Arranges a set of texts in a cloud using randomized
placement. Note that not all texts are added, the
algorithm skips texts when it cant find a place for them.


Repo
----

https://github.com/jwagner/jquery.textCloud/

Usage
-----

<div id="cloud" style="position: absolute;..."></div>

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
*/

jQuery(function($) {

var colors = '#833 #444 #955 #666 #777 #888 #975'.split(' ');

function choice(items) {
    return items[~~(Math.random()*items.length)];
}

function createBox(parent, item, existing) {
    var text = item.text,
        el;
    if(existing[text]){
        el = existing[text];
    }
    else {
        el = existing[text] = $('<span class="textCloud-item"></span>')
        .text(text)
        .css({
            position: 'relative',
            top: ~~(Math.random()*parent.height()),
            left: ~~(Math.random()*parent.width())
        });
        parent.append(el);
    }

    el.css({
        'font-size': item.scale + 'em'
    });

    return {
        el: el,
        width: el.outerWidth(),
        height: el.outerHeight()
    };
}

// check for rect intersection using optimized SAT
function intersect(r1, r2) {
    return !(r2.left > r1.right || r2.right < r1.left ||
             r2.top > r1.bottom || r2.bottom < r1.top);
}

// remove old dom elements
function expunge(existing, items){
    var texts = {};
    for(var i = 0; i < items.length; i++) {
        var item = items[i];
        texts[item.text] = null;
    }
    for(var text in existing){
        if(existing.hasOwnProperty(text)){
            if(!(text in texts)){
                existing[text].remove();
            }
            else {
                texts[text] = existing[text];
            }
        }
    }
    return texts;
}

$.fn.textCloud = function(items, options_) {
    var options = $.extend({
            iterations: 100,
            colors: colors
        }, options_),
        el = $(this[0]),
        width = el.width(),
        height = el.height(),
        existing = el.data('textCloud') || {};

    existing = expunge(existing, items);
    el.data('textCloud', existing);

    var boxes = $.map(items, function(i){return createBox(el, i, existing);}),
        added = [],
        i, j;

    for(i = 0; i < boxes.length; i++) {
        var box = boxes[i],
            iterations = options.iterations;
        do {
            box.left = Math.random()*(width-box.width);
            box.right = box.left + box.width;
            box.top = Math.random()*(height-box.height);
            box.bottom = box.top + box.height;
            for(j = 0; j < added.length; j++) {
                var other = added[j];
                if(intersect(box, other)){
                    break;
                }
            }
        }
        while(j != added.length && iterations--);
        if(iterations > 0){
            box.el.css({
                position: 'absolute',
                left: ~~box.left + 'px',
                top: ~~box.top + 'px',
                display: 'block',
                color: choice(options.colors)
            });
            added.push(box);
        }
        else {
            delete existing[box.el.text()];
            box.el.remove();
        }
    }
}; 


}); 
