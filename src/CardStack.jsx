import React, { useState, useEffect } from 'react';
import './card.css';

const listOfCards = [
  { title: 'CARD #1', color: 'green' },
  { title: 'CARD #2', color: 'brown' },
  { title: 'CARD #3', color: 'red' },
  { title: 'CARD #4', color: 'black' },
  { title: 'CARD #5', color: 'blue' },
  { title: 'CARD #6', color: 'purple' }
];

export const CardStack = () => {
  const [currentCards, setCurrentCards] = useState(listOfCards.slice(0, 3));
  const [transitioning, setTransitioning] = useState(false);

  const handleNextClick = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrentCards((prevCards) => {
        const currentIndex = listOfCards.indexOf(prevCards[0]);
        const nextIndex = (currentIndex + 1) % listOfCards.length;
        const newCards = [];

        for (let i = 0; i < 3; i++) {
          newCards.push(listOfCards[(nextIndex + i) % listOfCards.length]);
        }

        return newCards;
      });
    }
  };

  const handlePrevClick = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrentCards((prevCards) => {
        const currentIndex = listOfCards.indexOf(prevCards[0]);
        const prevIndex = (currentIndex - 1 + listOfCards.length) % listOfCards.length;
        const newCards = [];

        for (let i = 0; i < 3; i++) {
          newCards.push(listOfCards[(prevIndex + i) % listOfCards.length]);
        }

        return newCards;
      });
    }
  };

  useEffect(() => {
    const transitionDuration = 800; // Adjust the transition duration
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, transitionDuration);
    return () => clearTimeout(timer);
  }, [currentCards]);

  return (
    <div className="App">
      <div className={`card-stack`}>
        <div className={`cards ${transitioning ? 'transitioning' : ''}`}>
          {currentCards.map((card, index) => (
            <div
              key={index}
              className={`card ${index === 0 ? 'front-card' : ''}`}
              style={{
                backgroundColor: card.color,
                width: `${400 - index * 50}px`,
                height: `${400 - index * 50}px`,
                transform: `translateX(${index === 0 && transitioning ? '-50%' : index * 50}px)`,
                animation: `${index === 0 && transitioning ? 'slide-1' : index === 1 && transitioning ? 'slide-2' : 'slide-3'} 0.8s ease-in-out` // Apply different animations
              }}
            >
              {card.title}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="prev-button" onClick={handlePrevClick}>
            Prev
          </button>
          <button className="next-button" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
