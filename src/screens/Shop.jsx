'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Shop = () => {
  const { toast } = useToast();

  const handleNotify = () => {
    toast({
      title: "You're on the list!",
      description: "We'll notify you as soon as the shop launches.",
    });
  };

  return (
    <>
      <section className="min-h-[85vh] flex items-center justify-center py-24 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#1044ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#eb7444]/5 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-[#1044ff] to-[#0020bf] mb-10 shadow-2xl border-4 border-white transform rotate-3">
              <Rocket size={48} className="text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Shop Coming <span className="bg-gradient-to-r from-[#eb7444] to-[#e05220] bg-clip-text text-transparent">Soon</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              We're crafting a premium collection of design templates, assets, and exclusive products to elevate your creative workflow.
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 border-2 border-[#1044ff] max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1044ff] to-[#0020bf]" />

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get Early Access
              </h2>
              <p className="text-gray-500 mb-8">
                Join the waitlist to receive exclusive launch discounts and a free resource pack.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <input
                   type="email"
                   placeholder="Enter your email address"
                   className="px-6 py-3 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#1044ff] focus:outline-none w-full sm:w-auto flex-grow"
                 />
                 <Button
                  onClick={handleNotify}
                  size="lg"
                  className="rounded-2xl shadow-lg shadow-blue-500/20"
                >
                  <Mail className="mr-2" size={20} />
                  Notify Me
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
               {[
                 { title: 'Templates', desc: 'Premium design files' },
                 { title: 'Assets', desc: '3D models & vectors' },
                 { title: 'Merch', desc: 'Exclusive branded gear' }
               ].map((item, i) => (
                 <div key={i} className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 flex items-center justify-between">
                    <div className="text-left">
                       <p className="font-bold text-gray-900 text-lg">{item.title}</p>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Lock size={20} className="text-gray-300" />
                 </div>
               ))}
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Shop;