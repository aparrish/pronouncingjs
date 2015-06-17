"use strict";
var test = require('tape');
var pronouncing = require('pronouncing');

test('stresses', function(t) {
    var stresses = pronouncing.stresses('P ER0 M IH1 T');
    t.equal('01', stresses);
    stresses = pronouncing.stresses('P ER1 M IH2 T')
    t.equal('12', stresses)
    t.end();
});

test('search stresses', function(t) {
    var words = pronouncing.searchStresses('^000100$');
    t.deepEqual(words,
        ['phytogeography', 'uninterruptible', 'uninterruptible',
            'variability']);
    words = pronouncing.searchStresses('^[12]0[12]0[12]0[12]$');
    t.deepEqual(words, ['dideoxycytidine', 'homosexuality', 'hypersensitivity']);
    t.end();
});
