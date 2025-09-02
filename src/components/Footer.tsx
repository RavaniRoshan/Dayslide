export function Footer() {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Demo', href: '#demo' },
      { label: 'API', href: '#api' }
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' }
    ],
    resources: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Guides', href: '#guides' },
      { label: 'Methodology', href: '#methodology' }
    ],
    legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Security', href: '#security' },
      { label: 'Cookies', href: '#cookies' }
    ]
  };

  return (
    <footer className="bg-[#1a1a2e] border-t border-[#3b82f6]/20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="text-[#f8fafc] text-[24px] font-bold tracking-[-0.75px] mb-4">
              dayslide
            </div>
            <p className="text-[#cbd5e1] text-[14px] mb-6 leading-relaxed">
              Transform your dreams into daily actions with the power of "The ONE Thing" methodology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#64748b] hover:text-[#3b82f6] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-[#64748b] hover:text-[#3b82f6] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-[#f8fafc] font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#64748b] text-[14px] hover:text-[#cbd5e1] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#f8fafc] font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#64748b] text-[14px] hover:text-[#cbd5e1] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#f8fafc] font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#64748b] text-[14px] hover:text-[#cbd5e1] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#f8fafc] font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#64748b] text-[14px] hover:text-[#cbd5e1] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3b82f6]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#64748b] text-[14px] mb-4 md:mb-0">
              © 2025 Dayslide. All rights reserved.
            </p>
            <p className="text-[#64748b] text-[14px]">
              Inspired by "The ONE Thing" by Gary Keller and Jay Papasan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}