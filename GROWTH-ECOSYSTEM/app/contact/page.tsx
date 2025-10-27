export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">Interested in funding, partnership or learning more? Send us a message.</p>
      <form className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="Your message"
          ></textarea>
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          This form does not submit anywhere in the demo. Please send an email to{' '}
          <a href="mailto:info@thinkdigi.fi" className="text-cyan underline">
            info@thinkdigi.fi
          </a>
          .
        </p>
      </form>
    </div>
  );
}
