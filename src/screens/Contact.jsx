'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SITE } from '@/lib/site';

const WhatsAppIcon = ({ className, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const services = [
  'Starter Kit',
  'Launch Kit',
  'Scale Kit',
  'A monthly plan',
  'Web and App Development',
  'Branding and Design',
  'Video and Animation',
  'Social Media Management',
  'AI and Automation',
  'SEO and Digital Marketing',
  'Not sure yet',
];

const budgets = [
  'Under £1,000',
  '£1,000 to £3,000',
  '£3,000 to £7,500',
  '£7,500+',
];

const timelines = [
  'ASAP',
  'Within 1 month',
  '1 to 3 months',
  'Just exploring',
];

const Contact = () => {
  const router = useRouter();
  const startTime = useRef(Date.now());
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  const inputCls = 'w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1044ff] focus:outline-none transition-colors';
  const labelCls = 'block text-sm font-bold text-gray-700 mb-2';

  async function handleSubmit(e) {
    e.preventDefault();
    if (Date.now() - startTime.current < 3000) return;

    const fd = new FormData(e.currentTarget);
    if (fd.get('_hp')) return;

    const attribution = (() => {
      try { return JSON.parse(sessionStorage.getItem('mx_attribution') || '{}'); } catch { return {}; }
    })();

    const payload = {
      source:   'contact',
      name:     fd.get('name'),
      email:    fd.get('email'),
      phone:    fd.get('phone') || undefined,
      company:  fd.get('company') || undefined,
      website_url: fd.get('website_url') || undefined,
      service:  fd.get('service') || undefined,
      budget:   fd.get('budget') || undefined,
      timeline: fd.get('timeline') || undefined,
      message:  fd.get('message'),
      _hp:      fd.get('_hp') || '',
      page_path: window.location.pathname,
      referrer:  document.referrer,
      ...attribution,
    };

    setPending(true);
    setFormError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');

      try { window.gtag?.('event', 'generate_lead', { form: 'contact', service: payload.service, budget: payload.budget }); } catch {}
      router.push('/thank-you?type=contact');
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again or email us directly.');
      setPending(false);
    }
  }

  return (
    <>
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <span className="inline-block py-2 px-4 rounded-full bg-white shadow-sm text-sm font-bold tracking-widest text-[#1044ff] uppercase mb-4 border-2 border-[#1044ff]">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Contact Maxterz</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Tell us about your project and we will get back to you within one working day.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-2 border-white rounded-full h-14 px-8 text-lg shadow-xl shadow-green-500/20 w-full sm:w-auto">
                <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="contact-whatsapp">
                  <WhatsAppIcon size={24} className="mr-2 fill-current" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-[#eb7444] to-[#e05220] hover:opacity-90 text-white border-2 border-white rounded-full h-14 px-8 text-lg shadow-xl shadow-orange-500/20 w-full sm:w-auto">
                <a href="/book" data-cta="contact-book">
                  <Calendar size={24} className="mr-2" />
                  Book a free strategy call
                </a>
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#1044ff] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1044ff]/5 rounded-bl-full -mr-8 -mt-8" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <MessageSquare className="text-[#1044ff]" /> Send a message
                </h2>
                <p className="text-gray-500 mb-8">
                  We reply within one working day.
                </p>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input name="_hp" tabIndex={-1} autoComplete="off" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ct-name" className={labelCls}>Name *</label>
                      <input id="ct-name" name="name" type="text" required maxLength={200} className={inputCls} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="ct-email" className={labelCls}>Email *</label>
                      <input id="ct-email" name="email" type="email" required maxLength={254} className={inputCls} placeholder="jane@example.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ct-phone" className={labelCls}>Phone</label>
                      <input id="ct-phone" name="phone" type="tel" maxLength={30} className={inputCls} placeholder="+44 ..." />
                    </div>
                    <div>
                      <label htmlFor="ct-company" className={labelCls}>Company</label>
                      <input id="ct-company" name="company" type="text" maxLength={200} className={inputCls} placeholder="Acme Ltd" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-url" className={labelCls}>Website URL</label>
                    <input id="ct-url" name="website_url" type="url" maxLength={500} className={inputCls} placeholder="https://yoursite.com" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ct-service" className={labelCls}>Interested in *</label>
                      <select id="ct-service" name="service" required className={`${inputCls} appearance-none`}>
                        <option value="">Select...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ct-budget" className={labelCls}>Budget *</label>
                      <select id="ct-budget" name="budget" required className={`${inputCls} appearance-none`}>
                        <option value="">Select...</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-timeline" className={labelCls}>Timeline</label>
                    <select id="ct-timeline" name="timeline" className={`${inputCls} appearance-none`}>
                      <option value="">Select...</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ct-message" className={labelCls}>Tell us about your project *</label>
                    <textarea
                      id="ct-message"
                      name="message"
                      required
                      maxLength={5000}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder="What are you trying to achieve?"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{formError}</p>
                  )}

                  <Button type="submit" size="lg" disabled={pending} className="w-full h-14 text-lg rounded-full shadow-xl shadow-blue-500/20">
                    {pending ? 'Sending...' : 'Send message'} <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info panel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8 flex flex-col">
              <div className="bg-gradient-to-br from-[#1044ff] to-[#0020bf] rounded-3xl shadow-2xl p-10 text-white border-2 border-white flex-grow">
                <h2 className="text-3xl font-bold mb-8">Contact info</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><MapPin size={28} /></div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Registered office</h3>
                      <p className="text-white/80 font-light text-lg">
                        128 City Road<br />London EC1V 2NX<br />United Kingdom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><Phone size={28} /></div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Phone</h3>
                      <a href={`tel:${SITE.phoneE164}`} data-cta="contact-phone" className="text-white/80 hover:text-white font-light text-lg transition-colors">
                        {SITE.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20"><Mail size={28} /></div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Email</h3>
                      <a href={`mailto:${SITE.email}`} data-cta="contact-email" className="text-white/80 hover:text-white font-light text-lg transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
