
import './App.css'
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import InstructorSection from './components/Instructor';
import Navbar from './components/Navbar';
import WhyChooseUs from './components/WhyChooseUs';


function App() {
  
  return (
    <>
     <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <InstructorSection />
      <Footer />
    </div>
    </>
  )
}

export default App
