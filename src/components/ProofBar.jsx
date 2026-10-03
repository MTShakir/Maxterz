import { SITE } from '@/lib/site';

const badges = [
  { value: SITE.proof.fiverrRating, label: 'stars on Fiverr' },
  { value: SITE.proof.fiverrReviews, label: 'reviews on Fiverr' },
  { value: SITE.proof.projects, label: 'projects delivered' },
  { value: `Since ${SITE.proof.fiverrSince}`, label: '' },
];

/**
 * Horizontal row of 4 proof badges.
 * Renders as a server component — no JS needed.
 */
export default function ProofBar() {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6" role="list">
      {badges.map(({ value, label }) => (
        <div
          key={value}
          role="listitem"
          className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100 text-sm font-semibold text-gray-800 whitespace-nowrap"
        >
          <span className="text-[#1044ff] font-bold">{value}</span>
          {label && <span className="text-gray-500 font-normal">{label}</span>}
        </div>
      ))}
    </div>
  );
}
