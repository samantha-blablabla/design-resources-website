'use client';

import { useState, useEffect } from 'react';
import {
    Settings, Palette, PageEdit, Label, Text, Trash, Edit,
    Plus, Search, UploadSquare, Image as ImageIcon, Check, Xmark
} from 'iconoir-react';
import { createClient } from '@supabase/supabase-js';

type AdminTab = 'resources' | 'ui-settings' | 'colors' | 'tags' | 'typography';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>('resources');
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, videos: 0, inspiration: 0, tools: 0 });

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
            .order('created_at', { ascending: false })
            .limit(50);

        if (data) setResources(data);
        setLoading(false);
    };

    const loadStats = async () => {
        const { data: all } = await supabase.from('resources').select('category');
        if (all) {
            setStats({
                total: all.length,
                videos: all.filter(r => r.category === 'video-tutorials').length,
                inspiration: all.filter(r => r.category === 'inspiration').length,
                tools: all.filter(r => r.category === 'design-tools').length,
            });
        }
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <span className="admin-logo">✨</span>
                    <h2>DesignHub Admin</h2>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        <PageEdit width={20} height={20} />
                        <span>Resources</span>
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'ui-settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ui-settings')}
                    >
                        <Settings width={20} height={20} />
                        <span>UI Settings</span>
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'colors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('colors')}
                    >
                        <Palette width={20} height={20} />
                        <span>Colors</span>
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'tags' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tags')}
                    >
                        <Label width={20} height={20} />
                        <span>Tags</span>
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'typography' ? 'active' : ''}`}
                        onClick={() => setActiveTab('typography')}
                    >
                        <Text width={20} height={20} />
                        <span>Typography</span>
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <p>Design Resources Dashboard</p>
                    <small>v1.0.0</small>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Stats Cards (Only on resources tab) */}
                {activeTab === 'resources' && (
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <PageEdit width={24} height={24} />
                            </div>
                            <div className="admin-stat-content">
                                <p className="admin-stat-label">Total Resources</p>
                                <h3 className="admin-stat-value">{stats.total}</h3>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                <PageEdit width={24} height={24} />
                            </div>
                            <div className="admin-stat-content">
                                <p className="admin-stat-label">Video Tutorials</p>
                                <h3 className="admin-stat-value">{stats.videos}</h3>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                <ImageIcon width={24} height={24} />
                            </div>
                            <div className="admin-stat-content">
                                <p className="admin-stat-label">Inspiration</p>
                                <h3 className="admin-stat-value">{stats.inspiration}</h3>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                                <Settings width={24} height={24} />
                            </div>
                            <div className="admin-stat-content">
                                <p className="admin-stat-label">Design Tools</p>
                                <h3 className="admin-stat-value">{stats.tools}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content */}
                <div className="admin-content-area">
                    {activeTab === 'resources' && <ResourcesManager resources={resources} loading={loading} onRefresh={loadResources} />}
                    {activeTab === 'ui-settings' && <UISettings />}
                    {activeTab === 'colors' && <ColorsManager />}
                    {activeTab === 'tags' && <TagsManager />}
                    {activeTab === 'typography' && <TypographySettings />}
                </div>
            </main>
        </div>
    );
}

// Resources Manager Component
function ResourcesManager({ resources, loading, onRefresh }: any) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingResource, setEditingResource] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        category: 'design-tools',
        tags: '',
        image_url: '',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const filteredResources = resources.filter((r: any) =>
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);

        // Create a local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setFormData({ ...formData, image_url: reader.result as string });
        };
        reader.readAsDataURL(file);

        setUploadingImage(false);
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
            const { error } = await supabase
                .from('resources')
                .update(resource)
                .eq('id', editingResource.id);

            if (!error) {
                alert('Updated successfully!');
                setEditingResource(null);
                resetForm();
                onRefresh();
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('resources')
                .insert([resource]);

            if (!error) {
                alert('Added successfully!');
                resetForm();
                setShowAddForm(false);
                onRefresh();
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        const { error } = await supabase
            .from('resources')
            .delete()
            .eq('id', id);

        if (!error) {
            alert('Deleted successfully!');
            onRefresh();
        }
    };

    const handleEdit = (resource: any) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title || '',
            description: resource.description || '',
            url: resource.url || '',
            category: resource.category || 'design-tools',
            tags: resource.tags?.join(', ') || '',
            image_url: resource.image_url || '',
            gradient: resource.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        });
        setImagePreview(resource.image_url || '');
        setShowAddForm(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            url: '',
            category: 'design-tools',
            tags: '',
            image_url: '',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        });
        setImagePreview('');
        setEditingResource(null);
    };

    return (
        <div className="admin-panel-modern">
            <div className="admin-panel-header-modern">
                <div>
                    <h2>Manage Resources</h2>
                    <p className="admin-subtitle">Add, edit, and manage your design resources</p>
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

            {showAddForm && (
                <div className="admin-form-card-modern">
                    <div className="admin-form-header">
                        <h3>{editingResource ? 'Edit Resource' : 'Add New Resource'}</h3>
                        <button className="admin-close-btn" onClick={() => { resetForm(); setShowAddForm(false); }}>
                            <Xmark width={20} height={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form-modern">
                        {/* Image Upload Section */}
                        <div className="admin-image-upload-section">
                            <label className="admin-form-label">Thumbnail Image</label>
                            <div className="admin-image-upload-area">
                                {imagePreview ? (
                                    <div className="admin-image-preview">
                                        <img src={imagePreview} alt="Preview" />
                                        <button
                                            type="button"
                                            className="admin-image-remove"
                                            onClick={() => {
                                                setImagePreview('');
                                                setFormData({ ...formData, image_url: '' });
                                            }}
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
                                        />
                                        <UploadSquare width={48} height={48} />
                                        <p>Click to upload or drag and drop</p>
                                        <small>PNG, JPG, GIF up to 10MB</small>
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

                        <div className="admin-form-actions-modern">
                            <button
                                type="button"
                                className="admin-button-secondary-modern"
                                onClick={() => { resetForm(); setShowAddForm(false); }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="admin-button-primary-modern">
                                <Check width={20} height={20} />
                                <span>{editingResource ? 'Update' : 'Save'} Resource</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search and Table */}
            <div className="admin-table-container-modern">
                <div className="admin-search-bar">
                    <Search width={20} height={20} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                                    <th>Category</th>
                                    <th>Tags</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                                            No resources found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredResources.map((resource: any) => (
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
                                                        <ImageIcon width={20} height={20} />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-table-title">
                                                    {resource.title}
                                                    <small>{resource.url}</small>
                                                </div>
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
                    </div>
                )}
            </div>
        </div>
    );
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

function TypographySettings() {
    return <div className="admin-panel-modern"><h2>Typography Settings</h2><p>Coming soon...</p></div>;
}
