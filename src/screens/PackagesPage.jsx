'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Calendar } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import PackageCard from '@/components/packages/PackageCard';
import OfferCard from '@/components/packages/OfferCard';
import PainPointCard from '@/components/packages/PainPointCard';

const PackagesPage = () => {
  const [oneTimePackages, setOneTimePackages] = useState([]);
  const [monthlyPackages, setMonthlyPackages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resOneTime, resMonthly, resOffers] = await Promise.all([
          supabase.from('packages_one_time').select('*').order('display_order', { ascending: true }),
          supabase.from('packages_monthly').select('*').order('display_order', { ascending: true }),
          supabase.from('packages_offers').select('*').eq('is_active', true).order('display_order', { ascending: true })
        ]);

        if (resOneTime.data) setOneTimePackages(resOneTime.data);
        if (resMonthly.data) setMonthlyPackages(resMonthly.data);
        if (resOffers.data) setOffers(resOffers.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    { question: "Can I customize a package to fit my needs?", answer: "Absolutely. Our packages are designed to cover the most common needs, but if you need specific tweaks, just let us know and we'll adjust the scope and price." },
    { question: "Are there long-term contracts for monthly packages?", answer: "No. All of our monthly packages operate on a rolling monthly basis. You can pause or cancel anytime without penalties." },
    { question: "How long does a typical startup package take to deliver?", answer: "Usually 2-4 weeks depending on the complexity of your requirements and how quickly you can provide feedback during the process." },
    { question: "Can I combine multiple services?", answer: "Yes, our team is equipped to handle comprehensive strategies spanning web, design, and marketing. We recommend booking a strategy call to align our services with your goals." },
    { question: "Will I have a dedicated point of contact?", answer: "Yes. Every client is assigned a dedicated account manager so you never have to juggle multiple freelancers or departments." },
    { question: "Do you offer revisions?", answer: "Yes! Every one-time package includes a set number of revision rounds. Monthly packages include ongoing revisions as part of your retainer." },
  ];

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-gray-50/50 pt-8 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 mt-12 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-standard-light">PACKAGES AND PRICING</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Clear Pricing. One Team. <br />
              <span className="text-[#1044ff]">Everything Your Business Needs.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              Stop juggling five different freelancers. Choose a fixed-price project or an ongoing monthly partnership, and let one unified agency handle your growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => scrollTo('one-time-projects')} variant="outline" className="rounded-full h-12 px-6 border-2">One-Time Projects</Button>
              <Button onClick={() => scrollTo('monthly-packages')} variant="outline" className="rounded-full h-12 px-6 border-2">Monthly Packages</Button>
              <Button onClick={() => scrollTo('custom-quote')} className="rounded-full h-12 px-6 bg-[#1044ff] hover:bg-[#0020bf] text-white">Get a Custom Quote</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — PAIN BRIDGE */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="badge-standard-light">SOUND FAMILIAR?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">The Way Most Businesses Buy Digital Services Is Broken.</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <PainPointCard message="Juggling multiple invoices from different freelancers." />
            <PainPointCard message="Unexpected final bills that blow way past your budget." />
            <PainPointCard message="Fragmented knowledge where your SEO team doesn't talk to your web dev." />
          </div>
          <div className="inline-block relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10"></div>
            <p className="bg-white px-6 font-bold text-xl text-gray-900 tracking-tight">Maxterz was built to solve exactly this...</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — ONE-TIME PACKAGES */}
      <section id="one-time-projects" className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="badge-standard-light">ONE-TIME PROJECTS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Start Strong with a Fixed-Price Package.</h2>
            <p className="text-lg text-gray-600">Perfect for foundational setups, redesigns, and launches.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#1044ff] w-10 h-10" /></div>
          ) : oneTimePackages.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No packages found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {oneTimePackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — MONTHLY PACKAGES */}
      <section id="monthly-packages" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="badge-standard-light">MONTHLY PACKAGES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ongoing Support, Without the Overhead.</h2>
            <p className="text-lg text-gray-600 mb-4">Dedicated resources scaling alongside your business.</p>
            <p className="text-sm font-bold text-[#eb7444]">All monthly packages can be cancelled any time. No penalties.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#1044ff] w-10 h-10" /></div>
          ) : monthlyPackages.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No packages found.</div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {monthlyPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 — CURRENT PROMOTIONS */}
      <section id="current-offers" className="py-24 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block border border-white/20 bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">ACTIVE OFFERS</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Current Promotions</h2>
            <p className="text-gray-400 text-sm">Offers cannot be combined. One offer per client.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-white w-10 h-10" /></div>
          ) : offers.length === 0 ? (
            <div className="text-center text-gray-400 py-10">Check back later for new promotions!</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {offers.map((offer) => (
                <OfferCard key={offer.id} {...offer} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6 — CUSTOM QUOTE */}
      <section id="custom-quote" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center bg-gray-50/50 p-10 md:p-16 rounded-[3rem] border border-gray-100">
          <span className="badge-standard-light">SOMETHING DIFFERENT?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Need a Package Built Around You?</h2>
          <p className="text-lg text-gray-600 mb-6">
            We understand that not every business fits neatly into a templated package. If you have unique requirements, legacy systems, or ambitious bespoke ideas, our team can scope it out.
          </p>
          <p className="text-lg text-gray-600 mb-10">
            From complex web apps to multi-channel international marketing campaigns, let's discuss exactly what success looks like for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-[#1044ff] hover:bg-[#0020bf]">
              <Link href="/contact">Get a Custom Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 border-2">
              <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 w-5 h-5" /> Book a Free Strategy Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="badge-standard-light">QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white px-6 rounded-2xl border border-gray-100 shadow-sm">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-[#1044ff] text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="py-24 px-4 bg-[#1044ff] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white">Not Sure Which Package Fits?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Book a 30-minute discovery call. We'll listen to your goals, review your current setup, and recommend the most effective way forward. No hard sell attached.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-white text-[#1044ff] hover:bg-gray-100">
              <a href="https://calendly.com/maxterz-info/30min" target="_blank" rel="noopener noreferrer">
                Book Free Strategy Call
              </a>
            </Button>
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">Send Us Your Requirements</Link>
            </Button>
          </div>
          <p className="text-sm font-bold text-blue-200 tracking-wider">
            ★ 4.9 STARS FROM 7,100 VERIFIED REVIEWS. UK REGISTERED BUSINESS.
          </p>
        </div>
      </section>
    </>
  );
};

export default PackagesPage;