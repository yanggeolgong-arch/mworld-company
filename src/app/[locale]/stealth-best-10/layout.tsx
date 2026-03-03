import PretendardLoader from '@/components/PretendardLoader';

export default function StealthBest10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="stealth-best-10-font"
      style={{
        fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        letterSpacing: '-0.01em',
        lineHeight: 1.6,
      }}
    >
      <PretendardLoader />
      {children}
    </div>
  );
}
