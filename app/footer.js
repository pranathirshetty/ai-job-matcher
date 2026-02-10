import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-50 to-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 text-white p-2 rounded-lg">
              💼
            </div>
            <h2 className="text-xl font-semibold">JobFinder</h2>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Your go-to platform for finding the best jobs tailored to your
            skills and preferences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-500 text-lg">
            <Link href="#">🔗</Link>
            <Link href="#">🐦</Link>
            <Link href="#">📸</Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jobs">Browse Jobs</Link></li>
            <li><Link href="/post-job">Post a Job</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/support">Support</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mt-12 bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="font-semibold text-lg">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-600">
            Get the latest job listings and career advice.
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-64 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2024 JobFinder. All rights reserved.
      </div>
    </footer>
  );
}
