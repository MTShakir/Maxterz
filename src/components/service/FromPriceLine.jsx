import { formatGBP } from '@/lib/pricing-calc';

/**
 * The hero "from" price line (D30, brief 7.5 item 1). Renders nothing without a price.
 * A compulsory set-up fee is always shown next to a monthly price (brief 7.6).
 *
 * @param {{ price: number | null, label: string, billing?: 'one-off' | 'monthly', setupFee?: number | null, className?: string }} props
 *   label: what is priced, e.g. "Logo design"
 */
export default function FromPriceLine({ price, label, billing = 'one-off', setupFee = null, className = '' }) {
  if (price == null) return null;
  return (
    <p className={`text-base md:text-lg text-gray-700 font-semibold ${className}`}>
      {label} from <span className="text-[#1044ff] font-extrabold">{formatGBP(price)}</span>
      {billing === 'monthly' ? ' a month' : ''}
      {setupFee ? `, plus a one-off ${formatGBP(setupFee)} set-up` : ''}.
    </p>
  );
}
