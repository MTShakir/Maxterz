import React from 'react';

const TrustBar = () => {
  const logos = [
    {
      name: 'Google',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
      name: 'Trustpilot',
      url: 'https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg',
    },
    {
      name: 'Meta',
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    },
    {
      name: 'Stripe',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    },
    {
      name: 'Shopify',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    },
    {
      name: 'Fiverr',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.svg',
    },
  ];

  // Duplicate for seamless infinite loop
  const marqueeLogos = [...logos, ...logos];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full overflow-hidden border-t border-b border-gray-100 bg-white py-6">
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          Trusted by growing businesses globally
        </p>

        {/* Full-width marquee — no container max-width constraint */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center marquee-track">
            {marqueeLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-6 md:h-7 flex items-center justify-center
                           mx-10 md:mx-16 opacity-40 grayscale
                           hover:opacity-80 hover:grayscale-0
                           transition-all duration-300"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full w-auto object-contain"
                  style={{ maxWidth: '90px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustBar;