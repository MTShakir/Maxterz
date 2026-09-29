'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, ValidationError } from '@formspree/react';

const WhatsAppIcon = ({ className, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const Contact = () => {
  const [state, handleSubmit] = useForm("xqarozbd");

  if (state.succeeded) {
      return (
        <section className="py-24 px-4 bg-white min-h-[80vh] flex items-center justify-center">
             <div className="text-center">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Send className="text-green-600 w-10 h-10" />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Received!</h2>
                 <p className="text-xl text-gray-500 max-w-lg mx-auto mb-8">
                     Thanks for reaching out! We'll get back to you within 24 hours.
                 </p>
                 <Button asChild onClick={() => window.location.reload()}>
                     <a href="/contact">Send Another Message</a>
                 </Button>
             </div>
        </section>
      );
  }

  return (
    <>
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-4 border-2 border-[#1044ff]">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Let's Build Something <span className="bg-gradient-to-r from-[#1044ff] to-[#0020bf] bg-clip-text text-transparent">Amazing</span></h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Ready to elevate your brand? We're here to help you succeed.</p>

            <div className="mt-8 flex flex-col items-center gap-4">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-2 border-white rounded-full h-14 px-8 text-lg shadow-xl shadow-green-500/20 w-full sm:w-auto">
                    <a href="https://wa.me/447375874706" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon size={24} className="mr-2 fill-current" />
                        Contact us on WhatsApp
                        <span className="ml-3 text-xs bg-white/20 px-2 py-1 rounded text-white font-bold uppercase tracking-wider">Quick Responses</span>
                    </a>
                </Button>

                <Button asChild size="lg" className="bg-gradient-to-r from-[#eb7444] to-[#e05220] hover:opacity-90 text-white border-2 border-white rounded-full h-14 px-8 text-lg shadow-xl shadow-orange-500/20 w-full sm:w-auto">
                    <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                        <Calendar size={24} className="mr-2" />
                        Book a free Consultation meeting
                    </a>
                </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form Section */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#1044ff] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1044ff]/5 rounded-bl-full -mr-8 -mt-8" />

                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                   <MessageSquare className="text-[#1044ff]" /> Send a Message
                </h2>
                <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                       <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                       <input
                         type="text"
                         id="name"
                         name="name"
                         required
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors"
                         placeholder="John Doe"
                       />
                       <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                     </div>
                     <div>
                       <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         required
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors"
                         placeholder="john@example.com"
                       />
                       <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                       <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                       <input
                         type="tel"
                         id="phone"
                         name="phone"
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors"
                         placeholder="+44 ..."
                       />
                       <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
                     </div>
                     <div>
                       <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-2">Interested In *</label>
                       <select
                         id="service"
                         name="service"
                         required
                         className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors appearance-none"
                       >
                         <option value="">Select Service...</option>
                         <option value="Web Development">Web Development</option>
                         <option value="Branding">Branding</option>
                         <option value="Animation">Animation</option>
                         <option value="Video Editing">Video Editing</option>
                         <option value="Other">Other</option>
                       </select>
                       <ValidationError prefix="Service" field="service" errors={state.errors} className="text-red-500 text-xs mt-1" />
                     </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your goals..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <Button type="submit" size="lg" disabled={state.submitting} className="w-full h-14 text-lg rounded-2xl shadow-xl shadow-blue-500/20">
                    {state.submitting ? 'Sending...' : 'Send Message'} <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8 flex flex-col">
              <div className="bg-gradient-to-br from-[#1044ff] to-[#0020bf] rounded-3xl shadow-2xl p-10 text-white border-2 border-white flex-grow">
                <h2 className="text-3xl font-bold mb-8">Contact Info</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><MapPin size={28} /></div>
                    <div><h3 className="font-bold text-xl mb-1">Visit Us</h3><p className="text-white/80 font-light text-lg">128 City Road,<br/>London EC1V 2NX</p></div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><Phone size={28} /></div>
                    <div><h3 className="font-bold text-xl mb-1">Call Us</h3><p className="text-white/80 font-light text-lg">+44 7375 874706</p></div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><Mail size={28} /></div>
                    <div><h3 className="font-bold text-xl mb-1">Email Us</h3><p className="text-white/80 font-light text-lg">info@maxterz.co.uk</p></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-2 h-64 border-2 border-gray-100 overflow-hidden">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0897%2C51.5279%2C-0.0857%2C51.5299&layer=mapnik&marker=51.5289%2C-0.0877"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1.2rem' }}
                  loading="lazy"
                  title="MAXTERZ Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;