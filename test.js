var pronouncing = require('./pronouncing.js');

console.log(pronouncing.syllableCount(
			["Z", "ER0", "K", "OW1", "N", "IY0", "AH0", "M"]));
console.log(pronouncing.phonesForWord("abdomen"));
console.log(pronouncing.rhymingPart(pronouncing.phonesForWord("abdomen")[0]));
console.log(pronouncing.search("AH1 K T IH0 D"));
console.log(pronouncing.rhymes("sinking"));
