// @ts-check

/**
 * FAQ for /services/branding-design/thumbnail-design. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Facts follow the price book
 * (docs/05-offers.md, section 2.2). No prices: the prices section on the page shows them.
 * Copy is written for this page only; none of it comes from the ThumbLab site (D06).
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book does not say how many revisions a thumbnail includes. Confirm the
 * policy for a single thumbnail, the pack of 30 and the monthly plan, then name it in the last
 * answer (it currently promises a revision without a number).
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What is ThumbLab?',
    a: 'ThumbLab is the thumbnail studio by Maxterz, with its own website and Instagram. You can order YouTube thumbnails on this page or through ThumbLab.',
  },
  {
    q: 'Who do you design thumbnails for?',
    a: 'Businesses, brands and agencies with a YouTube channel, and creators too. Agencies that run several channels can buy a pack of 30 or a monthly plan.',
  },
  {
    q: 'How much does a YouTube thumbnail cost?',
    a: 'It depends on how many you need. You can try one thumbnail, buy a pack of 30 to use within 60 days, or ask for a monthly plan quote with a 3-month minimum. Prices are in the prices section on this page.',
  },
  {
    q: 'What do you need from me before you start?',
    a: 'The video title, a short summary of the video, your channel name or niche, and any brand assets you have, such as a logo or brand colours. If you want a face photo, product shot or other image featured, send that too.',
  },
  {
    q: 'How quickly will my thumbnail be ready?',
    a: 'A single thumbnail takes 1 to 2 working days. With a pack of 30, you send a brief for each video and use all 30 within 60 days. A monthly plan is built around your upload schedule.',
  },
  {
    q: 'What file format and size do I get?',
    a: 'Thumbnails come as PNG files at 1280 by 720 pixels, the size YouTube recommends. JPG is available if you prefer it.',
  },
  {
    q: 'Can I use the thumbnails outside YouTube?',
    a: 'Yes. The files work on Facebook, LinkedIn, course platforms and more. If you need a different crop or aspect ratio, mention it in your brief.',
  },
  {
    q: 'What happens if I am not happy with the design?',
    a: 'Tell us what is not working and we revise the design. If the idea itself is wrong, we explain why and try a new angle.',
  },
];
