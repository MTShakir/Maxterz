import Link from 'next/link';
import { SITE } from '@/lib/site';
import { fiverrAttribution, showPeriod } from '@/lib/reviews';

/**
 * Up to 3 real Fiverr reviews for a service page (brief 7.5 item 8). Server-rendered from
 * props. Every review says "on Fiverr" (D11: no review schema). Renders nothing when empty.
 *
 * @param {{ reviews: Array<{ id: string, author_name: string, location: string | null, quote: string, period_label: string | null, service_slug?: string }>, heading?: string, className?: string }} props
 */
export default function ServiceReviews({ reviews, heading = 'What clients say on Fiverr', className = 'bg-white' }) {
  if (!reviews?.length) return null;

  return (
    <section className={`py-24 px-4 ${className}`} aria-labelledby="service-reviews-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="badge-standard-light">CLIENT REVIEWS</span>
          <h2 id="service-reviews-heading" className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {heading}
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            {SITE.proof.fiverrRating} stars from {SITE.proof.fiverrReviews} reviews on Fiverr since {SITE.proof.fiverrSince}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col gap-5"
            >
              <blockquote className="text-gray-700 leading-relaxed flex-grow">
                <p>{review.quote}</p>
              </blockquote>
              <figcaption className="text-sm">
                <span className="font-bold text-gray-900">{review.author_name}</span>
                <span className="text-gray-500">
                  {review.location ? `, ${review.location}` : ''}
                  {showPeriod(review.period_label) ? `, ${review.period_label}` : ''}
                </span>
                <span className="block text-gray-600 mt-1">{fiverrAttribution(review.service_slug)}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center mt-10">
          <Link href="/reviews" className="text-[#1044ff] font-semibold hover:underline">
            Read more client reviews
          </Link>
        </p>
      </div>
    </section>
  );
}
