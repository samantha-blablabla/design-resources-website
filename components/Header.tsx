'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, AppWindow, BookStack, Play, Search, Menu, Xmark, NavArrowLeft } from 'iconoir-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard shortcut: Cmd/Ctrl + K to open search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                activateSearch();
            }
            if (e.key === 'Escape' && isSearchActive) {
                deactivateSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchActive]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const activateSearch = () => {
        setIsSearchActive(true);
        setIsMobileMenuOpen(false);
        setTimeout(() => searchInputRef.current?.focus(), 100);
    };

    const deactivateSearch = () => {
        setIsSearchActive(false);
        setSearchQuery('');
    };

    return (
        <header className={`header-glass ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-pill">
                {/* Desktop Layout */}
                <div className="desktop-header">
                    <Link href="/" className="logo-glass">
                        <span className="logo-emoji">✨</span>
                        <span className="logo-text">DesignHub</span>
                    </Link>

                    {/* Desktop Navigation - Shift to left when search active */}
                    <nav className={`nav-glass nav-desktop ${isSearchActive ? 'nav-compact' : ''}`}>
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
                        <Link href="/videos" className="nav-link-glass">
                            <Play width={20} height={20} strokeWidth={2} />
                            <span>Videos</span>
                        </Link>
                    </nav>

                    {/* Desktop Search - Inline expandable */}
                    <div className={`search-inline-desktop ${isSearchActive ? 'active' : ''}`}>
                        {!isSearchActive ? (
                            <button className="search-btn-glass" onClick={activateSearch}>
                                <Search width={20} height={20} strokeWidth={2} />
                            </button>
                        ) : (
                            <div className="search-expanded">
                                <Search width={20} height={20} strokeWidth={2} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    className="search-input-inline"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search-close-inline" onClick={deactivateSearch}>
                                    <Xmark width={20} height={20} strokeWidth={2} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="mobile-header">
                    <Link href="/" className={`logo-glass ${isSearchActive ? 'logo-hidden' : ''}`}>
                        <span className="logo-emoji">✨</span>
                        <span className="logo-text">DesignHub</span>
                    </Link>

                    {!isSearchActive ? (
                        <div className="mobile-actions">
                            <button className="search-btn-glass" onClick={activateSearch}>
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
                    ) : (
                        <div className="search-mobile-bar">
                            <button className="search-back-btn" onClick={deactivateSearch}>
                                <NavArrowLeft width={24} height={24} strokeWidth={2} />
                            </button>
                            <div className="search-mobile-input">
                                <Search width={20} height={20} strokeWidth={2} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Results Dropdown */}
            {isSearchActive && searchQuery && (
                <div className="search-dropdown">
                    <div className="search-results-list">
                        <p className="search-placeholder">Searching for "{searchQuery}"...</p>
                        {/* Results will be rendered here */}
                    </div>
                </div>
            )}

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
                        <Link href="/videos" className="mobile-menu-link" onClick={closeMobileMenu}>
                            <Play width={24} height={24} strokeWidth={2} />
                            <span>Videos</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
