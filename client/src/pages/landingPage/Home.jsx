import React from 'react';

import  Navbar  from '../../components/home/1Navbar/Navbar';
import  Hero  from '../../components/home/2Hero2/Hero';

// import Hero from '../../components/home/2Hero/Hero1';
import IconBar from '../../components/home/3Hero/Iconbar';
import ProjectSection from '../../components/home/4ImageSec/ProjectSection';
import SlidingText from '../../components/home/4Sliding/SlidingText';
// import TextRevealSection from '../../components/home/5Text/TextRevealSection';
import TextLoopSection from '../../components/home/6TextLoop/TextLoopSection';
import TeamSection from '../../components/home/7Cards/TeamSection';     

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <IconBar />
        <ProjectSection />
        <SlidingText />
        {/* <TextRevealSection /> */}
        <TextLoopSection />
        <TeamSection />
    </div>
  );
}

export default Home;