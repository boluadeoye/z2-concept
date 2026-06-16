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
import ProductDetail from './pages/ProductDetail';

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

// Simple 404 Component for debugging
const NotFound = () => (
  <div className="h-[60vh] flex flex-col items-center justify-center bg-[#FDF8F0]">
    <h2 className="text-4xl font-black text-black uppercase">404 - Route Not Found</h2>
    <p className="text-black/40 mt-4">The URL you entered does not match any defined routes.</p>
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
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* Catch-all route to prevent blank screens */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
