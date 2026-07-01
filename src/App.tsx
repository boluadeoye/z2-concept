import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppChat from './components/shared/WhatsAppChat';

// Homepage Components
import HeroV2 from './components/home_v2/HeroV2';
import MovingTooltip from './components/home_v2/MovingTooltip';
import VideoPlaylist from './components/home_v2/VideoPlaylist';
import GalleryV2 from './components/home_v2/GalleryV2';
import ServicesSection from './components/home_v2/ServicesSection';
import FindUsSection from './components/home_v2/FindUsSection';
import AboutSection from './components/home_v2/AboutSection';
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
import ResetPasswordPage from './pages/ResetPassword';
import DashboardPage from './pages/Dashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Home = () => (
  /* FORCE DARK THEME ONLY FOR HOMEPAGE */
  <div className="w-full block bg-[#0C0608] text-white">
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
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1 w-full pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<PortfolioPage />} />
          <Route path="/gallery/:slug" element={<ProjectDetail />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}
