// A precedence rule is given as "P>E", which means that letter "P" is followed directly by the letter "E". 
// Write a function, given an array of precedence rules, that finds the word represented by the given rules.

// Note: Each represented word contains a set of unique characters, i.e. the word does not contain duplicate letters.

// Examples:
// findWord(["P>E","E>R","R>U"]) // PERU
// findWord(["I>N","A>I","P>A","S>P"]) // SPAIN

function findWord(rules) {
    let graph = new Map();
    let reverse_graph = new Map();
    let i;
    let pt;
    for(i = 0; i < rules.length; i ++) {
        let letters = rules[i].split('>');
        let st = letters[0];
        let ed = letters[1];
        if(i == 0) {
            pt = st;
        }
        graph.set(st, ed);
        reverse_graph.set(ed, st);
    }
    
    while(reverse_graph.has(pt)) {
        pt = reverse_graph.get(pt);
    }

    let ans = '';
    while(graph.has(pt)) {
        ans += pt;
        pt = graph.get(pt);
    }
    ans += pt;

    console.log(ans);
}

findWord(["P>E","E>R","R>U"]); // PERU
findWord(["I>N","A>I","P>A","S>P"]); // SPAIN
findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"]) // HUNGARY
findWord(["I>F", "W>I", "S>W", "F>T"]) // SWIFT
findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"]) // PORTUGAL
findWord(["W>I", "R>L", "T>Z", "Z>E", "S>W", "E>R", "L>A", "A>N", "N>D", "I>T"]) // SWITZERLAND