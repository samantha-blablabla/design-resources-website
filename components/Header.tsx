'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, AppWindow, BookStack, Play, Search, Menu, Xmark } from 'iconoir-react';
import { useSearch } from '@/hooks/useSearch';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { results, loading } = useSearch(searchQuery);

    // Group results by type
    const groupedResults = results.reduce((acc, result) => {
        const type = result.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(result);
        return acc;
    }, {} as Record<string, typeof results>);

    const filteredResults = selectedType === 'all' ? results : (groupedResults[selectedType] || []);

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
                            <>
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

                                {/* Desktop Search Results Dropdown */}
                                {searchQuery && (
                                    <div className="search-dropdown">
                                        <div className="search-results-list">
                                            {loading ? (
                                                <div className="search-loading">
                                                    <div className="search-spinner"></div>
                                                    <p>Searching for "{searchQuery}"...</p>
                                                </div>
                                            ) : results.length > 0 ? (
                                                <>
                                                    <div className="search-header">
                                                        <p className="search-results-count">{results.length} result{results.length === 1 ? '' : 's'} found</p>

                                                        {/* Category Filter Slider */}
                                                        {Object.keys(groupedResults).length > 1 && (
                                                            <div className="search-category-slider">
                                                                <button
                                                                    className={`search-category-chip ${selectedType === 'all' ? 'active' : ''}`}
                                                                    onClick={() => setSelectedType('all')}
                                                                >
                                                                    All ({results.length})
                                                                </button>
                                                                {Object.entries(groupedResults).map(([type, items]) => (
                                                                    <button
                                                                        key={type}
                                                                        className={`search-category-chip ${selectedType === type ? 'active' : ''}`}
                                                                        onClick={() => setSelectedType(type)}
                                                                    >
                                                                        {type === 'video' ? (
                                                                            <Play width={14} height={14} strokeWidth={2} />
                                                                        ) : type === 'inspiration' ? (
                                                                            <BookStack width={14} height={14} strokeWidth={2} />
                                                                        ) : (
                                                                            <AppWindow width={14} height={14} strokeWidth={2} />
                                                                        )}
                                                                        <span>{type === 'video' ? 'Videos' : type === 'inspiration' ? 'Inspiration' : 'Resources'}</span>
                                                                        <span className="chip-count">{items.length}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {filteredResults.map((result) => (
                                                        <Link
                                                            key={result.id}
                                                            href={result.url || '#'}
                                                            className="search-result-item"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={() => {
                                                                deactivateSearch();
                                                                setIsMobileMenuOpen(false);
                                                            }}
                                                        >
                                                            <div className="search-result-icon">
                                                                {result.type === 'video' ? (
                                                                    <Play width={20} height={20} strokeWidth={2} />
                                                                ) : result.type === 'inspiration' ? (
                                                                    <BookStack width={20} height={20} strokeWidth={2} />
                                                                ) : (
                                                                    <AppWindow width={20} height={20} strokeWidth={2} />
                                                                )}
                                                            </div>
                                                            <div className="search-result-content">
                                                                <h4 className="search-result-title">{result.title}</h4>
                                                                {result.description && (
                                                                    <p className="search-result-description">{result.description}</p>
                                                                )}
                                                                <div className="search-result-meta">
                                                                    <span className="search-result-category">{result.category.replace(/-/g, ' ')}</span>
                                                                    {result.tags && result.tags.length > 0 && (
                                                                        <span className="search-result-tags">
                                                                            {result.tags.slice(0, 2).map(tag => `#${tag}`).join(' ')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </>
                                            ) : searchQuery.length >= 2 ? (
                                                <div className="search-empty">
                                                    <p>No results found for "{searchQuery}"</p>
                                                    <span>Try different keywords or browse our categories</span>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="mobile-header">
                    {!isSearchActive && (
                        <Link href="/" className="logo-glass">
                            <span className="logo-emoji">✨</span>
                            <span className="logo-text">DesignHub</span>
                        </Link>
                    )}

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
                        <div className="search-mobile-expanded">
                            <Search width={20} height={20} strokeWidth={2} />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button className="search-close-mobile" onClick={deactivateSearch}>
                                <Xmark width={20} height={20} strokeWidth={2} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Results Dropdown */}
            {isSearchActive && searchQuery && (
                <div className="search-dropdown search-dropdown-mobile">
                    <div className="search-results-list">
                        {loading ? (
                            <div className="search-loading">
                                <div className="search-spinner"></div>
                                <p>Searching for "{searchQuery}"...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <>
                                <div className="search-header">
                                    <p className="search-results-count">{results.length} result{results.length === 1 ? '' : 's'} found</p>

                                    {/* Category Filter Slider */}
                                    {Object.keys(groupedResults).length > 1 && (
                                        <div className="search-category-slider">
                                            <button
                                                className={`search-category-chip ${selectedType === 'all' ? 'active' : ''}`}
                                                onClick={() => setSelectedType('all')}
                                            >
                                                All ({results.length})
                                            </button>
                                            {Object.entries(groupedResults).map(([type, items]) => (
                                                <button
                                                    key={type}
                                                    className={`search-category-chip ${selectedType === type ? 'active' : ''}`}
                                                    onClick={() => setSelectedType(type)}
                                                >
                                                    {type === 'video' ? (
                                                        <Play width={14} height={14} strokeWidth={2} />
                                                    ) : type === 'inspiration' ? (
                                                        <BookStack width={14} height={14} strokeWidth={2} />
                                                    ) : (
                                                        <AppWindow width={14} height={14} strokeWidth={2} />
                                                    )}
                                                    <span>{type === 'video' ? 'Videos' : type === 'inspiration' ? 'Inspiration' : 'Resources'}</span>
                                                    <span className="chip-count">{items.length}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {filteredResults.map((result) => (
                                    <Link
                                        key={result.id}
                                        href={result.url || '#'}
                                        className="search-result-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            deactivateSearch();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <div className="search-result-icon">
                                            {result.type === 'video' ? (
                                                <Play width={20} height={20} strokeWidth={2} />
                                            ) : result.type === 'inspiration' ? (
                                                <BookStack width={20} height={20} strokeWidth={2} />
                                            ) : (
                                                <AppWindow width={20} height={20} strokeWidth={2} />
                                            )}
                                        </div>
                                        <div className="search-result-content">
                                            <h4 className="search-result-title">{result.title}</h4>
                                            {result.description && (
                                                <p className="search-result-description">{result.description}</p>
                                            )}
                                            <div className="search-result-meta">
                                                <span className="search-result-category">{result.category.replace(/-/g, ' ')}</span>
                                                {result.tags && result.tags.length > 0 && (
                                                    <span className="search-result-tags">
                                                        {result.tags.slice(0, 2).map(tag => `#${tag}`).join(' ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) : searchQuery.length >= 2 ? (
                            <div className="search-empty">
                                <p>No results found for "{searchQuery}"</p>
                                <span>Try different keywords or browse our categories</span>
                            </div>
                        ) : null}
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
