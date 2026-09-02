import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Video, Code, Film, Wand2, Globe, ArrowRight, CheckCircle2, Check, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Dialog from '@radix-ui/react-dialog';

const WhatsAppIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Services = () => {
  const featuredServices = [
    {
      icon: Code,
      title: 'Websites & Web Design',
      description: 'High-converting, fast, responsive websites designed for credibility, SEO, and lead generation.',
      points: ['Business websites', 'Landing pages', 'Online stores', 'UI/UX design'],
      cta: 'View Website Services',
      link: '/services/websites',
      delay: 0.1
    },
    {
      icon: Palette,
      title: 'Logo & Brand Identity',
      description: 'Strategic visual identities that define your market position and leave a lasting impression.',
      points: ['Logo Design', 'Brand Guidelines', 'Visual Strategy', 'Rebranding'],
      cta: 'View Branding Services',
      link: '/services/branding',
      delay: 0.2
    },
    {
      icon: Video,
      title: 'Logo Animations',
      description: 'Dynamic motion graphics that bring your static assets to life and capture attention instantly.',
      points: ['2D/3D Animation', 'Logo Reveals', 'Explainer Videos', 'Motion Graphics'],
      cta: 'View Animation Services',
      link: '/services/animations',
      delay: 0.3
    },
    {
      icon: Film,
      title: 'Video Editing & Content Creation',
      description: 'Professional post-production storytelling that turns raw footage into cinematic masterpieces.',
      points: ['Social Media Reels', 'YouTube Editing', 'Corporate Video', 'Color Grading'],
      cta: 'View Editing Services',
      link: '/services/video-editing',
      delay: 0.4
    },
    {
      icon: Wand2,
      title: 'Graphic & Social Media Design',
      description: 'Eye-catching visuals designed to stop the scroll and engage your target audience effectively.',
      points: ['Social Posts', 'Marketing Flyers', 'Brochures', 'Infographics'],
      cta: 'View Design Services',
      link: '/services/design',
      delay: 0.5
    },
    {
      icon: Globe,
      title: 'AI Automations & Tech Solutions',
      description: 'Future-proof your business with cutting-edge AI tools and automated workflow solutions.',
      points: ['Chatbots', 'Workflow Automation', 'AI Consulting', 'Custom Solutions'],
      cta: 'View AI Services',
      link: '/services/ai-tech',
      delay: 0.6
    }
  ];

  const serviceCatalog = {
    'Graphics Design': [
      "Logo Design", "Brand Identity", "Business Cards", "Letterheads", "Envelopes", 
      "Brand Guidelines", "Brochures", "Flyers", "Posters", "Banners", 
      "Social Media Graphics", "Infographics", "Packaging Design", "Menu Design", "Catalog Design", 
      "E-book Covers", "Presentation Design", "T-shirt Design", "Signage", "Stickers"
    ],
    'Animation & Motion': [
      "2D Animation", "3D Animation", "Motion Graphics", "Logo Animation", "Explainer Videos", 
      "Whiteboard Animation", "Lottie Animations", "Product Animation", "Character Animation"
    ],
    'Programming & Tech': [
      "Website Development", "E-commerce Stores", "Web Applications", "Mobile Apps", "CMS Development", "API Integration"
    ],
    'Video Editing': [
      "Corporate Videos", "Social Media Reels", "YouTube Video Editing", "Wedding Video Editing", "Documentary Editing", 
      "Music Videos", "Real Estate Videos", "Commercial Ads", "Color Grading"
    ]
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title> Digital Agency Services UK | Web Design, Branding & Development – Maxterz</title>
        <meta name="description" content="Explore Maxterz’s digital agency services including web design, branding, animation, video editing, and AI solutions. Built for startups and growing businesses across the UK." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-4 px-4 bg-white overflow-hidden">
        <div className="container mx-auto relative z-10">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

           <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-6 border border-blue-100">
              Our Expertise
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
              Services That <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Scale Your Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-6xl mx-auto font-normal leading-relaxed">
               Comprehensive digital services designed to help businesses grow, scale, and look credible online - combining creative execution with practical strategy.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay }}
                whileHover={{ y: -12 }}
                className="group relative h-full min-h-[550px]"
              >
                <Link to={service.link} className="block h-full">
                  <div className="h-full bg-gradient-to-br from-[#1044ff] to-[#0020bf] p-8 md:p-10 rounded-[2.5rem] shadow-2xl hover:shadow-[0_20px_50px_rgba(16,68,255,0.25)] transition-all duration-300 relative overflow-hidden flex flex-col border border-white/20">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="mb-8 inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md w-fit group-hover:bg-gradient-to-r group-hover:from-[#eb7444] group-hover:to-[#e05220] transition-all duration-300 border border-white/20 shadow-lg">
                      <service.icon size={32} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/80 mb-8 font-light leading-relaxed text-[15px]">
                      {service.description}
                    </p>

                    <ul className="mb-8 space-y-4 flex-grow">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-sm text-white/90">
                           <CheckCircle2 className="w-5 h-5 mr-3 text-[#eb7444] flex-shrink-0 mt-0.5" />
                           <span className="font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto relative z-10">
                      <span className="inline-flex items-center justify-center w-full py-4 px-6 rounded-full bg-white text-[#1044ff] font-bold text-sm shadow-lg group-hover:bg-[#eb7444] group-hover:text-white transition-all duration-300 group-hover:scale-[1.02]">
                        {service.cta} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* New CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 px-6 bg-gray-50 rounded-3xl max-w-4xl mx-auto border border-gray-100 shadow-sm mb-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Not sure which service you need?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tell us what you're trying to achieve, and we'll recommend the right solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Reuse the Contact Dialog from Hero */}
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="lg" className="rounded-full px-8 text-lg shadow-lg">
                    Talk to an expert
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                  <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl">
                    <div className="flex flex-col space-y-4 text-center">
                      <Dialog.Title className="text-2xl font-bold leading-none tracking-tight">
                        Let’s talk
                      </Dialog.Title>
                      <Dialog.Description className="text-muted-foreground mb-4">
                        Choose the easiest way to connect.
                      </Dialog.Description>

                      <div className="grid gap-4">
                        <a
                          href="https://wa.me/447375874706"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl border-2 border-green-100 bg-green-50 hover:bg-green-100 hover:border-green-300 transition-all group"
                        >
                          <div className="bg-[#25D366] p-2 rounded-full text-white mr-4">
                            <WhatsAppIcon size={24} className="fill-current" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-green-700">Chat with us on WhatsApp</h3>
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Fastest response</span>
                          </div>
                        </a>

                        <a
                          href="https://calendly.com/maxterz-info/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-xl border-2 border-blue-100 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all group"
                        >
                          <div className="bg-[#1044ff] p-2 rounded-full text-white mr-4">
                            <Calendar size={24} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-700">Book a free strategy call</h3>
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">30-minute consultation</span>
                          </div>
                        </a>

                        <Link
                          to="/contact"
                          onClick={handleLinkClick}
                          className="flex items-center p-4 rounded-xl border-2 border-orange-100 bg-orange-50 hover:bg-orange-100 hover:border-orange-300 transition-all group"
                        >
                          <div className="bg-[#eb7444] p-2 rounded-full text-white mr-4">
                            <Mail size={24} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-orange-700">Send us your project details</h3>
                            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Get a personalised quote by email</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <div className="h-4 w-4">✕</div>
                      <span className="sr-only">Close</span>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-lg border-2 border-[#1044ff] text-[#1044ff] hover:bg-[#1044ff] hover:text-white">
                <Link to="/contact">
                  Send project details
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Service Catalog */}
      {/*
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-16"
          >
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Complete Service Catalog</h2>
             <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Explore our extensive range of specialized creative and technical services.</p>
          </motion.div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 border-4 border-[#eb7444] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1044ff] via-[#eb7444] to-[#1044ff]" />
            
            <Tabs defaultValue="Graphics Design" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4 mb-12 bg-transparent p-0 h-auto">
                {Object.keys(serviceCatalog).map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="rounded-full py-4 font-bold transition-all text-sm md:text-base border-2 border-white
                      bg-[#1044ff] text-white
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#eb7444] data-[state=active]:to-[#e05220] 
                      data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(serviceCatalog).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-0 focus-visible:outline-none">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {items.map((item, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.03 }}
                        className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-lg flex items-center gap-3 border border-gray-200 
                                   transition-all duration-300 cursor-default group hover:bg-[#1044ff] hover:border-[#1044ff]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Check size={18} className="text-[#1044ff] stroke-[3px] transition-colors" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm group-hover:text-white transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
              <Button 
                asChild 
                size="lg" 
                className="w-full md:w-auto px-10 h-14 text-lg bg-white text-[#eb7444] border-2 border-[#eb7444] hover:bg-[#eb7444] hover:text-white rounded-full transition-all"
              >
                <Link to="/portfolio">Check out our work</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="w-full md:w-auto px-10 h-14 text-lg bg-[#1044ff] text-white border-2 border-[#1044ff] hover:bg-[#0020bf] rounded-full shadow-lg shadow-blue-500/20"
              >
                <Link to="/contact">Get in touch now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>*/}
    </>
  );
};

export default Services;