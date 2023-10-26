import "./styles.css";

import React, { useState } from "react";

const dictionary = [
  "agent",
  "basic",
  "human",
  "magic",
  "power",
  "smile",
  "trade",
  "world"
];

const TRIES = 6;
const LENGTH_WORD = 5;
// const tablePlaceholder = new Array(TRIES).fill(new Array(LENGTH_WORD).fill(''));

const Word = ({ dictWord, value }) => {
  const [matching, setMatching] = useState(new Array(LENGTH_WORD).fill(0));
  const string = new Array(LENGTH_WORD).fill(" ");
  value.split("").map((char, index) => {
    string[index] = char;
  });

  // const finds = [];
  // for (let i = 0; i < LENGTH_WORD; i++) {
  //   if (string[i] === dictWord[i]) {
  //     finds.push(1);
  //   } else {
  //     finds.push(0);
  //   }
  // }
  // setMatching(finds);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {string.map((char, index) => (
        <div
          style={{
            margin: 4,
            width: 30,
            height: 50,
            border: "1px solid gray",
            background: char === dictWord[index] ? "green" : "white"
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [tries, setTries] = useState(0);
  const [words, setWords] = useState(new Array(TRIES).fill(""));
  const [input, setInput] = useState("");
  const [winnerWord, setWinnerWord] = useState(dictionary[0]);

  const handleChange = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length !== 5) {
        alert("type a text with 5 character");
        return;
      }
      if (winnerWord === e.target.value) {
        setWords(new Array(TRIES).fill(""));
        setInput("");
        setTries(0);
        alert("You are the Winner");
        return;
      }
      const wordList = [...words];
      wordList[tries] = e.target.value;
      setTries(tries + 1);
      setInput(e.target.value);
      setWords(wordList);
    }
  };
  console.log(words);
  // const findWord = () => {
  // 	for (let i = 0; i < dictionary.length; i++) {
  //   	if (input === dictionary[i]) {
  //     	setWinnerWord(input);
  //     }
  //   }
  // };

  return (
    <div className="container">
      <input type="text" onKeyDown={handleChange} />
      <div>
        {words.map((word, index) => (
          <Word key={`word-${index}`} value={word} dictWord={winnerWord} />
        ))}
      </div>
    </div>
  );
}
