'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/libs/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { FaInstagram } from "react-icons/fa";
import Image from 'next/image';
import { Twitter, Linkedin, Github, ArrowRight, Mail, Calendar, MapPin, ExternalLink, X } from 'lucide-react'; // Added X icon
import { Menu } from 'lucide-react';
import { Users,Code,Globe, Clock} from 'lucide-react';
import { Zap } from 'lucide-react';
import { Package,Database } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';


const PostmanCommunityWebsite = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'API Development'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Color palette with more vibrant and diverse colors
  const colors = {
    primary: '#FF7B29', // Vibrant orange
    secondary: '#6347FF', // Purple
    accent: '#15BFFD', // Cyan
    neutral: '#1E293B', // Dark slate blue
    darkBg: '#0F172A', // Darker slate
    success: '#0CD68A', // Green
    warning: '#FFD60A', // Yellow
  };
 
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'communitySubscribers'), {
        ...formData,
        timestamp: new Date(),
      });
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        interest: 'API Development'
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };
  const float = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Animated particle background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${colors.primary}15 2px, transparent 0), 
                            radial-gradient(circle at 75px 75px, ${colors.accent}15 2px, transparent 0),
                            radial-gradient(circle at 125px 125px, ${colors.secondary}15 2px, transparent 0)`,
          backgroundSize: '150px 150px'
        }}></div>
      </div>
      
      {/* Header with motion */}
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                <img src="postmanlogo.png" alt="" />
              </div>
              <div className="text-xl font-bold">
                <span>Postman Commmunity Pune</span>
                
              </div>
            </motion.div>
            
            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Events", "Speakers", "Community"].map((item, index) => (
                <motion.a 
                  key={index}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    color: colors.primary,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <a href="#community">
            <motion.button 
              className="hidden md:block bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 123, 41, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              POSTMAN COMMUNITY DAY 2025
            </motion.button>
            </a>
            
            {/* Mobile menu button */}
            <motion.button 
              onClick={toggleMobileMenu} 
              className="md:hidden text-white p-2 rounded-lg bg-slate-800"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
          
          {/* Mobile menu dropdown with animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="md:hidden mt-4 py-4 bg-slate-800/90 backdrop-blur-lg rounded-lg border border-slate-700 shadow-2xl"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {["Home", "About", "Events", "Speakers", "Community"].map((item, index) => (
                  <motion.a 
                    key={index}
                    href={`#${item.toLowerCase()}`} 
                    className="block px-4 py-2 text-gray-300 hover:bg-slate-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="px-4 pt-2 mt-2 border-t border-slate-700">
                  <motion.button 
                    className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Us
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero section with animations */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block px-6 py-2 rounded-full bg-slate-800/80 text-orange-500 font-medium mb-6 border border-orange-500/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="animate-pulse mr-2 inline-block">●</span> Next Event:Coming Sooner than your Pizza
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="block">Postman</span> 
                <span className="block">Community</span>
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-transparent bg-clip-text">Pune</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Connect with API enthusiasts, learn best practices, and build the future of API development together.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <a href="#community">
                <motion.button 
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 123, 41, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Community 
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: 5 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "mirror", 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
                </a>
                <a href="#community">
                <motion.button 
                  className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(30, 41, 59, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Events
                </motion.button>
                </a>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex items-center space-x-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              >
                <div className="flex -space-x-3">
                  <motion.img 
                    src="shrawan.jpg" 
                    alt="Member" 
                    className="w-8 h-8 rounded-full border-2 border-slate-900"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                  <motion.img 
                    src="sachin.jpg" 
                    alt="Member" 
                    className="w-8 h-8 rounded-full border-2 border-slate-900"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                  <motion.img 
                    src="aditya.jpg" 
                    alt="Member" 
                    className="w-8 h-8 rounded-full border-2 border-slate-900"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 border-2 border-slate-900 flex items-center justify-center text-xs"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    +2k
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm">Join over <span className="text-white font-semibold">2000+</span> community members</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <div className="relative mx-auto w-full max-w-lg">
                {/* Animated decorative elements */}
                <motion.div 
                  className="absolute -top-12 -left-12 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div 
                  className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
                
                {/* Main code UI with floating animation */}
                <motion.div 
                  className="relative"
                  variants={float}
                  initial="initial"
                  animate="animate"
                >
                  <div className="bg-slate-800/90 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
                    <div className="bg-slate-900 p-3 border-b border-slate-700 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto text-sm text-gray-400">postman-community-pune.json</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
                      <pre className="text-sm font-mono">
                        <motion.span 
                          className="text-purple-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >{"{"}</motion.span>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          <span className="text-green-400">  "community"</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Postman Pune"</span><span className="text-gray-400">,</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.0 }}
                        >
                          <span className="text-green-400">  "members"</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-blue-400">2000</span><span className="text-gray-400">,</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 }}
                        >
                          <span className="text-green-400">  "focus"</span>
                          <span className="text-gray-400">: [</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <span className="text-orange-300">    "API Development"</span><span className="text-gray-400">,</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.3 }}
                        >
                          <span className="text-orange-300">    "Testing"</span><span className="text-gray-400">,</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                        >
                          <span className="text-orange-300">    "Collaboration"</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          <span className="text-gray-400">  ]</span><span className="text-gray-400">,</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 }}
                        >
                          <span className="text-green-400">  "fastest-growing-community" :</span>
                          <span className="text-blue-400"> true</span>,
                        </motion.div>
                        
                       
                       
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.0 }}
                        >
                          <span className="text-green-400">  "join"</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-blue-400">true</span>
                        </motion.div>
                        <motion.span 
                          className="text-purple-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.1 }}
                        >{"}"}</motion.span>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Tech patterns */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-purple-600"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        ></motion.div>
      </section>

      {/* Partners/Sponsors section with animation */}
      <section className="py-12 bg-slate-900/50">
  <div className="container mx-auto px-4">
    <motion.h2 
      className="text-3xl md:text-4xl font-bold mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Our <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Partners</span>
    </motion.h2>
    
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        { name: "DigitalOcean", logo: "/Digitalocean.png" },
        { name: "Kotlin", logo: "kotlin.svg" },
        { name: "Google Developers", logo: "/gdgp.png" },
        { name: "Girls in Tech", logo: "/girls.png" },
        { name: "Spheron", logo: "/spheron.png" },
        { name: "DevDisplay", logo: "/devdisplay.png" },
        { name: "MLH", logo: "/mlh.png" },
        { name: "Pune DAO", logo: "/punedao.png" }
      ].map((partner, index) => (
        <motion.div
          key={index}
          className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex items-center justify-center h-32"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={partner.logo} 
            alt={partner.name}
            className="max-h-16 max-w-full object-contain"
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* About section with animations */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative mx-auto max-w-lg">
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {[
                    { icon: <Users className="w-6 h-6" />, title: "2000+", text: "Community Members", color: "orange" },
                    { icon: <Calendar className="w-6 h-6" />, title: "45+", text: "Events Organized", color: "blue" },
                    { icon: <Code className="w-6 h-6" />, title: "20+", text: "Workshops", color: "purple" },
                    { icon: <Globe className="w-6 h-6" />, title: "5+", text: "Global Partners", color: "green" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg"
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      whileInView={{
                        opacity: [0, 1],
                        y: [30, 0],
                        transition: { delay: index * 0.1 + 0.3 }
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className={`w-12 h-12 mb-4 bg-${item.color}-500/20 rounded-xl flex items-center justify-center text-${item.color}-500`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          backgroundColor: `rgba(${item.color === 'orange' ? '255, 123, 41' : item.color === 'blue' ? '21, 191, 253' : item.color === 'purple' ? '99, 71, 255' : '12, 214, 138'}, 0.3)` 
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-500 font-medium mb-4 border border-orange-500/20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                About Us
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-orange-100 to-white text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Building the API Community in Pune
              </motion.h2>
              
              <motion.p 
  className="text-gray-300 mb-6"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4 }}
>
  We at Postman Community Pune are passionate about API education, collaboration, and innovation. Our goal is to bring together developers, students, and professionals to learn, build, and grow in the API ecosystem.
</motion.p>

<motion.p 
  className="text-gray-300 mb-8"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5 }}
>
  Through workshops, hackathons, and hands-on coding sessions, we provide a platform for enhancing API skills, networking with industry experts, and staying updated with the latest trends in API development. Whether you're a beginner or an experienced developer, our community is here to support and inspire you on your journey.
</motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { title: "Knowledge Sharing", text: "Learn from industry experts and share your expertise with others" },
                  { title: "Career Growth", text: "Network with peers and explore new career opportunities" },
                  { title: "Hands-on Experience", text: "Practical workshops and hackathons to apply your skills" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ x: 5 }}
                  >
                   <motion.div 
                      className="mt-1 mr-4 text-orange-500 bg-orange-500/10 p-1 rounded-full"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 123, 41, 0.2)" }}
                    >
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.button 
                className="mt-8 bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events section with animations */}
      {/* <section id="events" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-500 font-medium mb-4 border border-orange-500/20"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Upcoming Events
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join Our Next <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">API Meetups</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Expand your knowledge, connect with like-minded professionals, and stay at the cutting edge of API development with our regular events.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "API Development Workshop",
                date: "April 27, 2025",
                time: "6:00 PM - 8:30 PM",
                location: "Tech Park, Pune",
                attendees: 120,
                color: "orange"
              },
              {
                title: "API Testing Hackathon",
                date: "May 15, 2025",
                time: "10:00 AM - 5:00 PM",
                location: "Innovation Hub, Pune",
                attendees: 85,
                color: "purple",
                featured: true
              },
              {
                title: "API Security Conference",
                date: "June 8, 2025",
                time: "9:00 AM - 4:00 PM",
                location: "Cyber Center, Pune",
                attendees: 150,
                color: "blue"
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-slate-800 to-slate-900 border ${event.featured ? 'border-orange-500/50' : 'border-slate-700'} rounded-2xl overflow-hidden shadow-lg ${event.featured ? 'shadow-orange-500/10' : ''}`}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                whileInView={{
                  opacity: [0, 1],
                  y: [30, 0],
                  transition: { delay: index * 0.1 }
                }}
                viewport={{ once: true }}
              >
                {event.featured && (
                  <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-center text-xs py-1">
                    FEATURED EVENT
                  </div>
                )}
                <div className="p-6">
                  <div className={`w-12 h-12 mb-4 bg-${event.color}-500/20 rounded-xl flex items-center justify-center text-${event.color}-500`}>
                    {index === 0 ? <Code className="w-6 h-6" /> : index === 1 ? <Zap className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  <motion.button 
                    className={`w-full bg-gradient-to-r ${index === 1 ? 'from-orange-500 via-red-500 to-purple-600 text-white' : 'from-slate-700 to-slate-800 text-gray-300 border border-slate-600'} px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {index === 1 ? 'Register Now' : 'Learn More'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              className="bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Upcoming Events
            </motion.button>
          </motion.div>
        </div>
      </section> */}

      {/* Speakers section with animations */}
      {/* Speakers Section */}
      <section id="speakers" className="py-20">
      <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-500 font-medium mb-4 border border-orange-500/20"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Featured Speakers
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Learn From <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Industry Experts</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our events feature some of the most knowledgeable professionals in API development and testing.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Rohan Khamkar",
                role: "Senior Solutions Architect",
                company: "Digital Ocean",
                photo: "/rohankhamkar.png",
              },
              {
                name: "Arun Nair",
                role: "Senior Solutions Architect",
                company: "Digital Ocean",
                photo: "/arunair.png",
              },
              {
                name: "Nayan Chandak",
                role: "Data Scientist",
                company: "Walters Kluwer",
                photo: "nayan.png",
              },
              {
                name: "Akanksha Kapoor",
                role: "Customer Success Lead",
                company: "Digital Ocean",
                photo: "akanksha.png",
                
              }
            ].map((speaker, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 ${speaker.featured ? 'ring-2 ring-orange-500/50' : 'border border-slate-700'}`}>
                  {speaker.featured && (
                    <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-center text-xs py-1 font-semibold">
                      KEYNOTE SPEAKER
                    </div>
                  )}
                  
                  <div className="relative">
                    <div className="overflow-hidden">
                      <img 
                        src={speaker.photo} 
                        alt={speaker.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">{speaker.name}</h3>
                      <p className="text-orange-400 text-sm font-medium">{speaker.role}</p>
                      <p className="text-gray-300 text-xs">{speaker.company}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-slate-700 bg-slate-800/50 mt-auto">
                    <div className="flex justify-between items-center">
                      <motion.button 
                        className="text-xs bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 inline-flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Details
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
{/* Team Section */}
<section id="team" className="py-20 bg-slate-900/50">
  <div className="container mx-auto px-4">
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-500 font-medium mb-4 border border-orange-500/20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Core Team
      </motion.div>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Meet Our <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Leadership</span>
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        The passionate individuals driving the Postman Community Pune forward.
      </motion.p>
    </motion.div>
    
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        {
          name: "Shrawan Saproo",
          role: "Organizer",
          bio: "Community Manager @Postman Community Pune",
          photo: "/shrawan.jpg",
          social: {
            twitter: "https://x.com/SaprooShrawan",
            linkedin: "https://www.linkedin.com/in/shrawan513/",
           instagram: "https://www.instagram.com/shrawansaproo/"
          }
        },
        {
          name: "Aditya Bisht",
          role: "Co-Organizer",
          bio: "Customer Success expert building community partnerships",
          photo: "/aditya.jpg",
          social: {
            twitter: "https://x.com/adityab894",
            linkedin: "https://www.linkedin.com/in/aditya894/",
            instagram: "https://www.instagram.com/aditya__894/"
          }
        },
        {
          name: "Sachin Parihar",
          role: "Co-Organizer",
          bio: "MERN stack developer specializing in API best practices",
          photo: "/sachin.jpg",
          social: {
            twitter: "https://x.com/Sheenu_exe   ",
            linkedin: "https://www.linkedin.com/in/sachin-parihar-008180264/",
            instagram: "https://www.instagram.com/sachinn.js/"
          }
        },
        {
          name: "Sarvadnya Bhagwat",
          role: "Growth Manager",
          bio: "Managing growth and community engagement",
          photo: "/sarvadnya.jpg",
          social: {
            twitter: "#",
            linkedin: "https://www.linkedin.com/in/sarvadnya-bhagwat-a119712a4/",
            instagram: "https://www.instagram.com/sarvadnyabt/"
          }
        },
        {
          name: "Atharva Wani",
          role: "Designer",
          bio: "Designing engaging experiences for the community",
          photo: "atharva.jpg",
          social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
          }
        },
        {
          name: "Kunal Gavit",
          role: "Social Media Manager",
          bio: "Managing social media presence and outreach",
          photo: "kunal.jpg",
          social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
          }
        }
      ].map((member, index) => (
        <motion.div
          key={index}
          className="relative group"
          variants={fadeInUp}
          whileHover={{ y: -10 }}
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
            <div className="relative aspect-square">
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-orange-500 text-sm">{member.role}</p>
              </div>
            </div>
            
            <div className="p-6 flex-grow">
              <p className="text-gray-300 mb-6">{member.bio}</p>
              
              <div className="flex space-x-4 mt-auto">
                <motion.a 
                  href={member.social.twitter}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href={member.social.linkedin}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href={member.social.instagram}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
      {/* Community section with animations */}
      <section id="community" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-500 font-medium mb-4 border border-orange-500/20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join Our Community
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Become Part of the <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">API Revolution</span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Join our growing community of developers, testers, and API enthusiasts. Share knowledge, collaborate on projects, and stay updated with the latest trends in API development.
              </motion.p>
              
              <motion.div 
                className="space-y-6 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, title: "Online Forums", text: "Engage in discussions with peers" },
                  { icon: <Code className="w-5 h-5" />, title: "Collaboration", text: "Work together on open-source projects" },
                  { icon: <Package className="w-5 h-5" />, title: "Resources", text: "Access exclusive learning materials" },
                  { icon: <Database className="w-5 h-5" />, title: "Job Board", text: "Find API-related career opportunities" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    variants={fadeInUp}
                    custom={index}
                  >
                    <motion.div 
                      className="mt-1 mr-4 text-orange-500 bg-orange-500/10 p-2 rounded-lg"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 123, 41, 0.2)" }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button 
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 123, 41, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Community 
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
                
                <motion.button 
                  className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>
                
                <motion.form 
  className="space-y-4"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4 }}
  onSubmit={handleSubmit}
>
  {submitSuccess ? (
    <motion.div 
      className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      Thank you for subscribing! We'll keep you updated about our community events.
    </motion.div>
  ) : (
    <>
      <div>
        <label className="block text-gray-400 mb-2 text-sm" htmlFor="name">Your Name</label>
        <input 
          type="text" 
          id="name" 
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-400 mb-2 text-sm" htmlFor="email">Email Address</label>
        <input 
          type="email" 
          id="email" 
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-400 mb-2 text-sm" htmlFor="interest">Primary Interest</label>
        <select 
          id="interest" 
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 appearance-none"
          value={formData.interest}
          onChange={handleInputChange}
        >
          <option>Volunteering</option>
          <option>Sponsorship</option>
          <option>Event related</option>
          <option>Other</option>
        </select>
        <div className="relative">
          <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 bottom-3 pointer-events-none" />
        </div>
      </div>
      
      <div className="pt-2">
        <motion.button 
          className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(255, 123, 41, 0.5)" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Subscribe to Updates'
          )}
        </motion.button>
      </div>
    </>
  )}
  
  <p className="text-gray-400 text-xs mt-4">
    By subscribing, you agree to our Privacy Policy and consent to receive updates from Postman Community Pune.
  </p>
</motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer with animations */}
      <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                <img src="postmanlogo.png" alt="" />
              </div>
              <div className="text-xl font-bold">
                <span>Postman Community Pune</span>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              A vibrant community of API enthusiasts in Pune, dedicated to knowledge sharing, collaboration, and advancing the API ecosystem.
            </p>
            
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.linkedin.com/company/postmanapipune/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#0A66C2" }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/postman_pune/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#E1306C" }}
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            {[
              { name: "About Us", link: "#about" },
              { name: "Events", link: "#events" },
              { name: "Speakers", link: "#speakers" },
              { name: "Resources", link: "#community" },
              { name: "Blog", link: "https://blog.postman.com/" },
              { name: "Resources", link: "https://learning.postman.com/docs/introduction/overview/" },
              { name: "Contact", link: "#community" }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href={item.link} 
                target={item.name === "Blog" ? "_blank" : "_self"}
                rel={item.name === "Blog" ? "noopener noreferrer" : ""}
                className="block text-gray-400 hover:text-orange-500 transition-colors"
                whileHover={{ x: 5 }}
                onClick={item.name !== "Blog" ? handleMobileLinkClick : undefined}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-gray-400">Pune, Maharashtra, India</p>
            <p className="text-gray-400">postmancommunitypune@gmail.com</p>
            <p className="text-gray-400">+91 7889564517</p>
            
            <div className="pt-4">
              <motion.a 
                href="mailto:postmancommunitypune@gmail.com"
                className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Postman Community Pune. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
      {/* Back to top button */}
      <motion.button 
        className="fixed bottom-8 right-8 bg-slate-800 border border-slate-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 hover:bg-orange-500 transition-colors duration-300"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default PostmanCommunityWebsite;
