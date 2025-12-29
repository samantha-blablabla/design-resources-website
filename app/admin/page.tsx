'use client';

import { useState } from 'react';
import { Settings, Palette, PageEdit, Label, Text } from 'iconoir-react';

type AdminTab = 'resources' | 'ui-settings' | 'colors' | 'tags' | 'typography';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>('resources');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Simple password protection
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, use proper authentication
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Mật khẩu không đúng!');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ maxWidth: '500px', marginTop: '100px' }}>
                <div className="admin-login-card">
                    <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        Admin Panel
                    </h1>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="admin-input"
                                placeholder="Nhập mật khẩu"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="admin-button-primary">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button
                    className="admin-button-secondary"
                    onClick={() => setIsAuthenticated(false)}
                >
                    Đăng xuất
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'resources' ? 'active' : ''}`}
                    onClick={() => setActiveTab('resources')}
                >
                    <PageEdit width={20} height={20} />
                    <span>Quản lý Resources</span>
                </button>
                <button
                    className={`admin-tab ${activeTab === 'ui-settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ui-settings')}
                >
                    <Settings width={20} height={20} />
                    <span>Cài đặt UI</span>
                </button>
                <button
                    className={`admin-tab ${activeTab === 'colors' ? 'active' : ''}`}
                    onClick={() => setActiveTab('colors')}
                >
                    <Palette width={20} height={20} />
                    <span>Màu sắc</span>
                </button>
                <button
                    className={`admin-tab ${activeTab === 'tags' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tags')}
                >
                    <Label width={20} height={20} />
                    <span>Tags</span>
                </button>
                <button
                    className={`admin-tab ${activeTab === 'typography' ? 'active' : ''}`}
                    onClick={() => setActiveTab('typography')}
                >
                    <Text width={20} height={20} />
                    <span>Typography</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="admin-content">
                {activeTab === 'resources' && <ResourcesManager />}
                {activeTab === 'ui-settings' && <UISettings />}
                {activeTab === 'colors' && <ColorsManager />}
                {activeTab === 'tags' && <TagsManager />}
                {activeTab === 'typography' && <TypographySettings />}
            </div>
        </div>
    );
}

// Resources Manager Component
function ResourcesManager() {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className="admin-panel">
            <div className="admin-panel-header">
                <h2>Quản lý Resources</h2>
                <button
                    className="admin-button-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Đóng' : '+ Thêm Resource'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-card">
                    <h3>Thêm Resource mới</h3>
                    <form className="admin-form">
                        <div className="admin-form-group">
                            <label>Tiêu đề</label>
                            <input type="text" className="admin-input" placeholder="Tên resource" />
                        </div>
                        <div className="admin-form-group">
                            <label>Mô tả</label>
                            <textarea className="admin-textarea" placeholder="Mô tả chi tiết" rows={3} />
                        </div>
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>URL</label>
                                <input type="url" className="admin-input" placeholder="https://..." />
                            </div>
                            <div className="admin-form-group">
                                <label>Category</label>
                                <select className="admin-select">
                                    <option>ui-kits</option>
                                    <option>icons</option>
                                    <option>illustrations</option>
                                    <option>photos</option>
                                    <option>colors</option>
                                    <option>typography</option>
                                    <option>design-tools</option>
                                    <option>ai</option>
                                    <option>video-tutorials</option>
                                </select>
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label>Tags (phân cách bằng dấu phẩy)</label>
                            <input type="text" className="admin-input" placeholder="free, figma, ui-design" />
                        </div>
                        <div className="admin-form-group">
                            <label>Image URL</label>
                            <input type="url" className="admin-input" placeholder="https://..." />
                        </div>
                        <div className="admin-form-actions">
                            <button type="button" className="admin-button-secondary">
                                Hủy
                            </button>
                            <button type="submit" className="admin-button-primary">
                                Lưu Resource
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                                Đang tải dữ liệu...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// UI Settings Component
function UISettings() {
    return (
        <div className="admin-panel">
            <h2>Cài đặt UI</h2>
            <div className="admin-settings-grid">
                <div className="admin-setting-card">
                    <h3>Background</h3>
                    <div className="admin-form-group">
                        <label>Background Gradient</label>
                        <div className="admin-gradient-inputs">
                            <input type="color" defaultValue="#fcf5ff" />
                            <span>→</span>
                            <input type="color" defaultValue="#fdf8ff" />
                        </div>
                        <small>Gradient từ trên xuống dưới</small>
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Card Settings</h3>
                    <div className="admin-form-group">
                        <label>Border Radius</label>
                        <input type="range" min="0" max="24" defaultValue="12" />
                        <span>12px</span>
                    </div>
                    <div className="admin-form-group">
                        <label>Card Shadow</label>
                        <select className="admin-select">
                            <option>Small</option>
                            <option selected>Medium</option>
                            <option>Large</option>
                        </select>
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Spacing</h3>
                    <div className="admin-form-group">
                        <label>Container Width</label>
                        <input type="number" className="admin-input" defaultValue="1280" />
                        <small>px</small>
                    </div>
                    <div className="admin-form-group">
                        <label>Gap between cards</label>
                        <input type="range" min="16" max="48" defaultValue="32" />
                        <span>32px</span>
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Header Settings</h3>
                    <div className="admin-form-group">
                        <label>Header Height</label>
                        <input type="number" className="admin-input" defaultValue="80" />
                        <small>px</small>
                    </div>
                    <div className="admin-form-group">
                        <label>Header Blur</label>
                        <input type="range" min="0" max="20" defaultValue="10" />
                        <span>10px</span>
                    </div>
                </div>
            </div>

            <div className="admin-form-actions">
                <button className="admin-button-primary">Lưu thay đổi</button>
            </div>
        </div>
    );
}

// Colors Manager Component
function ColorsManager() {
    const colorVars = [
        { name: '--color-bg', label: 'Background', value: '#fafafa' },
        { name: '--color-surface', label: 'Surface', value: '#ffffff' },
        { name: '--color-text', label: 'Text', value: '#1a1a1a' },
        { name: '--color-text-muted', label: 'Text Muted', value: '#666666' },
        { name: '--color-border', label: 'Border', value: '#e5e5e5' },
        { name: '--color-accent', label: 'Accent', value: '#6366f1' },
    ];

    return (
        <div className="admin-panel">
            <h2>Quản lý Màu sắc</h2>
            <div className="admin-colors-grid">
                {colorVars.map((color) => (
                    <div key={color.name} className="admin-color-item">
                        <label>{color.label}</label>
                        <div className="admin-color-input-group">
                            <input type="color" defaultValue={color.value} />
                            <input type="text" className="admin-input" defaultValue={color.value} />
                        </div>
                        <small>{color.name}</small>
                    </div>
                ))}
            </div>

            <div className="admin-form-actions">
                <button className="admin-button-primary">Lưu màu sắc</button>
            </div>
        </div>
    );
}

// Tags Manager Component
function TagsManager() {
    return (
        <div className="admin-panel">
            <h2>Quản lý Tags</h2>
            <div className="admin-form-card">
                <h3>Thêm Tag mới</h3>
                <form className="admin-form">
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Tag Name</label>
                            <input type="text" className="admin-input" placeholder="figma" />
                        </div>
                        <div className="admin-form-group">
                            <label>Display Name</label>
                            <input type="text" className="admin-input" placeholder="Figma" />
                        </div>
                        <div className="admin-form-group">
                            <label>Color</label>
                            <input type="color" defaultValue="#6366f1" />
                        </div>
                    </div>
                    <button type="submit" className="admin-button-primary">
                        Thêm Tag
                    </button>
                </form>
            </div>

            <div className="admin-tags-list">
                <h3>Danh sách Tags hiện tại</h3>
                <div className="admin-tags-grid">
                    <span className="tag" style={{ background: '#DBEAFE' }}>Free</span>
                    <span className="tag" style={{ background: '#FCE7F3' }}>Premium</span>
                    <span className="tag" style={{ background: '#FEF3C7' }}>Figma</span>
                    <span className="tag" style={{ background: '#DCFCE7' }}>UI Design</span>
                </div>
            </div>
        </div>
    );
}

// Typography Settings Component
function TypographySettings() {
    return (
        <div className="admin-panel">
            <h2>Typography Settings</h2>
            <div className="admin-settings-grid">
                <div className="admin-setting-card">
                    <h3>Font Family</h3>
                    <div className="admin-form-group">
                        <label>Primary Font</label>
                        <input
                            type="text"
                            className="admin-input"
                            defaultValue="Plus Jakarta Sans"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Fallback Fonts</label>
                        <input
                            type="text"
                            className="admin-input"
                            defaultValue="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
                        />
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Font Sizes</h3>
                    <div className="admin-form-group">
                        <label>Heading 1</label>
                        <input type="number" className="admin-input" defaultValue="48" />
                        <small>px</small>
                    </div>
                    <div className="admin-form-group">
                        <label>Heading 2</label>
                        <input type="number" className="admin-input" defaultValue="32" />
                        <small>px</small>
                    </div>
                    <div className="admin-form-group">
                        <label>Body Text</label>
                        <input type="number" className="admin-input" defaultValue="16" />
                        <small>px</small>
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Font Weights</h3>
                    <div className="admin-form-group">
                        <label>Light</label>
                        <input type="number" className="admin-input" defaultValue="300" />
                    </div>
                    <div className="admin-form-group">
                        <label>Regular</label>
                        <input type="number" className="admin-input" defaultValue="400" />
                    </div>
                    <div className="admin-form-group">
                        <label>Bold</label>
                        <input type="number" className="admin-input" defaultValue="700" />
                    </div>
                </div>

                <div className="admin-setting-card">
                    <h3>Line Height</h3>
                    <div className="admin-form-group">
                        <label>Headings</label>
                        <input type="number" className="admin-input" defaultValue="1.2" step="0.1" />
                    </div>
                    <div className="admin-form-group">
                        <label>Body</label>
                        <input type="number" className="admin-input" defaultValue="1.6" step="0.1" />
                    </div>
                </div>
            </div>

            <div className="admin-form-actions">
                <button className="admin-button-primary">Lưu Typography</button>
            </div>
        </div>
    );
}
