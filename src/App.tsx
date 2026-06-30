import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppChat from './components/shared/WhatsAppChat';

// Version 2 Components
import HeroV2 from './components/home_v2/HeroV2';
import MovingTooltip from './components/home_v2/MovingTooltip';
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
import ResetPasswordPage from './pages/ResetPassword';
import DashboardPage from './pages/Dashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Home = () => (
  <div className="relative">
    <HeroV2 />
    <MovingTooltip />
    <VideoPlaylist />
    <GalleryV2 />
    <ProductGridV2 />
  </div>
);

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-[#FDF8F0]">
    <h1 className="text-6xl font-black text-black opacity-10">404</h1>
    <h2 className="text-2xl font-bold uppercase tracking-widest text-black">Page Not Found</h2>
    <a href="/" className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm">Return Home</a>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F0]">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}

export default App;
