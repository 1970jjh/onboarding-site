import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MyProfile from './components/MyProfile';
import WebtoonStory from './components/WebtoonStory';
import CoreValues from './components/CoreValues';
import KolonWay from './components/KolonWay';
import SuperMentality from './components/SuperMentality';
import TalentProfile from './components/TalentProfile';
import Strengths from './components/Strengths';
import GrowthPlan from './components/GrowthPlan';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />
      <main>
        <Hero />
        <MyProfile />
        <WebtoonStory />
        <CoreValues />
        <KolonWay />
        <SuperMentality />
        <TalentProfile />
        <Strengths />
        <GrowthPlan />
      </main>
      <Footer />
    </div>
  );
};

export default App;