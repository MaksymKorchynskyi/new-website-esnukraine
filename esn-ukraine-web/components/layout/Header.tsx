'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Globe,
  Menu,
  X
} from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<'EN' | 'UA'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: 'About Us',
      href: '/about',
      dropdown: [
        { label: 'About Us', href: '/about' },
        { label: 'National Board', href: '/about/board' },
        { label: 'History', href: '/about/history' },
        { label: 'Sections', href: '/sections' },
      ],
    },
    {
      label: 'For Students',
      dropdown: [
        { label: 'Survival Guide', href: '/students/survival-guide' },
        { label: 'Buddy System', href: '/students/buddy' },
        { label: 'Erasmus+', href: '/students/erasmus' },
        { label: 'ESNcard', href: '/students/esncard' },
      ],
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Events',
      href: '/events',
    },
    {
      label: 'News',
      href: '/news',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'UA' : 'EN');
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300">
      {/* ESN Color Blocks Bar */}
      <div className="flex h-1">
        <div className="flex-1 bg-esn-cyan"></div>
        <div className="flex-1 bg-esn-magenta"></div>
        <div className="flex-1 bg-esn-green"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-orange-500"></div>
      </div>

      <nav className={`w-full transition-all duration-300 ${isScrolled
        ? 'shadow-md border-b border-gray-100'
        : 'border-b border-gray-100'
        }`}>
        <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-colors duration-300"
          >
            <div className="w-32 h-16 flex items-center justify-center">
              <img src="/logo-esn-ukraine.png" alt="ESN Ukraine" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <div className="flex items-center space-x-1 py-2">
                    <Link
                      href={item.href || '#'}
                      className="text-sm font-bold tracking-wider uppercase text-esn-dark hover:text-esn-cyan transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="text-esn-dark hover:text-esn-cyan transition-colors duration-200"
                    >
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="text-sm font-bold tracking-wider uppercase text-esn-dark hover:text-esn-cyan transition-colors duration-200 py-2 block"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 w-48 min-w-[200px]">
                    <div className="bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-esn-dark hover:text-esn-cyan transition-colors duration-200"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-esn-dark hover:bg-esn-cyan/10 transition-all duration-200 border border-gray-200 hover:border-esn-cyan"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-esn-dark hover:bg-esn-cyan/10 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Language Toggle */}
              <div className="flex justify-end">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-esn-dark hover:bg-esn-cyan/10 transition-all duration-200 border border-gray-200 hover:border-esn-cyan"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language}</span>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="flex items-center justify-between w-full text-left text-esn-dark font-bold text-sm tracking-wider uppercase hover:text-esn-cyan transition-colors duration-200"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''
                            }`} />
                        </button>

                        {activeDropdown === item.label && (
                          <div className="mt-2 ml-4 space-y-2">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-sm text-esn-dark hover:text-esn-cyan transition-colors duration-200"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-esn-dark font-bold text-sm tracking-wider uppercase hover:text-esn-cyan transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
