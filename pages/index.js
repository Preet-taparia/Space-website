// pages/index.js

import {
  About,
  Explore,
  Feedback,
  GetStarted,
  Hero,
  WhatsNew,
  World,
  YouTubeHub,
  GearSection,
  CommunityBanner,
  ShortsGallery,
  CommunityHub,
} from "../components";

const Home = () => (
  <div>
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
      <YouTubeHub />
      <ShortsGallery />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      <WhatsNew />
      <GearSection />
    </div>
    <div className="relative">
      <World />
      <div className="gradient-04 z-0" />
      <CommunityBanner />
      <CommunityHub />
      <Feedback />
    </div>
  </div>
);

export default Home;
