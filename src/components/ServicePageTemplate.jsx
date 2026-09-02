import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicePageTemplate = ({ title, description, packages, process, projects, heroImage, seo, schema }) => {
  return (
    <>
      <Helmet>
        <title>{seo?.title || `${title} - Premium Services | MAXTERZ`}</title>
        <meta name="description" content={seo?.description || description} />
        {seo?.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seo?.title || title} />
        <meta property="og:description" content={seo?.description || description} />
        {seo?.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}
        {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || title} />
        <meta name="twitter:description" content={seo?.description || description} />
        {seo?.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

        {/* Schema Markup */}
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
              className="w-full h-full object-cover" 
              alt={`${title} creative services and solutions`} 
              src={heroImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"} 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#1044ff]/90 to-[#0020bf]/90 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <Button asChild size="lg" className="rounded-2xl bg-white text-[#1044ff] hover:bg-gray-100 hover:text-[#0020bf] font-bold px-8 h-14 text-lg">
               <Link to="/contact">Get A Custom Quote</Link>
             </Button>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-gray-500">Transparent pricing for premium results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl bg-white border ${index === 1 ? 'border-[#1044ff] shadow-xl scale-105 z-10' : 'border-gray-200 shadow-lg'} flex flex-col`}
              >
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#eb7444] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-[#1044ff] mb-6">{pkg.price}</div>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">{pkg.desc}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <Check className="w-5 h-5 text-[#eb7444] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button asChild className={`w-full rounded-2xl ${index === 1 ? 'bg-gradient-to-r from-[#1044ff] to-[#0020bf]' : 'bg-gray-900'}`}>
                  <Link to="/contact">Select Plan</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-500">A streamlined workflow designed for efficiency and excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative text-center group">
                 <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1044ff]/10 to-[#0020bf]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <span className="text-2xl font-bold text-[#1044ff]">{index + 1}</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                 
                 {/* Connector Line (Hidden on Mobile/Last Item) */}
                 {index !== process.length - 1 && (
                   <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 to-transparent z-[-1]" />
                 )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Projects / CTA */}
      <section className="py-24 px-4 bg-gray-900 text-white rounded-t-3xl mt-12">
         <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Recent {title} Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               {projects.map((proj, i) => (
                 <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video bg-gray-800">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                      alt={`Featured ${title} project titled ${proj.title}`} 
                      loading="lazy"
                      src={proj.image} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="font-bold text-lg">{proj.title}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] rounded-2xl p-12 max-w-4xl mx-auto shadow-2xl">
               <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
               <p className="text-white/80 mb-8 text-lg">Let's turn your ideas into a masterpiece. Contact us today for a free consultation.</p>
               <Button asChild size="lg" className="bg-white text-[#1044ff] hover:bg-gray-100 rounded-2xl px-10 h-12 text-base font-bold">
                 <Link to="/contact">Get Started Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
               </Button>
            </div>
         </div>
      </section>
    </>
  );
};

export default ServicePageTemplate;