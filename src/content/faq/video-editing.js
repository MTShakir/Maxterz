// @ts-check

/**
 * FAQ for /services/video-animation/video-editing. Rendered on the page and used for the
 * FAQPage schema, so the page and the schema always match. Formats, lengths, what is included,
 * the pack of 30, the monthly plan and timelines from the price book (docs/05-offers.md
 * sections 2.3 and 2.8). No prices here: the cost answer points to the prices section, which
 * reads Supabase.
 *
 * `link` (optional): a phrase inside the answer that the page renders as a link.
 *
 * TODO(Talha): the price book does not say how many revisions a short-form edit or a long-form
 * edit includes. Confirm the policy, then name it in the changes answer (it currently promises
 * changes without a number).
 *
 * @type {Array<{ q: string, a: string, link?: { text: string, href: string } }>}
 */
export const faqs = [
  {
    q: 'What kind of videos do you edit?',
    a: 'Short-form videos up to 90 seconds: Instagram Reels, YouTube Shorts, TikToks and talking-head videos. We also edit long-form YouTube videos up to 15 minutes, with cuts, b-roll, captions and graphics.',
  },
  {
    q: 'How much does video editing cost?',
    a: 'Short-form edits are priced per video. You can try one edit, buy a pack of 30 to use within 60 days, or ask for a monthly plan quote with a 3-month minimum. Long-form edits are also priced per video, and the price depends on the length and how much b-roll and graphics the video needs. Prices are in the prices section on this page.',
  },
  {
    q: 'How quickly will I get my edit?',
    a: 'A short-form edit takes 2 working days. A long-form edit takes 3 to 5 working days. The time starts once we have your footage and brief. With a pack of 30, you send footage as you film and use all 30 edits within 60 days.',
  },
  {
    q: 'What do I need to send you?',
    a: 'Your raw footage in a shared folder, plus a short brief: where the video will run, what it is about and any edits you like the style of. Add your logo, brand colours and fonts if you want them in the video. For talking-head videos, send all your takes.',
  },
  {
    q: 'What if I want changes to an edit?',
    a: 'Send us your notes and we revise the edit. The number of revision rounds is set in your quote before we start. Changes outside the original brief, such as new footage or a new script, get a written quote first.',
  },
  {
    q: 'Do I own the edited videos?',
    a: 'Yes. Once paid for, the edited videos are yours to post and reuse. Your raw footage stays yours too.',
  },
  {
    q: 'What happens after my first edit?',
    a: 'You get the final video, ready to post. If you want regular edits, a pack of 30 or a monthly plan keeps your posting on schedule. Posting on YouTube? We can design your thumbnails too: see our YouTube thumbnail design.',
    link: { text: 'YouTube thumbnail design', href: '/services/branding-design/thumbnail-design' },
  },
  {
    q: 'Should I buy a pack of 30 or a monthly plan?',
    a: 'The pack suits a set run of posts: 30 short-form edits at a fixed price, used within 60 days. A monthly plan suits steady posting: we quote a monthly volume that fits your schedule, with a 3-month minimum. Not sure yet? Try one edit first.',
  },
];
