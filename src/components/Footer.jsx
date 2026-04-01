const Footer = () => {
  return (
    <>
    <section id="Footer">
    <footer className="bg-black text-gray-300 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-10 py-10 flex justify-between gap-10 flex-wrap">

        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-2xl font-bold text-white">⚡ SoundX</h2>
          <p className="mt-3 text-sm max-w-sm">
            Premium quality headphones for music lovers. Experience sound like never before.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            © {new Date().getFullYear()} SoundX. All rights reserved.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 min-w-[250px] flex justify-between">

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Shop</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Shipping</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">Privacy</li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
    </section>
    </>
  );
};

export default Footer;