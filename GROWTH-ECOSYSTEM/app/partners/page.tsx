import Link from "next/link";

export default function Partners() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-4">Partners</h1>
      <p className="mb-4">
        We collaborate with a wide network of partners including logistics providers, payment gateways,
        marketing studios, and financial institutions. If you're interested in partnering with us, we'd love
        to hear from you.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>OGOship – fulfillment and logistics</li>
        <li>Paytrail &amp; Stripe – payments</li>
        <li>Marketing and creative studios</li>
        <li>Accounting and compliance specialists</li>
      </ul>
      <p className="mb-4">
        To learn more about partnership opportunities, please{' '}
        <a href="mailto:partners@thinkdigi.fi" className="text-cyan underline">
          contact us
        </a>
        .
      </p>
    </div>
  );
}
