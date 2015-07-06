'use strict';
var _ = require('underscore');
var fs = require('fs');

function parseCMU(str) {
  var pronunciations = [];
  _.each(str.split("\n"), function(line) {
    if (/^;/.test(line)) { return; }
    if (line.length == 0) { return; }
    var parts = line.split("  ");
    var word = parts[0];
    var phones = parts[1];
    word = word.replace(/\(\d\)$/, '').toLowerCase();
    pronunciations.push([word, phones]);
  });
  return pronunciations;
}

var pronunciations = parseCMU(
    fs.readFileSync(__dirname + "/cmudict-0.7b", {encoding: 'utf8'}));

function syllableCount(phones) {
  return _.reduce(
      _.map(phones, function(i) { return (i.match(/[012]/g)||[]).length; }),
      function (a, b) { return a+b; })
}

function phonesForWord(find) {
  var matches = [];
  _.each(pronunciations, function(item) {
    var word = item[0];
    var phones = item[1];
    if (word == find) {
      matches.push(phones);
    }
  });
  return matches;
}

function rhymingPart(phones) {
  var idx = 0;
  var phonesList = phones.split(" ");
  for (var i = phonesList.length-1; i >= 0; i--) {
    if (phonesList[i].slice(-1).match(/[12]$/)) {
      idx = i;
      break;
    }
  }
  return phonesList.slice(idx).join(' ');
}

/**
 * If you give this function a string, it turns it into a RegExp object with
 * added word boundary anchors at beginning and end. You can also pass a
 * RegExp object, but in that case you need to add the word boundary anchors
 * yourself!
 */
function search(pattern) {
  var matches = [];
  if (pattern instanceof RegExp) {
      re = pattern;
  }
  else {
    var re = new RegExp("\\b" + pattern + "\\b");
  }
  _.each(pronunciations, function(item) {
    var word = item[0];
    var phones = item[1];
    if (phones.match(re)) {
      matches.push(word);
    }
  });
  return matches;
}

function searchStresses(pattern) {
    var matches = [];
    var re = new RegExp("\\b" + pattern + "\\b");
    _.each(pronunciations, function(item) {
        var word = item[0];
        var phones = item[1];
        if (stresses(phones).match(re)) {
            matches.push(word);
        }
    });
    return matches;
}

function rhymes(word) {
  var allRhymes = [];
  var allPhones = phonesForWord(word);
  _.each(allPhones, function(phonesStr) {
    var part = rhymingPart(phonesStr);
    var rhymes = search(part + "$");
    allRhymes.push.apply(allRhymes, rhymes);
  });
  return _.filter(allRhymes, function(r) { return r != word; });
}

function stresses(s) {
  return s.replace(/[^012]/g, "");
}


module.exports = {
  parseCMU: parseCMU,
  syllableCount: syllableCount,
  phonesForWord: phonesForWord,
  rhymingPart: rhymingPart,
  search: search,
  rhymes: rhymes,
  stresses: stresses,
  searchStresses: searchStresses
};
