/**
 * Renders a case-study canvas. All geometry in the markup/CSS is expressed in
 * cqw units, so it scales with the container using CSS only (no client JS).
 */
const ScaledPage = ({ html, className = '' }) => (
  <div
    className={className}
    style={{ containerType: 'inline-size' }}
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default ScaledPage;
