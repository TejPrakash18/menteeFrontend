import './App.css';

import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Instructor from "./components/Instructor";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Define the Routes for different components */}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <HeroSection />
                            <FeaturesSection />
                            <WhyChooseUs />
                            <Instructor />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
