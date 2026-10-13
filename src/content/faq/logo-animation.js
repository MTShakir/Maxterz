// @ts-check

/**
 * FAQ for /services/video-animation/logo-animation. Rendered on the page and used for the
 * FAQPage schema. Tiers, lengths, files and delivery days from the price book
 * (docs/05-offers.md section 2.3). No prices here: the cost answer points to the prices section.
 *
 * TODO(Talha): the price book lists 2 revision rounds for Essential only. Confirm the rounds
 * for Professional and Premium 3D, then name them in the revisions answer below.
 *
 * @type {Array<{ q: string, a: string }>}
 */
export const faqs = [
  {
    q: 'How much does a logo animation cost?',
    a: 'It depends on the tier you choose: Essential, Professional or Premium 3D. The price rises with length, concept work and 3D or complex motion. All three prices are in the prices section on this page, and your price is fixed before work starts.',
  },
  {
    q: 'What is the difference between Essential, Professional and Premium 3D?',
    a: 'Essential is a 2D reveal of 5 to 7 seconds with music and sound. Professional is a custom 2D concept with a storyboard, 8 to 12 seconds long, with intro and outro versions and sound design. Premium 3D is a 3D or complex animation of 10 to 15 seconds, with style frames, custom sound and social cut-downs.',
  },
  {
    q: 'How long does a logo animation take?',
    a: 'Essential takes 3 working days. Professional takes 5 working days. Premium 3D takes 7 to 10 working days. The time starts once we have your logo files and brief.',
  },
  {
    q: 'What files do I get?',
    a: 'Essential includes an MP4 and a transparent MOV, so the animation can sit on top of any video. Professional adds intro and outro versions and a Lottie file for the web. Premium 3D adds social cut-downs.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Essential includes 2 revision rounds. On Professional and Premium 3D, you approve the storyboard or style frames before animation starts, and your quote sets out the revision rounds. Changes outside the agreed scope get a written quote before we start them.',
  },
  {
    q: 'Can you animate my existing logo without a redesign?',
    a: 'Yes. We work from your existing logo files, ideally SVG, AI or EPS. No redesign is needed unless you want one.',
  },
  {
    q: 'Can I use my logo animation as a video intro or stream overlay?',
    a: 'Yes. The transparent MOV sits on top of any footage, so you can use it in intros, outros, presentations, stream overlays and social videos.',
  },
];
