'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, AppWindow, BookStack, LightBulb, Search, Menu, Xmark } from 'iconoir-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`header-glass ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-pill">
                <Link href="/" className="logo-glass">
                    <span className="logo-emoji">✨</span>
                    <span className="logo-text">DesignHub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-glass nav-desktop">
                    <Link href="/" className="nav-link-glass">
                        <Home width={20} height={20} strokeWidth={2} />
                        <span>Home</span>
                    </Link>
                    <Link href="/resources" className="nav-link-glass">
                        <AppWindow width={20} height={20} strokeWidth={2} />
                        <span>Resources</span>
                    </Link>
                    <Link href="/inspiration" className="nav-link-glass">
                        <BookStack width={20} height={20} strokeWidth={2} />
                        <span>Inspiration</span>
                    </Link>
                    <Link href="/tips" className="nav-link-glass">
                        <LightBulb width={20} height={20} strokeWidth={2} />
                        <span>Tips</span>
                    </Link>
                </nav>

                {/* Mobile Actions */}
                <div className="mobile-actions">
                    <button className="search-btn-glass">
                        <Search width={20} height={20} strokeWidth={2} />
                    </button>
                    <button className="menu-btn-glass" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <Xmark width={24} height={24} strokeWidth={2} />
                        ) : (
                            <Menu width={24} height={24} strokeWidth={2} />
                        )}
                    </button>
                </div>

                {/* Desktop Search */}
                <button className="search-btn-glass search-btn-desktop">
                    <Search width={20} height={20} strokeWidth={2} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
                    <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <Link href="/" className="mobile-menu-link" onClick={closeMobileMenu}>
                            <Home width={24} height={24} strokeWidth={2} />
                            <span>Home</span>
                        </Link>
                        <Link href="/resources" className="mobile-menu-link" onClick={closeMobileMenu}>
                            <AppWindow width={24} height={24} strokeWidth={2} />
                            <span>Resources</span>
                        </Link>
                        <Link href="/inspiration" className="mobile-menu-link" onClick={closeMobileMenu}>
                            <BookStack width={24} height={24} strokeWidth={2} />
                            <span>Inspiration</span>
                        </Link>
                        <Link href="/tips" className="mobile-menu-link" onClick={closeMobileMenu}>
                            <LightBulb width={24} height={24} strokeWidth={2} />
                            <span>Tips</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
