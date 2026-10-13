// @ts-check

/**
 * FAQ for /services/video-animation/motion-graphics. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Lengths, what is included, revision
 * rounds and timelines from the price book (docs/05-offers.md section 2.3), plus the voiceover
 * add-on and the explainer facts from the same table. No prices here: the cost answer points to
 * the prices section, which reads Supabase.
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book lists the 60-second video as "as above, plus 3 aspect ratios".
 * Confirm whether it also includes the 2 social cut-downs of the 30-second ad. Until then the
 * copy names only the 3 aspect ratios for the 60-second video.
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'How much does a motion graphics video cost?',
    a: 'It depends on the length: 15 seconds, 30 seconds or 60 seconds. A longer video needs more scenes and more animation, and the longer lengths include extra versions for social media and other placements. All three prices are in the prices section on this page, and your price is fixed before work starts.',
  },
  {
    q: 'Which length should I choose?',
    a: 'A 15-second ad suits one product or one offer. A 30-second ad gives you room to show a product and a clear next step, and it comes with 2 social cut-downs. A 60-second video suits launches and presentations with more to show, and it comes in 3 aspect ratios. Not sure? We recommend a length on the free call.',
  },
  {
    q: 'How long does a motion graphics video take?',
    a: 'A 15-second ad takes 5 working days. A 30-second ad takes 7 to 10 working days. A 60-second video takes 2 to 3 weeks. The time starts once we have your brief and brand files.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'A short brief: what the video is for, where it will run and the one message it must land. Send your logo, brand colours and fonts, plus any product images, screenshots or footage you want to show. We turn it all into a storyboard for you to approve.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every length includes 2 revision rounds. You approve the storyboard before animation starts, so changes stay small. Changes outside the agreed scope get a written quote before we start them.',
  },
  {
    q: 'Do I own the finished video?',
    a: 'Yes. Once the project is paid in full, the final video files are yours to use in ads, on social media, on your website and in presentations. The music in your video is licensed.',
  },
  {
    q: 'What happens after delivery?',
    a: 'You get the final files, ready to publish. If you want changes later, such as a new offer, a new size or a version for another campaign, we send a written quote before we start.',
  },
  {
    q: 'Do I need motion graphics or an explainer video?',
    a: 'Motion graphics suit short ads and launch videos of 15 to 60 seconds, built around one message and set to music. An explainer video runs 60 or 90 seconds and walks people through how your product works, with a script and a professional voiceover. If your product needs explaining, see our explainer video service. You can also add a voiceover with a UK or US accent to a motion graphics video.',
    link: { text: 'explainer video service', href: '/services/video-animation/explainer-videos' },
  },
];
