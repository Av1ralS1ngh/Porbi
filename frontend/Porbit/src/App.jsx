import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ArrowRight,
  Globe,
  Layers,
  Zap,
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Mouse,
  CircuitBoard,
  Wallet,
  Shield,
  Activity,
  Target,
  Coins,
  Infinity as InfinityIcon,
} from "lucide-react";

const PorbiLanding = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionsRef.current.indexOf(entry.target);
            setActiveSection(sectionIndex);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const InteractiveGrid = () => (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        transition: "all 0.3s ease",
        transform: `translate(${mousePosition.x * 0.005}px, ${
          mousePosition.y * 0.005
        }px)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, transparent 150px)`,
        }}
      />
    </div>
  );

  const NavBar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 group">
            {/* Logo */}
            <div className="relative w-15 h-15 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <img
                src="/image-removebg-preview (4).png"
                alt="Orbital animation"
                className="w-30 h-30 object-contain"
              />
            </div>

            {/* Brand Text */}
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
                Porbi
              </h1>
              <div className="text-xs text-gray-400 relative inline-block">
                Next-Gen AMM
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-60 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-lg p-1 border border-white/10 backdrop-blur-sm">
            {["Home", "Technology", "3D Architecture", "Interface"].map(
              (item, index) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(index)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeSection === index
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item}
                </Button>
              )
            )}
          </div>

          <Button className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            Launch Porbi
          </Button>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section
      ref={(el) => (sectionsRef.current[0] = el)}
      className="relative min-h-screen py-9"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left GIF */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/orbital-gif-1.gif"
              alt="Orbital animation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow mb-6">
              Porbi
            </h1>

            <Badge
              variant="secondary"
              className="mb-8 bg-white/10 border-white/20 text-white px-6 py-2 text-sm font-medium backdrop-blur-sm shadow-lg inline-flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionary Multi-Dimensional Stablecoin AMM
            </Badge>

            <p className="text-lg md:text-2xl text-gray-300 mb-12 font-light leading-relaxed drop-shadow">
              Unlock unprecedented capital efficiency with concentrated
              liquidity in
              <span className="font-semibold text-white">
                {" "}
                higher dimensions
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
              <Button className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group shadow-lg">
                <span>Launch Application</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection(1)}
                className="bg-transparent border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                <span>Explore Technology</span>
                <ChevronDown className="w-5 h-5 ml-3" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  value: "1000x",
                  label: "Capital Efficiency",
                },
                { icon: Zap, value: "0.04%", label: "Ultra-Low Fees" },
                {
                  icon: InfinityIcon,
                  value: "∞",
                  label: "Stablecoins Supported",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-white drop-shadow" />
                    <div className="text-2xl font-bold mb-1 text-white">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const TechnologySection = () => (
    <section
      ref={(el) => (sectionsRef.current[1] = el)}
      className="min-h-screen py-5 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
            Technology Foundation
          </Badge>
          <h2 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Revolutionary Architecture
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Combining the mathematical precision of Curve's StableSwap with
            Uniswap V3's concentrated liquidity in higher dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    Concentrated Liquidity
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Uniswap V3 Evolution
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-900/50 border border-white/10 shadow-inner">
                <div className="aspect-video relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <source
                      src="/4223ca1f7af282d0001a3d7a7782c52f07c97d6d.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
                    4000x Capital Efficiency
                  </Badge>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Porbi extends Uniswap V3's revolutionary concentrated liquidity
                concept into n-dimensional space, allowing liquidity providers
                to focus capital where it matters most across multiple
                stablecoins simultaneously.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                  <div className="text-white font-bold text-lg">4000x</div>
                  <div className="text-gray-300 text-sm">Max Efficiency</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                  <div className="text-white font-bold text-lg">Custom</div>
                  <div className="text-gray-300 text-sm">Price Ranges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    StableSwap Engine
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Curve Finance Powered
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-900/50 border border-white/10 shadow-inner">
                <div className="aspect-video relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <source
                      src="/Recording 2025-09-27 185528.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
                    Ultra-Low Slippage
                  </Badge>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Utilizing Curve's battle-tested StableSwap invariant optimized
                for stablecoins, Porbi ensures minimal slippage and maximum
                efficiency when trading between pegged assets.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                  <div className="text-white font-bold text-lg">0.001%</div>
                  <div className="text-gray-300 text-sm">Avg Slippage</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                  <div className="text-white font-bold text-lg">0.04%</div>
                  <div className="text-gray-300 text-sm">Trading Fee</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CircuitBoard className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
                The Porbi Innovation
              </h3>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Porbi revolutionizes AMM design by extending concentrated
                  liquidity to n-dimensional spherical geometry, where tick
                  boundaries are defined as orbits around the equal-price point.
                </p>
                <p className="text-xl font-medium text-white drop-shadow-lg">
                  Unlike traditional 2D approaches, even if one stablecoin
                  completely depegs, Porbi ticks continue trading other assets
                  at fair market prices, unlocking unprecedented capital
                  efficiency for multi-stablecoin pools.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-5 h-5 text-black" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Multi-Dimensional
                </h4>
                <p className="text-gray-300 text-sm">
                  Spherical geometry enables trading across unlimited
                  stablecoins
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Depeg Resilient
                </h4>
                <p className="text-gray-300 text-sm">
                  Continues functioning even with complete asset depegging
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Activity className="w-5 h-5 text-black" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Maximum Efficiency
                </h4>
                <p className="text-gray-300 text-sm">
                  Exponentially scaling capital efficiency with more assets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  const ThreeDSection = () => (
    <section
      ref={(el) => (sectionsRef.current[2] = el)}
      className="min-h-screen py-5 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
            3D Architecture
          </Badge>
          <h2 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Spherical AMM Engine
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionary n-dimensional spherical caps with toroidal
            optimization for unprecedented multi-stablecoin liquidity
            management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left - 3D Visualization */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-900/30 border border-white/10 backdrop-blur-sm shadow-xl">
              <div className="relative w-full h-full">
                <img
                  src="/orbital-gif-2.gif"
                  alt="3D Orbital animation"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 rounded-xl"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
                    3D Visualization
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Technical Details */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                    <CircuitBoard className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      Core Formula
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      N-Dimensional Sphere
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/40 rounded-lg p-4 font-mono text-lg text-white mb-4 border border-white/10 shadow-inner backdrop-blur-sm">
                  ||r⃗ - x⃗||² = r²
                </div>
                <p className="text-gray-300 leading-relaxed">
                  N-dimensional sphere constraint ensuring mathematical elegance
                  and computational efficiency for multi-asset pools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      Tick Boundaries
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Spherical Caps
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Planes orthogonal to equal-price vector creating nested
                  spherical caps of varying liquidity density.
                </p>
                <div className="bg-black/40 rounded-lg p-4 font-mono text-lg text-white border border-white/10 shadow-inner backdrop-blur-sm">
                  x⃗ · v⃗ = k
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      Efficiency Scaling
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Virtual Reserves
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner text-center">
                    <div className="text-2xl font-bold text-white">15x</div>
                    <div className="text-xs text-gray-300">$0.90 range</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner text-center">
                    <div className="text-2xl font-bold text-white">150x</div>
                    <div className="text-xs text-gray-300">$0.99 range</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Virtual reserves enable exponential efficiency scaling with
                  tighter price ranges and more supported assets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );

  const InterfaceSection = () => (
    <section
      ref={(el) => (sectionsRef.current[3] = el)}
      className="min-h-screen py-5 relative"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
            User Experience
          </Badge>
          <h2 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Intuitive Interface
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional-grade trading interface designed for both DeFi veterans
            and newcomers seeking maximum efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left - Interface Preview */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-[16/10] bg-gray-900/50 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                      src="/Screenshot 2025-09-27 184441.png"
                      alt="Interface Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-white/10 border-white/20 text-white backdrop-blur-sm shadow-lg">
                        Live Interface Preview
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right - Feature Steps */}
          <div className="space-y-6">
            {[
              {
                number: "1",
                title: "Connect & Select",
                description:
                  "Connect your wallet and choose from thousands of supported stablecoins with real-time price feeds.",
                icon: Wallet,
              },
              {
                number: "2",
                title: "Optimize Routes",
                description:
                  "Advanced routing algorithm finds optimal paths through multi-dimensional tick boundaries.",
                icon: Target,
              },
              {
                number: "3",
                title: "Execute & Earn",
                description:
                  "Execute trades with minimal slippage or provide liquidity to earn competitive yields.",
                icon: TrendingUp,
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-black font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <step.icon className="w-5 h-5 text-white" />
                        <h3 className="text-lg font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-6">
              <Button className="w-full bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 group shadow-xl">
                <span>Launch Porbi Interface</span>
                <ArrowUpRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Activity,
              title: "Real-time Analytics",
              description: "Live market data and performance metrics",
            },
            {
              icon: Shield,
              title: "Secure Trading",
              description: "Audited smart contracts and battle-tested security",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Optimized for speed with minimal gas costs",
            },
            {
              icon: Target,
              title: "Precise Execution",
              description: "Advanced algorithms for optimal trade routing",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="py-16 border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-15 h-15 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <img
                  src="/image-removebg-preview (4).png"
                  alt="Orbital animation"
                  className="w-30 h-30 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
                  Porbi
                </h1>
                <div className="text-xs text-gray-400 relative inline-block">
                  Next-Gen AMM
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-60 rounded-full"></span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Revolutionizing DeFi with multi-dimensional concentrated liquidity
              for unprecedented capital efficiency in stablecoin trading.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
            <div className="space-y-3">
              {["Launch App", "Documentation", "Whitepaper", "Audits"].map(
                (link) => (
                  <div key={link}>
                    <Button
                      variant="link"
                      className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                    >
                      {link}
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Community</h4>
            <div className="space-y-3">
              {["Discord", "Twitter", "Telegram", "GitHub"].map((link) => (
                <div key={link}>
                  <Button
                    variant="link"
                    className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                  >
                    {link}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Porbi Protocol. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Button
                variant="link"
                className="text-gray-300 hover:text-white p-0 h-auto font-normal text-sm"
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                className="text-gray-300 hover:text-white p-0 h-auto font-normal text-sm"
              >
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <InteractiveGrid />
      <NavBar />
      <HeroSection />
      <TechnologySection />
      <ThreeDSection />
      <InterfaceSection />
      <Footer />
    </div>
  );
};

const App = () => {
  return <PorbiLanding />;
};
export default App;
