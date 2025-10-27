export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600">
        <div>© {year} Thinkdigi. Funding · Tools · Expertise.</div>
        <div className="mt-2">
          Disclaimer: DeFi concepts shown are prototype/simulation only for investor preview.
        </div>
      </div>
    </footer>
  );
}
