/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';

function App() {
  const [initialData, setInitialData] = useState([
    {
      description:
        "loved by celebrities, drools a lot, and can't swim due to their flat nose",
      breed: 'French Bulldog',
    },
    {
      description:
        'Are often in movies, loves tennis balls, and is easy to train',
      breed: 'Golden Retriever',
    },
    {
      description:
        'Originated in the mountains of Europe, common to have two different color eyes, often associated with cowboy culture',
      breed: 'Australian Shepherd',
    },
  ]);

  const [count, setCount] = useState(initialData.length);
  const [text, setText] = useState(initialData[0].description);
  const [iTracker, setTracker] = useState(0);
  const [answer, setAnswer] = useState(initialData[0].breed);
  const [usedIndices, setUsedIndices] = useState([0]);
  const [prevCards, setPrevCards] = useState([]);
  const [userAnswer, setUserAnswer] = useState(''); // State for user's answer
  const [inputBorderColor, setInputBorderColor] = useState(''); // State for input box border color

  const addCard = () => {
    const userBreed = window.prompt('Enter the breed:');
    const userFacts = window.prompt('Enter a fact:');
    const newData = {
      description: userFacts,
      breed: userBreed,
    };

    // Clone the initialData array and add the new card to the clone
    const newDataArray = [...initialData, newData];

    setCount(newDataArray.length);
    setInitialData(newDataArray); // Update the initialData state variable
  };

  const nextCard = () => {
    if (usedIndices.length === count) {
      // All cards have been shown, reset usedIndices array
      setUsedIndices([]);
      setText(initialData[0].description);
      setAnswer(initialData[0].breed);
      setTracker(0);
      return;
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * count);
    } while (usedIndices.includes(newIndex));

    // Push the current card onto the prevCards stack
    setPrevCards([...prevCards, { text, answer, tracker: iTracker }]);

    setUsedIndices([...usedIndices, newIndex]);
    setTracker(newIndex);
    setText(initialData[newIndex].description);
    setAnswer(initialData[newIndex].breed);

    // Clear the user's answer and input box border color when moving to the next card
    setUserAnswer('');
    setInputBorderColor('');
  };

  const prevCard = () => {
    if (prevCards.length === 0) {
      // No previous cards to show
      return;
    }

    // Pop the last card from the prevCards stack
    const lastCard = prevCards.pop();

    // Set the text, answer, and tracker to the values of the last card
    setText(lastCard.text);
    setAnswer(lastCard.answer);
    setTracker(lastCard.tracker);

    // Update the prevCards stack
    setPrevCards([...prevCards]);

    // Clear the user's answer and input box border color when moving to the previous card
    setUserAnswer('');
    setInputBorderColor('');
  };

  const checkAnswer = () => {
    if (userAnswer === answer) {
      // Correct answer, set the input box border color to green
      setInputBorderColor('green');
    } else {
      // Wrong answer, set the input box border color to red
      setInputBorderColor('red');
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Test your dog knowledge!</h1>
        <h2>Lets see how much you know about dog breeds</h2>
        <h3>Number of cards: {count}</h3>
      </div>
      <div className="card">
        <div className="content">
          <div className="front">{text}</div>
          <div className="back">{answer}</div>
        </div>
      </div>

      <div className="center-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkAnswer();
          }}
        >
          <input
            type="text"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={{ borderColor: inputBorderColor }}
          />
          <button type="submit">Check Answer</button>
        </form>
      </div>
      <div className="userActions">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
        <button onClick={addCard}>Add a Breed</button>
      </div>
    </div>
  );
}

export default App;
