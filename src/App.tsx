import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Version 2 Components
import HeroV2 from './components/home_v2/HeroV2';
import PromoSlant from './components/home_v2/PromoSlant';
import VideoPlaylist from './components/home_v2/VideoPlaylist';
import GalleryV2 from './components/home_v2/GalleryV2';
import ProductGridV2 from './components/home_v2/ProductGridV2';

// Internal Pages
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';
import PortfolioPage from './pages/Portfolio';
import StorePage from './pages/Store';
import ProjectDetail from './pages/ProjectDetail';
import ProductDetail from './pages/ProductDetail';
import BlogPage from './pages/Blog';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';
import DashboardPage from './pages/Dashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Home = () => (
  <div className="relative">
    <HeroV2 />
    <PromoSlant />
    <VideoPlaylist />
    <GalleryV2 />
    <ProductGridV2 />
  </div>
);

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-[#FDF8F0]">
    <h1 className="text-6xl font-black text-black opacity-10">404</h1>
    <h2 className="text-2xl font-bold uppercase tracking-widest text-black">Page Not Found</h2>
    <a href="/" className="btn-pill bg-black text-white">Return Home</a>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F0]">
      <ScrollToTop />
      {/* FIGMA FIDELITY: Navbar is now self-contained with solid stacking context */}
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
