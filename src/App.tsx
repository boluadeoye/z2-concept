import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import IntroStatement from './components/home/IntroStatement';
import AboutSplit from './components/home/AboutSplit';
import PortfolioSlider from './components/home/PortfolioSlider';
import BrandMarquee from './components/home/BrandMarquee';
import ProductCollection from './components/home/ProductCollection';
import PromoSection from './components/home/PromoSection';
import ContactSection from './components/home/ContactSection';
import Footer from './components/layout/Footer';

const Home = () => (
  <div className="relative bg-[#FDF8F0]">
    <Navbar />
    <Hero />
    <IntroStatement />
    <AboutSplit />
    <PortfolioSlider />
    <BrandMarquee />
    <ProductCollection />
    <PromoSection />
    <ContactSection />
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
