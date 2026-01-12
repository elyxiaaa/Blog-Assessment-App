import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import BF6 from '../assets/Slides/BF6.jpg';
import GOT from '../assets/Slides/GOT.jpg';
import Valorant from '../assets/Slides/Valorant.jpg';
import AW2 from '../assets/Slides/AW2.jpg';
import ArcRaiders from '../assets/Slides/ArcRaiders.jpg';
import BabySteps from '../assets/Slides/BabySteps.jpg';
import Balatro from '../assets/Slides/Balatro.jpg';
import ItTakesTwo from '../assets/Slides/ItTakesTwo.jpg';
import CC33 from '../assets/Slides/CC33.jpg';
import AstroBot from '../assets/Slides/AstroBot.jpg';
import EldenRing from '../assets/Slides/EldenRing.jpg';

import BF6Tips from '../assets/Slides/Tips/BF6Tips.jpeg';
import GOTTips from '../assets/Slides/Tips/GOTTips.jpeg';
import ValorantTips from '../assets/Slides/Tips/ValorantTips.jpg';
import ArcRaidersTips from '../assets/Slides/Tips/ArcRaidersTips.jpeg';
import BabyStepsTips from '../assets/Slides/Tips/BabyStepsTips.jpg';
import ItTakesTwoTips from '../assets/Slides/Tips/ItTakesTwoTips.jpg';
import CC33Tips from '../assets/Slides/Tips/CC33Tips.jpg';
import EldenRingTips from '../assets/Slides/Tips/EldenRingTips.jpg';

interface Slide {
  id: number;
  image: string;
  title: string;
  date: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: BF6,
    title: 'Battlefield 6: The Return of War',
    date: 'November 19, 2025',
    description:
      'The highly anticipated installment of the *Battlefield* franchise, *Battlefield 6* takes players to new battlefields with massive multiplayer modes, groundbreaking visuals, and intense combat, as players fight across dynamically changing environments in futuristic settings.',
  },
  {
    id: 2,
    image: GOT,
    title: 'Ghost of Tsushima: Legends of the Samurai',
    date: 'July 17, 2025',
    description: 'Set in feudal Japan, *Ghost of Tsushima* follows samurai Jin Sakai as he defends Tsushima Island from Mongol invaders. With stunning visuals, a unique combat system, and an open-world design, the game explores themes of honor, sacrifice, and rebellion.',
  },
  {
    id: 3,
    image: Valorant,
    title: 'Valorant: A New Era in Tactical Shooters',
    date: 'June 2, 2025',
    description: 'A fast-paced tactical shooter developed by Riot Games, *Valorant* combines precision shooting with hero-based abilities. Players select agents with unique powers and engage in strategic 5v5 battles to secure objectives, redefining the competitive FPS genre.',
  },
  {
    id: 4,
    image: CC33,
    title: 'Clair Obscur: Expedition 33 - Unraveling the Darkness',
    date: 'September 14, 2025',
    description: 'In *Clair Obscur: Expedition 33*, players embark on a mysterious journey through unknown lands to uncover long-forgotten secrets. Set in an atmospheric world with rich lore, the game offers puzzle-solving, exploration, and a deep narrative filled with twists.',
  },
];

const tips = [
  {
    id: 1,
    image: BF6Tips,
    title: "How to Master Battlefield 6's New Mechanics",
    author: "John Smith",
  },
  {
    id: 2,
    image: GOTTips,
    title: "Ghost of Tsushima: Combat Guide for New Players",
    author: "Sarah Lee",
  },
  {
    id: 3,
    image: ValorantTips,
    title: "Valorant: Best Agents for Beginners",
    author: "Ethan Gach",
  },
  {
    id: 4,
    image: EldenRingTips,
    title: "Elden Ring: How to Defeat the First Boss",
    author: "Zack Zweizen",
  },
  {
    id: 5,
    image: ArcRaidersTips,
    title: "How to Survive in Arc Raiders",
    author: "John Walker",
  },
  {
    id: 6,
    image: BabyStepsTips,
    title: "Best Strategies for BabySteps",
    author: "Michael Johnson",
  },
  {
    id: 7,
    image: ItTakesTwoTips,
    title: "Secrets to Success in It Takes Two",
    author: "Jennifer Turner",
  },
  {
    id: 8,
    image: CC33Tips,
    title: "Top 10 Hidden Gems in Clair Obscur: Expedition 33",
    author: "Emily Roberts",
  },
];

const topGames = [
  {
    id: 1,
    image: AW2,
    title: 'Allan Wake 2',
    developer: 'Remedy Entertainment',
  },
  {
    id: 2,
    image: ArcRaiders,
    title: 'ARC Raiders',
    developer: 'Embark Studios',
  },
  {
    id: 3,
    image: BabySteps,
    title: 'BabySteps',
    developer: 'Bennett Foddy',
  },
  {
    id: 4,
    image: Balatro,
    title: 'Balatro',
    developer: 'LocalThunk',
  },
];

const gameOfTheYear = [
  {
    id: 1,
    image: CC33,
    title: 'Clair Obscur: Expedition 33',
    year: 'Year 2025',
  },
  {
    id: 2,
    image: AstroBot,
    title: 'Astro Bot',
    year: 'Year 2024',
  },
  {
    id: 3,
    image: EldenRing,
    title: 'Elden Ring',
    year: 'Year 2023',
  },
  {
    id: 4,
    image: ItTakesTwo,
    title: 'It Takes Two',
    year: 'Year 2023',
  },
];

const LandingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center px-4 py-12">
        <div className="max-w-6xl w-full text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Trending Articles</h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">Latest news and insights from the gaming world</p>
        </div>

        {/* SLIDE */}
        <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center mb-8">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-gray-200/80 p-3 rounded-full hover:bg-gray-300 transition"
          >
            <FiArrowLeft size={24} />
          </button>

          <div className="w-full h-full overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 flex items-center justify-center bg-white h-full"
                >
                  <div className="flex flex-col sm:flex-row items-center w-full h-full p-6">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full sm:w-1/2 h-80 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
                    />
                    <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-1/2">
                      <p className="text-gray-500 text-sm mb-2">{slide.date}</p>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{slide.title}</h2>
                      <p className="text-gray-700">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-gray-200/80 p-3 rounded-full hover:bg-gray-300 transition"
          >
            <FiArrowRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? 'bg-gray-900' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        {/* TIPS */}
        <div className="container mx-auto p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Tips & Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div key={tip.id} className="card bg-base-100 shadow-xl transform transition-transform hover:scale-105">
                <figure>
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-60 object-cover rounded-lg transition-transform hover:scale-105"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{tip.title}</h3>
                  <p>By {tip.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP GAMES */}
        <div className="container mx-auto p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Top Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topGames.map((game) => (
              <div key={game.id} className="card bg-base-100 shadow-xl transform transition-transform hover:scale-105">
                <figure>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-80 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{game.title}</h3>
                  <p>{game.developer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/** GOTY */}
        <div className="container mx-auto p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Game Of The Year</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameOfTheYear.map((game) => (
              <div key={game.id} className="card bg-base-100 shadow-xl transform transition-transform hover:scale-105">
                <figure>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-80 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{game.title}</h3>
                  <p>{game.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
