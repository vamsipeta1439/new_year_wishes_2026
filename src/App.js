import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import image1 from './assets/image1.jpeg';
import image2 from './assets/image2.jpeg';
import image3 from './assets/image3.jpeg';
import image4 from './assets/image4.jpeg'; 
import image5 from './assets/image5.jpeg';
import image6 from './assets/image6.jpeg';
import image7 from './assets/image7.jpeg';

// Confetti Component
const Confetti = () => {
  const confettiColors = ['bg-pink-400', 'bg-red-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className={`absolute w-3 h-3 ${piece.color} rounded-full animate-fall`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            top: '-20px'
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

// Envelope Component
const Envelope = ({ onClick, isOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 p-4">
      <div 
        onClick={onClick}
        className="relative cursor-pointer transform transition-all duration-500 hover:scale-105"
      >
        {/* Envelope Body */}
        <div className={`relative w-64 h-40 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg shadow-2xl transition-all duration-700 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
          {/* Envelope Flap */}
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 to-pink-600 rounded-lg origin-top transition-transform duration-700 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
            style={{
              clipPath: 'polygon(0 0, 50% 60%, 100% 0)'
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>
          </div>
          
          {/* Envelope Front */}
          <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-br from-red-400 to-pink-500 rounded-b-lg flex items-center justify-center">
            <div className="text-white text-center px-4">
              <Heart className="w-6 h-6 mx-auto mb-2 fill-white" />
              <p className="text-xl font-light">For Someone Special</p>
            </div>
          </div>
        </div>
        
        {/* Tap to Open Text */}
        <div className={`mt-8 text-center transition-all duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 animate-pulse">
            Tap to Open 💌
          </p>
        </div>
      </div>
    </div>
  );
};

// Countdown Component
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-01-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-4">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <Heart className="w-16 h-16 text-pink-300 fill-pink-300 mx-auto animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Hey Lokeswari Wait for sometime 💖
          </h2>
        </div>
        
        <div className="grid grid-cols-4 gap-4 max-w-2xl">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white border-opacity-20">
              <div className="text-2xl md:text-6xl font-bold text-white mb-2">
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-base text-pink-200 uppercase tracking-wider">
                {unit}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-pink-200 text-lg animate-pulse">
          The wait will be worth it... ✨
        </p>
      </div>
    </div>
  );
};

// Popup Modal Component
const PopupModal = ({ onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      {showConfetti && <Confetti />}
      
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-scaleIn border-4 border-pink-300">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center space-x-2">
            <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-bounce" />
            <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-bounce delay-100" />
            <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-bounce delay-200" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Happy New Year 2026! 🎉
          </h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg md:text-xl">
              As we step into this new year, I want you to know how incredibly special you are to me. ✨
            </p>
            <p className="text-base md:text-lg">
              May this year bring you endless joy, beautiful moments, and dreams that come true. 
              You deserve all the happiness in the world! 💖
            </p>
            <p className="text-base md:text-lg font-semibold text-purple-600">
              Here's to new adventures, cherished memories, and a love that grows stronger every day. 🌟
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto space-x-2"
          >
            <span>Thank You</span>
            <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Placeholder images - replace with actual image URLs
  const images = [
    { url: image1, caption: 'Beautiful Moments 💕' },
    { url: image2, caption: 'Breathing in Peace 🌳' },
    { url: image7, caption: 'Where Beauty Meets Tradition ❤️' },
    { url: image5, caption: 'Nothing Fancy, Just Me 😎' },
    { url: image4, caption: 'Love & Laughter 😊' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative h-64 md:h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <p className="text-white text-xl font-semibold">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Wishes Card Component
const WishesCard = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200 transform transition-all duration-300 hover:scale-105 hover:shadow-pink-200 hover:shadow-3xl">
        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
            <h3 className="text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              My Wishes for You Lokeswari<span className="text-2xl">🫰🏻</span>
            </h3>
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
          
          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <p className="flex items-start space-x-3">
              <span className="text-2xl">🌟</span>
              <span>May every sunrise bring you hope and every sunset bring you peace.</span>
            </p>
            
            <p className="flex items-start space-x-3">
              <span className="text-2xl">💝</span>
              <span>May your heart be filled with love, your mind with wisdom, and your days with joy.</span>
            </p>
            
            <p className="flex items-start space-x-3">
              <span className="text-2xl">✨</span>
              <span>May all your dreams take flight and your wishes come true in ways more beautiful than you imagined.</span>
            </p>
            
            <p className="flex items-start space-x-3">
              <span className="text-2xl">🎊</span>
              <span>May this year be filled with laughter, adventure, and moments that take your breath away.</span>
            </p>
            
            <p className="flex items-start space-x-3">
              <span className="text-xl">💖</span>
              <span>And most importantly, may you always know how deeply you are loved and cherished.</span>
            </p>
          </div>
          
          <div className="text-center pt-6 border-t-2 border-pink-200">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              With all my love, forever and always 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [stage, setStage] = useState('envelope'); // envelope, countdown, opened, main
  const [showModal, setShowModal] = useState(false);

  const checkAndOpenEnvelope = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    if (currentYear >= 2026) {
      setStage('opened');
      setShowModal(true);
    } else {
      setStage('countdown');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setStage('main');
  };

  // Recheck date when countdown is active
  useEffect(() => {
    if (stage === 'countdown') {
      const checkDate = setInterval(() => {
        const currentYear = new Date().getFullYear();
        if (currentYear >= 2026) {
          setStage('opened');
          setShowModal(true);
        }
      }, 1000);
      return () => clearInterval(checkDate);
    }
  }, [stage]);

  return (
    <div className="min-h-screen">
      {stage === 'envelope' && (
        <Envelope onClick={checkAndOpenEnvelope} isOpen={false} />
      )}
      
      {stage === 'countdown' && <Countdown />}
      
      {stage === 'opened' && showModal && (
        <PopupModal onClose={handleModalClose} />
      )}
      
      {stage === 'main' && (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-12">
              Happy New Year 2026! 🎉
            </h1>
            
            <ImageCarousel />
            
            <WishesCard />
            
            <div className="text-center pb-8">
              <p className="text-gray-600 text-sm">Made with 💖 just for us</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;