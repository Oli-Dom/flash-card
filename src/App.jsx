import React, { useState } from 'react';
import './App.css';

function App() {
  const initialData = [
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
  ];

  const [count, setCount] = useState(initialData.length);
  const [text, setText] = useState(initialData[0].description);
  const [iTracker, setTracker] = useState(0);
  const [answer, setAnswer] = useState(initialData[0].breed);
  const [usedIndices, setUsedIndices] = useState([0]);

  const addCard = () => {
    const userBreed = window.prompt('Enter the breed:');
    const userFacts = window.prompt('Enter a fact:');
    const newData = {
      description: userFacts,
      breed: userBreed,
    };
    setCount(count + 1);
    initialData.push(newData);
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

    setUsedIndices([...usedIndices, newIndex]);
    setTracker(newIndex);
    setText(initialData[newIndex].description);
    setAnswer(initialData[newIndex].breed);
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
      <div className="userActions">
        <button onClick={nextCard}>next</button>
        <button onClick={addCard}>Add a Breed</button>
      </div>
    </div>
  );
}

export default App;
