import { Star, CheckCircle, PlayCircle, Building2 } from 'lucide-react';
import { SITE } from '@/lib/site';

/** The 4 proof badges from brief 7.1, built from SITE.proof so the numbers live in one place. */
const badges = [
  { icon: Star, text: `${SITE.proof.fiverrRating} stars from ${SITE.proof.fiverrReviews} reviews on Fiverr` },
  { icon: CheckCircle, text: `${SITE.proof.projects} projects since ${SITE.proof.fiverrSince}` },
  { icon: PlayCircle, text: `${SITE.proof.viralViews} views on our logo animation` },
  { icon: Building2, text: 'UK-registered company' },
];

/**
 * Row of 4 proof badges with SVG icons (brief 7.1). Server component, no JS needed.
 *
 * @param {{ align?: 'center' | 'start' }} props "start" left-aligns the row from the lg breakpoint.
 */
export default function ProofBar({ align = 'center' }) {
  return (
    <ul
      className={`flex flex-wrap justify-center gap-3 md:gap-4 ${align === 'start' ? 'lg:justify-start' : ''}`}
      aria-label="Proof"
    >
      {badges.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm font-semibold text-gray-800"
        >
          <Icon className="w-4 h-4 shrink-0 text-[#1044ff]" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}
