import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import IntroStatement from './components/home/IntroStatement';
import AboutSplit from './components/home/AboutSplit';
import PortfolioSlider from './components/home/PortfolioSlider';
import BrandMarquee from './components/home/BrandMarquee';
import ProductCollection from './components/home/ProductCollection';
import PromoSection from './components/home/PromoSection';
import Testimonials from './components/home/Testimonials';
import ContactSection from './components/home/ContactSection';

// Internal Pages
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';
import PortfolioPage from './pages/Portfolio';
import StorePage from './pages/Store';
import ProjectDetail from './pages/ProjectDetail';

const Home = () => (
  <div className="relative">
    <Hero />
    <IntroStatement />
    <AboutSplit />
    <PortfolioSlider />
    <BrandMarquee />
    <ProductCollection />
    <PromoSection />
    <Testimonials />
    <ContactSection />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FDF8F0]">
        <Navbar />
        <div className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/store" element={<StorePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
