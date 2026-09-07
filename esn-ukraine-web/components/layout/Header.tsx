'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

import { MAIN_NAV, SOCIAL_LINKS } from '@/lib/navigation';
import type { NavItem, NavItemMega, NavItemDropdown } from '@/lib/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { SearchModal } from './SearchModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    document.addEventListener('open-search', handleOpenSearch);
    return () => document.removeEventListener('open-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  // -- Hover-intent --
  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, [cancelClose]);

  const openDropdown = useCallback((label: string) => {
    cancelClose();
    setActiveDropdown(label);
  }, [cancelClose]);

  // -- Mobile --
  const handleMobileToggle = useCallback((label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  // -- Helpers --
  const hasSubItems = (item: NavItem): item is NavItemMega | NavItemDropdown =>
    item.type === 'mega' || item.type === 'dropdown';

  /** Flatten mega columns or dropdown items into a single link list */
  const getLinks = (item: NavItem) => {
    if (item.type === 'mega') return item.columns.flatMap((col) => col.items);
    if (item.type === 'dropdown') return item.items;
    return [];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300">
      {/* ESN Color Bar */}
      <div className="flex h-1">
        <div className="flex-1 bg-esn-cyan" />
        <div className="flex-1 bg-esn-magenta" />
        <div className="flex-1 bg-esn-green" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-orange-500" />
      </div>

      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-100'
        }`}
      >
        <div className="flex justify-between items-center h-[72px] sm:h-20 pl-2 pr-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center transition-opacity duration-200 hover:opacity-90 cursor-pointer shrink-0"
          >
            <div className="w-28 h-14 sm:w-32 sm:h-16 flex items-center justify-start sm:justify-center">
              <img src="/logo-esn-ukraine.png" alt="ESN Ukraine" className="w-full h-full object-contain object-left sm:object-center" />
            </div>
          </Link>

          {/* ==================== Desktop Menu ==================== */}
          <div className="hidden xl:flex items-center space-x-5 2xl:space-x-7">
            {MAIN_NAV.map((item) => {
              const isActive = activeDropdown === item.label;
              const links = getLinks(item);

              // Simple link (no dropdown)
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative text-[13px] font-bold tracking-wider uppercase text-esn-dark hover:text-esn-cyan transition-colors duration-200 py-2 block whitespace-nowrap group"
                    onMouseEnter={() => openDropdown('')}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-esn-cyan transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              }

              // Dropdown item
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    onClick={() => setActiveDropdown(isActive ? null : item.label)}
                    className={`relative flex items-center gap-1 py-2 text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap group ${
                      isActive ? 'text-esn-cyan' : 'text-esn-dark hover:text-esn-cyan'
                    }`}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-esn-cyan transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {isActive && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100/80 overflow-hidden animate-menu-slide-down min-w-[220px]">
                        {/* ESN gradient stripe */}
                        <div className="flex h-[3px]">
                          <div className="flex-1 bg-esn-cyan" />
                          <div className="flex-1 bg-esn-magenta" />
                          <div className="flex-1 bg-esn-green" />
                          <div className="flex-1 bg-yellow-400" />
                          <div className="flex-1 bg-orange-500" />
                        </div>

                        <div className="py-2">
                          {links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-5 py-3 text-sm font-medium text-esn-dark hover:text-esn-cyan hover:bg-esn-cyan/5 transition-all duration-150"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-esn-dark hover:bg-esn-cyan/10 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ==================== Mobile Menu ==================== */}
        {isMobileMenuOpen && (
          <div
            className="xl:hidden fixed inset-0 top-[76px] sm:top-[84px] bg-esn-dark/10 backdrop-blur-sm z-40 touch-none overscroll-none"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 relative z-50 shadow-xl max-h-[calc(100vh-76px)] sm:max-h-[calc(100vh-84px)] overflow-y-auto overscroll-contain">
            <div className="px-4 py-6 space-y-6">
              {/* Social + Language */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      aria-label={label}
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-gray-50 text-esn-dark hover:bg-esn-cyan hover:text-white hover:border-esn-cyan transition-all duration-200 shadow-sm shrink-0"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <LanguageSwitcher />
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {MAIN_NAV.map((item) => (
                  <div key={item.label}>
                    {hasSubItems(item) ? (
                      <div>
                        <button
                          onClick={() => handleMobileToggle(item.label)}
                          className="flex items-center justify-between w-full text-left text-esn-dark font-bold text-sm tracking-wider uppercase hover:text-esn-cyan transition-colors duration-200"
                          aria-expanded={activeDropdown === item.label}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {activeDropdown === item.label && (
                          <div className="mt-2 ml-4 space-y-2">
                            {getLinks(item).map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className="block py-2 text-sm text-esn-dark hover:text-esn-cyan transition-colors duration-200"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
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

      {/* Search Modal — ⌘K */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
