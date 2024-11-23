const footerSections = {
  product: ["Features", "Pricing", "Documentation"],
  company: ["About", "Blog", "Careers"],
  legal: ["Privacy", "Terms", "Security"]
};

function FooterSection({ title, links }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-gray-400 hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pygmalion</h3>
            <p className="text-gray-400">Advanced AI chat platform for the next generation</p>
          </div>
          <FooterSection title="Product" links={footerSections.product} />
          <FooterSection title="Company" links={footerSections.company} />
          <FooterSection title="Legal" links={footerSections.legal} />
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Pygmalion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;