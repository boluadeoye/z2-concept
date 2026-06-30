import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroV2 from './components/home_v2/HeroV2';
import MovingTooltip from './components/home_v2/MovingTooltip';
import VideoPlaylist from './components/home_v2/VideoPlaylist';
import GalleryV2 from './components/home_v2/GalleryV2';
import ServicesSection from './components/home_v2/ServicesSection';
import FindUsSection from './components/home_v2/FindUsSection';
import AboutSection from './components/home_v2/AboutSection';
import ProductGridV2 from './components/home_v2/ProductGridV2';

const Home = () => (
  <div className="w-full block">
    <HeroV2 />
    <MovingTooltip />
    <VideoPlaylist />
    <GalleryV2 />
    <ServicesSection />
    <FindUsSection />
    <AboutSection />
    <ProductGridV2 />
  </div>
);

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#0C0608]">
      <Navbar />
      <div className="w-full block pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
