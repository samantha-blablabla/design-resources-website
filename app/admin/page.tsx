'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    Settings, Palette, PageEdit, Label, Text, Trash, Edit,
    Plus, Search, UploadSquare, MediaImage, Check, Xmark,
    Play, Package, Sparks
} from 'iconoir-react';
import { Card } from '@/components/ui';
import { supabase } from '@/lib/supabase';

type AdminTab = 'videos' | 'resources' | 'inspiration' | 'ui-settings' | 'tags';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>('videos');
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, videos: 0, resources: 0, inspiration: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    // Load resources and stats
    useEffect(() => {
        loadResources();
        loadStats();
    }, []);

    const loadResources = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setResources(data);
        setLoading(false);
    };

    const loadStats = async () => {
        const { data: all } = await supabase.from('resources').select('category');
        if (all) {
            const graphicDesignCategories = [
                'brushes', 'gradients', 'textures', 'patterns', 'mockups',
                'ui-kits', 'text-effects', 'icons', 'fonts', 'templates',
                'actions', 'presets', 'illustrations', '3d-assets', 'stock-photos'
            ];
            setStats({
                total: all.length,
                videos: all.filter(r => r.category === 'video-tutorials').length,
                resources: all.filter(r => graphicDesignCategories.includes(r.category)).length,
                inspiration: all.filter(r => r.category === 'inspiration').length,
            });
        }
    };

    return (
        <>
            <style jsx global>{`
                body {
                    padding-top: 0 !important;
                    overflow: hidden !important;
                }
                .header-glass,
                header,
                footer,
                .footer {
                    display: none !important;
                }
            `}</style>
            <div className="admin-layout">
                {/* Sidebar */}
                <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="admin-sidebar-header">
                    <span className="admin-logo">✨</span>
                    {!sidebarCollapsed && <h2>DesignHub Admin</h2>}
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                        title="Videos"
                    >
                        <Play width={20} height={20} />
                        {!sidebarCollapsed && <span>Videos</span>}
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                        title="Resources"
                    >
                        <Package width={20} height={20} />
                        {!sidebarCollapsed && <span>Resources</span>}
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'inspiration' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inspiration')}
                        title="Inspiration"
                    >
                        <Sparks width={20} height={20} />
                        {!sidebarCollapsed && <span>Inspiration</span>}
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'ui-settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ui-settings')}
                        title="UI Settings"
                    >
                        <Settings width={20} height={20} />
                        {!sidebarCollapsed && <span>UI Settings</span>}
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'tags' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tags')}
                        title="Tags"
                    >
                        <Label width={20} height={20} />
                        {!sidebarCollapsed && <span>Tags</span>}
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button
                        className="admin-collapse-btn"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {sidebarCollapsed ? '→' : '←'}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Stats Cards */}
                {(activeTab === 'videos' || activeTab === 'resources' || activeTab === 'inspiration') && (
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <div className="admin-stat-content">
                                <div className="admin-stat-info">
                                    <h3>Total Content</h3>
                                    <p>{stats.total}</p>
                                </div>
                                <div className="admin-stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                                    <PageEdit width={20} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-content">
                                <div className="admin-stat-info">
                                    <h3>Video Tutorials</h3>
                                    <p>{stats.videos}</p>
                                </div>
                                <div className="admin-stat-icon" style={{ background: 'rgba(240, 147, 251, 0.1)', color: '#f093fb' }}>
                                    <MediaImage width={20} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-content">
                                <div className="admin-stat-info">
                                    <h3>Design Resources</h3>
                                    <p>{stats.resources}</p>
                                </div>
                                <div className="admin-stat-icon" style={{ background: 'rgba(79, 172, 254, 0.1)', color: '#4facfe' }}>
                                    <PageEdit width={20} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-content">
                                <div className="admin-stat-info">
                                    <h3>Inspiration</h3>
                                    <p>{stats.inspiration}</p>
                                </div>
                                <div className="admin-stat-icon" style={{ background: 'rgba(67, 233, 123, 0.1)', color: '#43e97b' }}>
                                    <Palette width={20} height={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content */}
                <div className="admin-content-area">
                    {activeTab === 'videos' && <VideosManager resources={resources.filter(r => r.category === 'video-tutorials')} loading={loading} onRefresh={loadResources} />}
                    {activeTab === 'resources' && <ResourcesManager resources={resources.filter(r => ['brushes', 'gradients', 'textures', 'patterns', 'mockups', 'ui-kits', 'text-effects', 'icons', 'fonts', 'templates', 'actions', 'presets', 'illustrations', '3d-assets', 'stock-photos'].includes(r.category))} loading={loading} onRefresh={loadResources} />}
                    {activeTab === 'inspiration' && <InspirationManager resources={resources.filter(r => r.category === 'inspiration')} loading={loading} onRefresh={loadResources} />}
                    {activeTab === 'ui-settings' && <UISettings />}
                    {activeTab === 'tags' && <TagsManager />}
                </div>
            </main>
        </div>
        </>
    );
}

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`admin-toast ${type}`}>
            <div className="admin-toast-content">
                {type === 'success' ? <Check width={20} height={20} /> : <Xmark width={20} height={20} />}
                <span>{message}</span>
            </div>
        </div>
    );
}

// Resources Manager Component
function ResourcesManager({ resources, loading, onRefresh, defaultCategory = 'brushes' }: any) {
    const router = useRouter();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingResource, setEditingResource] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [tagFilter, setTagFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = useCallback((message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    }, []);

    // Get title based on category
    const getTitle = () => {
        if (defaultCategory === 'video-tutorials') return 'Manage Video Resources';
        if (defaultCategory === 'inspiration') return 'Manage Inspiration Resources';
        return 'Manage Design Resources';
    };

    const getSubtitle = () => {
        if (defaultCategory === 'video-tutorials') return 'Add, edit, and manage your video tutorials';
        if (defaultCategory === 'inspiration') return 'Add, edit, and manage your inspiration content';
        return 'Add, edit, and manage your design resources';
    };
    const itemsPerPage = 8; // Show 8 resources per page for Full HD screen
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        category: defaultCategory,
        tags: '',
        image_url: '',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        featured: false,
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    // Extract all unique tags from resources (memoized)
    const allTags = useMemo(() =>
        Array.from(new Set(resources.flatMap((r: any) => r.tags || []))),
        [resources]
    );

    // Memoize filtered resources to prevent recalculation on every render
    const filteredResources = useMemo(() => {
        return resources.filter((r: any) => {
            // Filter by category first
            const matchesCategory = r.category === defaultCategory;

            const matchesSearch = r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.category?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = tagFilter === 'all' || r.tags?.includes(tagFilter);

            return matchesCategory && matchesSearch && matchesTag;
        });
    }, [resources, defaultCategory, searchQuery, tagFilter]);

    // Pagination calculations (memoized)
    const { totalPages, paginatedResources } = useMemo(() => {
        const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedResources = filteredResources.slice(startIndex, endIndex);
        return { totalPages, paginatedResources };
    }, [filteredResources, currentPage, itemsPerPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, tagFilter]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        setUploadingImage(true);

        // Use base64 for now (no Supabase storage bucket needed)
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setFormData({ ...formData, image_url: reader.result as string });
            setUploadingImage(false);
        };
        reader.onerror = () => {
            showToast('Failed to read image file', 'error');
            setUploadingImage(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        const resource = {
            ...formData,
            tags: tagsArray,
        };

        if (editingResource) {
            // Update existing
            console.log('🔄 Updating resource:', editingResource.id, resource);
            const { data, error } = await supabase
                .from('resources')
                .update(resource)
                .eq('id', editingResource.id)
                .select(); // Return updated data to verify

            console.log('✅ Update result:', { data, error });

            if (!error) {
                showToast('Updated successfully!', 'success');
                // Don't reset form - keep user in edit mode
                onRefresh();
                router.refresh(); // Refresh main site to show changes
            } else {
                console.error('❌ Update failed:', error);
                showToast('Failed to update: ' + error.message, 'error');
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('resources')
                .insert([resource]);

            if (!error) {
                showToast('Added successfully!', 'success');
                resetForm();
                setShowAddForm(false);
                onRefresh();
                router.refresh(); // Refresh main site to show changes
            } else {
                showToast('Failed to add: ' + error.message, 'error');
            }
        }
    };

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        const { error } = await supabase
            .from('resources')
            .delete()
            .eq('id', id);

        if (!error) {
            showToast('Deleted successfully!', 'success');
            onRefresh();
            router.refresh(); // Refresh main site to show changes
        } else {
            showToast('Failed to delete: ' + error.message, 'error');
        }
    }, [onRefresh, router, showToast]);

    const handleEdit = useCallback((resource: any) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title || '',
            description: resource.description || '',
            url: resource.url || '',
            category: resource.category || defaultCategory,
            tags: resource.tags?.join(', ') || '',
            image_url: resource.image_url || '',
            gradient: resource.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            featured: resource.featured || false,
        });
        setImagePreview(resource.image_url || '');
        setShowAddForm(true);
    }, [defaultCategory]);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            url: '',
            category: 'design-tools',
            tags: '',
            image_url: '',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            featured: false,
        });
        setImagePreview('');
        setEditingResource(null);
    };

    return (
        <div className="admin-panel-modern">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="admin-panel-header-modern">
                <div>
                    <h2>{getTitle()}</h2>
                    <p className="admin-subtitle">{getSubtitle()}</p>
                </div>
                <button
                    className="admin-button-primary-modern"
                    onClick={() => {
                        resetForm();
                        setShowAddForm(!showAddForm);
                    }}
                >
                    <Plus width={20} height={20} />
                    <span>Add Resource</span>
                </button>
            </div>

            {/* Sources Info Panel */}
            <div style={{ padding: '0 24px' }}>
                <SourcesInfoPanel category={defaultCategory} />
            </div>

            {showAddForm && (
                <div className="admin-form-card-modern">
                    <div className="admin-form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ margin: 0 }}>{editingResource ? 'Edit Resource' : 'Add New Resource'}</h3>
                        <button
                            type="button"
                            className="admin-close-btn"
                            onClick={() => { resetForm(); setShowAddForm(false); }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <Xmark width={20} height={20} />
                        </button>
                    </div>

                    {/* Two Column Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Left Column - Edit Form Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '24px',
                            border: '1px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h4 style={{
                                margin: '0 0 20px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                paddingBottom: '16px',
                                borderBottom: '1px solid rgba(0,0,0,0.06)'
                            }}>
                                <Edit width={18} height={18} strokeWidth={2} color="#667eea" />
                                <span>Edit Resource</span>
                            </h4>

                    <form onSubmit={handleSubmit} className="admin-form-modern">
                        <>
                        {/* Image Upload Section */}
                        <div className="admin-image-upload-section">
                            <label className="admin-form-label">Thumbnail Image</label>
                            <div className="admin-image-upload-area">
                                {uploadingImage ? (
                                    <div className="admin-upload-placeholder">
                                        <div className="admin-upload-spinner"></div>
                                        <p>Uploading to Supabase Storage...</p>
                                        <small>Free image hosting ✨</small>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="admin-image-preview">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                showToast('Failed to load image. Please check the URL.', 'error');
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="admin-image-remove"
                                            onClick={() => {
                                                setImagePreview('');
                                                setFormData({ ...formData, image_url: '' });
                                            }}
                                            title="Remove image"
                                        >
                                            <Trash width={16} height={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="admin-upload-placeholder">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                            disabled={uploadingImage}
                                        />
                                        <UploadSquare width={48} height={48} />
                                        <p>Click to upload or drag and drop</p>
                                        <small>PNG, JPG, GIF up to 10MB • Free Supabase Storage</small>
                                        <small style={{ marginTop: '4px', opacity: 0.7 }}>Recommended: 400x300px or 16:9 aspect ratio</small>
                                    </label>
                                )}
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Or enter image URL</label>
                                <input
                                    type="url"
                                    className="admin-input-modern"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) => {
                                        setFormData({ ...formData, image_url: e.target.value });
                                        setImagePreview(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="admin-form-row-modern">
                            <div className="admin-form-group">
                                <label className="admin-form-label">Title *</label>
                                <input
                                    type="text"
                                    className="admin-input-modern"
                                    placeholder="Resource name"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Description</label>
                            <textarea
                                className="admin-textarea-modern"
                                placeholder="Describe this resource..."
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="admin-form-row-modern">
                            <div className="admin-form-group">
                                <label className="admin-form-label">URL *</label>
                                <input
                                    type="url"
                                    className="admin-input-modern"
                                    placeholder="https://..."
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Category *</label>
                                <select
                                    className="admin-select-modern"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="design-tools">Design Tools</option>
                                    <option value="ui-kits">UI Kits</option>
                                    <option value="icons">Icons</option>
                                    <option value="illustrations">Illustrations</option>
                                    <option value="photos">Photos</option>
                                    <option value="colors">Colors</option>
                                    <option value="typography">Typography</option>
                                    <option value="video-tutorials">Video Tutorials</option>
                                    <option value="inspiration">Inspiration</option>
                                    <option value="ai">AI Tools</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Tags (comma separated)</label>
                            <input
                                type="text"
                                className="admin-input-modern"
                                placeholder="free, figma, ui-design"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <span>⭐ Featured (Show on homepage)</span>
                            </label>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'flex-end',
                            marginTop: '24px',
                            paddingTop: '24px',
                            borderTop: '1px solid rgba(0,0,0,0.06)'
                        }}>
                            <button
                                type="button"
                                onClick={() => { resetForm(); setShowAddForm(false); }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    color: '#666',
                                    background: '#fff',
                                    border: '1px solid rgba(0,0,0,0.12)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#f8f9fa';
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
                                }}
                            >
                                <Xmark width={18} height={18} strokeWidth={2} />
                                <span>Cancel</span>
                            </button>
                            <button
                                type="submit"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    color: '#fff',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                                }}
                            >
                                <Check width={18} height={18} strokeWidth={2} />
                                <span>{editingResource ? 'Update' : 'Save'} Resource</span>
                            </button>
                        </div>
                        </>
                    </form>
                        </div>

                        {/* Right Column - Preview Card */}
                        <div style={{
                            background: '#f8f9fa',
                            borderRadius: '12px',
                            padding: '24px',
                            border: '1px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h4 style={{
                                margin: '0 0 20px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                paddingBottom: '16px',
                                borderBottom: '1px solid rgba(0,0,0,0.06)'
                            }}>
                                <MediaImage width={18} height={18} strokeWidth={2} color="#667eea" />
                                <span>Live Preview</span>
                            </h4>

                            <div style={{
                                position: 'sticky',
                                top: '20px'
                            }}>
                                <div style={{
                                    maxWidth: '380px',
                                    margin: '0 auto'
                                }}>
                                    <Card
                                        title={formData.title || 'Resource Title'}
                                        description={formData.description || 'Resource description will appear here...'}
                                        tags={formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : ['tag1', 'tag2']}
                                        gradient={formData.gradient}
                                        imageUrl={imagePreview || formData.image_url || ''}
                                        url={formData.url || '#'}
                                    />
                                </div>
                                <p style={{
                                    textAlign: 'center',
                                    marginTop: '20px',
                                    color: '#888',
                                    fontSize: '12px',
                                    fontStyle: 'italic',
                                    lineHeight: '1.5'
                                }}>
                                    💡 This is how your card will appear on the website
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Table */}
            <div className="admin-table-container-modern">
                <div className="admin-search-filter-bar">
                    <div className="admin-search-input-wrapper">
                        <Search width={20} height={20} strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="admin-search-input-clean"
                        />
                        {searchQuery && (
                            <button
                                className="admin-search-clear-btn"
                                onClick={() => setSearchQuery('')}
                            >
                                <Xmark width={16} height={16} strokeWidth={2} />
                            </button>
                        )}
                    </div>

                    <select
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value)}
                        className="admin-filter-select"
                    >
                        <option value="all">All Tags</option>
                        {allTags.sort().map((tag) => (
                            <option key={String(tag)} value={String(tag)}>{String(tag)}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="admin-loading">Loading...</div>
                ) : (
                    <div className="admin-table-wrapper-modern">
                        <table className="admin-table-modern">
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>URL</th>
                                    <th>Category</th>
                                    <th>Tags</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                                            No resources found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedResources.map((resource: any) => (
                                        <tr key={resource.id}>
                                            <td>
                                                {resource.image_url || resource.thumbnail_url ? (
                                                    <img
                                                        src={resource.image_url || resource.thumbnail_url}
                                                        alt={resource.title}
                                                        className="admin-table-thumbnail"
                                                    />
                                                ) : (
                                                    <div className="admin-table-thumbnail-placeholder">
                                                        <MediaImage width={20} height={20} />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-table-title">
                                                    {resource.title}
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: '#667eea',
                                                        textDecoration: 'none',
                                                        fontSize: '13px',
                                                        display: 'block',
                                                        maxWidth: '200px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    title={resource.url}
                                                >
                                                    {resource.url}
                                                </a>
                                            </td>
                                            <td>
                                                <span className="admin-badge">{resource.category}</span>
                                            </td>
                                            <td>
                                                <div className="admin-tags-cell">
                                                    {resource.tags?.slice(0, 3).map((tag: string, i: number) => (
                                                        <span key={i} className="admin-tag-small">#{tag}</span>
                                                    ))}
                                                    {resource.tags?.length > 3 && (
                                                        <span className="admin-tag-small">+{resource.tags.length - 3}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="admin-actions">
                                                    <button
                                                        className="admin-action-btn admin-action-edit"
                                                        onClick={() => handleEdit(resource)}
                                                        title="Edit"
                                                    >
                                                        <Edit width={16} height={16} />
                                                    </button>
                                                    <button
                                                        className="admin-action-btn admin-action-delete"
                                                        onClick={() => handleDelete(resource.id)}
                                                        title="Delete"
                                                    >
                                                        <Trash width={16} height={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="admin-pagination">
                                <button
                                    className="admin-pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ←
                                </button>

                                <div className="admin-pagination-dots">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`admin-pagination-dot ${page === currentPage ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                            title={`Page ${page}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    className="admin-pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Videos Manager - wrapper for ResourcesManager with video-tutorials category
function VideosManager({ resources, loading, onRefresh }: any) {
    return <ResourcesManager resources={resources} loading={loading} onRefresh={onRefresh} defaultCategory="video-tutorials" />;
}

// Inspiration Manager - wrapper for ResourcesManager with inspiration category
function InspirationManager({ resources, loading, onRefresh }: any) {
    return <ResourcesManager resources={resources} loading={loading} onRefresh={onRefresh} defaultCategory="inspiration" />;
}

// Placeholder components (keep existing functionality)
function UISettings() {
    return <div className="admin-panel-modern"><h2>UI Settings</h2><p>Coming soon...</p></div>;
}

function ColorsManager() {
    return <div className="admin-panel-modern"><h2>Colors Manager</h2><p>Coming soon...</p></div>;
}

function TagsManager() {
    return <div className="admin-panel-modern"><h2>Tags Manager</h2><p>Coming soon...</p></div>;
}

// Sources Info Panel Component
function SourcesInfoPanel({ category }: { category: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const sources = {
        'video-tutorials': {
            title: 'YouTube Channels',
            icon: '📺',
            items: [
                'DesignCourse', 'Flux Academy', 'Jesse Showalter', 'The Futur',
                'Charli Marie', 'Motion Design School', 'School of Motion',
                'SonduckFilm', 'Dope Motions', 'DesignWithArash',
                'Blender Guru', 'Josh - Blender Bros', 'Ryuu - Blender Bros'
            ]
        },
        'inspiration': {
            title: 'RSS Feeds',
            icon: '🎨',
            items: [
                'Awwwards Blog',
                'Abduzeedo',
                'Smashing Magazine',
                'Creative Bloq',
                'Designboom'
            ]
        },
        'resources': {
            title: 'GitHub Topics',
            icon: '📦',
            items: [
                'design-resources, brushes, textures',
                'ui-kit, mockup, icons',
                'fonts, typography, illustrations'
            ]
        }
    };

    const sourceInfo = sources[category as keyof typeof sources];
    if (!sourceInfo) return null;

    return (
        <div style={{
            marginBottom: '20px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            overflow: 'hidden'
        }}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: 'inherit',
                    fontSize: '14px',
                    fontWeight: '500'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{sourceInfo.icon}</span>
                    <span>{sourceInfo.title} ({sourceInfo.items.length})</span>
                </div>
                <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
            </button>

            {isExpanded && (
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '10px'
                    }}>
                        {sourceInfo.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '8px 12px',
                                    background: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    border: '1px solid rgba(99, 102, 241, 0.1)'
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <p style={{
                        marginTop: '12px',
                        fontSize: '12px',
                        color: '#6b7280',
                        fontStyle: 'italic'
                    }}>
                        Content is automatically fetched via Vercel Cron Jobs (every 6 hours)
                    </p>
                </div>
            )}
        </div>
    );
}

function TypographySettings() {
    return <div className="admin-panel-modern"><h2>Typography Settings</h2><p>Coming soon...</p></div>;
}
