import { useState } from 'react';
import './App.css';
function App() {
  const data = [
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

  const [count, setCount] = useState(data.length);
  const [text, setText] = useState(data[0].description);
  const [iTracker, setTracker] = useState(0);
  const [answer, setAnswer] = useState(data[0].breed);

  const addCard = () => {
    const userBreed = window.prompt('Enter the breed:');
    const userFacts = window.prompt('Enter a fact:');
    const newData = {
      description: userFacts,
      breed: userBreed,
    };
    data.push(newData);
    setCount(count + 1);
  };

  const nextCard = () => {
    setTracker(iTracker + 1);
    setText(data[iTracker + 1].description);
    setAnswer(data[iTracker + 1].breed);
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
