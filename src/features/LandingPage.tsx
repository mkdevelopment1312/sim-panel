
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ff41,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.3),
      new THREE.IcosahedronGeometry(0.4)
    ];

    const shapes: THREE.Mesh[] = [];
    
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        transparent: true,
        opacity: 0.1,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 + index * 0.0001;
        shape.rotation.y += 0.001 + index * 0.0001;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const networks = [
    'Orange', 'Plus', 'T-Mobile', 'Play', 
    'Virgin Mobile', 'Heyah', 'NJU Mobile', 'Lyca Mobile'
  ];

  const features = [
    {
      title: 'Szybka rejestracja',
      description: 'Rejestracja karty SIM w maksymalnie 24 godziny',
      icon: '⚡'
    },
    {
      title: 'Wszystkie sieci',
      description: 'Obsługujemy wszystkie polskie operatorów komórkowych',
      icon: '📡'
    },
    {
      title: 'Bezpieczne płatności',
      description: 'Płatności BLIK, Bitcoin i Litecoin',
      icon: '🔒'
    },
    {
      title: 'Profesjonalne wsparcie',
      description: '24/7 wsparcie techniczne dla klientów',
      icon: '🛠️'
    }
  ];

  const pricingPlans = [
    {
      name: 'Standardowa',
      price: '50 PLN',
      features: [
        'Rejestracja w 24h',
        'Dowolna sieć komórkowa',
        'Podstawowe wsparcie',
        'Gwarancja rejestracji'
      ]
    },
    {
      name: 'Express',
      price: '100 PLN',
      features: [
        'Rejestracja w 2h',
        'Priorytetowe wsparcie',
        'Wszystkie sieci',
        'Gwarancja zwrotu'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '200 PLN',
      features: [
        'Rejestracja w 30min',
        'Dedykowany opiekun',
        'Wszystkie sieci',
        'Pełna gwarancja'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-neon-green/20 p-4 backdrop-blur-md bg-cyber-dark/80">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-orbitron font-bold text-white modern-brand animate-glow-pulse">
              SIM.XAXA.WIN
            </h1>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/auth')} variant="secondary" className="hover-scale">
                Logowanie
              </Button>
              <Button onClick={() => navigate('/auth')} className="neon-button hover-scale">
                <span>Rejestracja</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-32 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-7xl font-orbitron font-black text-transparent bg-clip-text bg-neon-gradient mb-6 animate-glow-pulse">
                PROFESJONALNA
              </h1>
              <h2 className="text-5xl font-orbitron font-black text-white mb-8 animate-slide-in-left">
                REJESTRACJA KART SIM
              </h2>
              <div className="w-32 h-1 bg-neon-gradient mx-auto mb-8 animate-border-glow"></div>
              <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Najszybsza i najbezpieczniejsza usługa rejestracji kart SIM dla wszystkich polskich sieci komórkowych. 
                <span className="text-neon-green font-semibold"> Profesjonalna obsługa, konkurencyjne ceny, gwarancja realizacji.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button onClick={() => navigate('/auth')} className="neon-button text-xl px-12 py-6 animate-bounce-soft">
                  <span>ROZPOCZNIJ REJESTRACJĘ →</span>
                </Button>
                <div className="text-neon-green font-mono text-sm animate-text-shimmer bg-text-shimmer bg-[length:200%_100%]">
                  ✓ Bez ukrytych kosztów ✓ Gwarancja zwrotu
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center cyber-card animate-fade-in-up">
                <div className="text-4xl font-orbitron font-bold text-neon-green mb-2">5000+</div>
                <div className="text-gray-300">Zarejestrowanych kart</div>
              </div>
              <div className="text-center cyber-card animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl font-orbitron font-bold text-neon-green mb-2">24/7</div>
                <div className="text-gray-300">Wsparcie techniczne</div>
              </div>
              <div className="text-center cyber-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-orbitron font-bold text-neon-green mb-2">99.9%</div>
                <div className="text-gray-300">Skuteczność rejestracji</div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Networks */}
        <section className="py-20 px-4 bg-matrix-bg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold text-center mb-16 matrix-text">
              OBSŁUGIWANE SIECI
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {networks.map((network, index) => (
                <div 
                  key={index} 
                  className="text-center p-8 glass-panel hover-scale transition-all duration-500 group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-xl font-rajdhani font-semibold text-white group-hover:text-neon-green transition-colors">
                    {network}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold text-center mb-16 matrix-text">
              DLACZEGO MY?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="cyber-card hover-scale group animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-6xl mb-6 animate-float" style={{animationDelay: `${index * 0.3}s`}}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-neon-green mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 bg-matrix-bg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold text-center mb-16 matrix-text">
              CENNIK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`cyber-card hover-scale group transition-all duration-500 ${plan.popular ? 'scale-105 border-neon-green animate-border-glow' : ''}`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {plan.popular && (
                    <div className="text-center mb-6 animate-bounce-soft">
                      <span className="bg-neon-gradient text-black px-6 py-2 text-sm font-orbitron font-bold tracking-wider">
                        NAJPOPULARNIEJSZA
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-orbitron font-bold text-center mb-4 group-hover:text-neon-green transition-colors">
                    {plan.name}
                  </h3>
                  <div className="text-5xl font-orbitron font-black text-center mb-8 bg-clip-text text-transparent bg-neon-gradient">
                    {plan.price}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <span className="text-neon-green mr-3 text-xl">✓</span>
                        <span className="font-rajdhani">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => navigate('/auth')} 
                    className={`w-full ${plan.popular ? 'neon-button' : 'hover-scale'}`}
                    variant={plan.popular ? 'primary' : 'secondary'}
                  >
                    <span>WYBIERZ PLAN</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold text-center mb-16 matrix-text">
              JAK TO DZIAŁA?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: '01',
                  title: 'Rejestracja konta',
                  description: 'Stwórz konto i zweryfikuj swój e-mail'
                },
                {
                  step: '02',
                  title: 'Wybierz sieć i plan',
                  description: 'Wybierz operatora i plan rejestracji'
                },
                {
                  step: '03',
                  title: 'Płatność i realizacja',
                  description: 'Opłać usługę i otrzymaj zarejestrowaną kartę'
                }
              ].map((item, index) => (
                <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="text-8xl font-orbitron font-black text-transparent bg-clip-text bg-neon-gradient mb-6 relative">
                    {item.step}
                    <div className="absolute -inset-4 bg-neon-green/10 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-cyber-gradient relative">
          <div className="absolute inset-0 bg-matrix-bg opacity-50"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-neon-gradient mb-8 animate-glow-pulse">
              GOTOWY NA START?
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-rajdhani leading-relaxed">
              Dołącz do tysięcy zadowolonych klientów i zarejestruj swoją kartę SIM już dziś
            </p>
            <Button onClick={() => navigate('/auth')} className="neon-button text-2xl px-16 py-8 animate-bounce-soft">
              <span>ROZPOCZNIJ TERAZ →</span>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neon-green/20 py-12 px-4 bg-cyber-dark/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-neon-green font-orbitron font-bold text-3xl mb-6 animate-glow-pulse">
              SIM.XAXA.WIN
            </div>
            <p className="text-gray-400 text-sm font-rajdhani">
              © 2024 SIM.XAXA.WIN - Profesjonalna rejestracja kart SIM
            </p>
            <div className="mt-6 flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-rajdhani">Regulamin</a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-rajdhani">Polityka prywatności</a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-rajdhani">Kontakt</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
