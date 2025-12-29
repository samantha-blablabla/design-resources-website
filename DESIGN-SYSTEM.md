# 🎨 Design System - DesignHub Learning Platform

> **Inspired by:** toools.design
> **Style:** Clean, minimal, pastel colors for learning
> **Updated:** 2025-12-29

---

## 🎯 Design Principles

1. **Clean & Minimal** - Like toools.design
2. **Learning-Focused** - Soft pastel colors
3. **Accessible** - High contrast, clear typography
4. **Consistent** - Uniform spacing & components

---

## 📝 Typography

### Font Family
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Fallback:** System fonts for performance

### Font Sizes
```css
/* Display */
--text-display: 48px;     /* Hero titles */
--text-hero: 36px;        /* Section heroes */

/* Headings */
--text-h1: 32px;          /* Page titles */
--text-h2: 24px;          /* Section titles */
--text-h3: 20px;          /* Card titles */
--text-h4: 18px;          /* Subsections */

/* Body */
--text-lg: 18px;          /* Large body */
--text-base: 16px;        /* Default body */
--text-sm: 14px;          /* Small text */
--text-xs: 12px;          /* Captions, tags */
```

### Font Weights
```css
--font-normal: 400;       /* Body text */
--font-medium: 500;       /* Emphasis */
--font-semibold: 600;     /* Headings */
--font-bold: 700;         /* Strong emphasis */
```

### Line Heights
```css
--leading-tight: 1.2;     /* Headings */
--leading-snug: 1.4;      /* Subheadings */
--leading-normal: 1.6;    /* Body text */
--leading-relaxed: 1.8;   /* Long-form content */
```

### Usage Example
```css
h1 {
  font-size: var(--text-h1);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

p {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

---

## 🌈 Color Palette (Pastel Learning Theme)

### Primary Colors (Learning Blue)
```css
--color-primary-50: #EFF6FF;    /* Lightest */
--color-primary-100: #DBEAFE;
--color-primary-200: #BFDBFE;
--color-primary-300: #93C5FD;   /* Soft pastel */
--color-primary-400: #60A5FA;
--color-primary-500: #3B82F6;   /* Main blue */
--color-primary-600: #2563EB;
--color-primary-700: #1D4ED8;
--color-primary-800: #1E40AF;
--color-primary-900: #1E3A8A;
```

### Secondary Colors (Pastel Accents)
```css
/* Purple - Creative */
--color-purple-100: #F3E8FF;
--color-purple-300: #D8B4FE;
--color-purple-500: #A855F7;

/* Pink - Design */
--color-pink-100: #FCE7F3;
--color-pink-300: #F9A8D4;
--color-pink-500: #EC4899;

/* Green - Success */
--color-green-100: #DCFCE7;
--color-green-300: #86EFAC;
--color-green-500: #22C55E;

/* Orange - Featured */
--color-orange-100: #FFEDD5;
--color-orange-300: #FDBA74;
--color-orange-500: #F97316;

/* Yellow - Warning */
--color-yellow-100: #FEF3C7;
--color-yellow-300: #FCD34D;
--color-yellow-500: #EAB308;
```

### Neutral Colors
```css
/* Backgrounds */
--color-white: #FFFFFF;
--color-gray-50: #FAFAF9;       /* Page background */
--color-gray-100: #F5F5F4;      /* Card background */
--color-gray-200: #E7E5E4;      /* Borders light */

/* Text */
--color-gray-400: #A8A29E;      /* Muted text */
--color-gray-600: #57534E;      /* Secondary text */
--color-gray-700: #44403C;      /* Body text */
--color-gray-900: #1C1917;      /* Headings */
--color-black: #000000;         /* Pure black (rare use) */
```

### Semantic Colors
```css
/* States */
--color-success: var(--color-green-500);
--color-warning: var(--color-yellow-500);
--color-error: #EF4444;
--color-info: var(--color-primary-500);

/* Backgrounds */
--color-bg-page: var(--color-gray-50);
--color-bg-surface: var(--color-white);
--color-bg-hover: var(--color-gray-100);
--color-bg-muted: var(--color-gray-100);

/* Text */
--color-text-primary: var(--color-gray-900);
--color-text-secondary: var(--color-gray-600);
--color-text-muted: var(--color-gray-400);
--color-text-inverse: var(--color-white);

/* Borders */
--color-border: var(--color-gray-200);
--color-border-hover: var(--color-gray-400);
```

### Card Gradients (Soft Pastel)
```css
/* Resource Categories */
--gradient-ui: linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%);       /* Blue → Indigo */
--gradient-icons: linear-gradient(135deg, #FCE7F3 0%, #F3E8FF 100%);    /* Pink → Purple */
--gradient-illustrations: linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 100%); /* Yellow → Orange */
--gradient-photos: linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%);   /* Green → Emerald */
--gradient-typography: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%); /* Red pastel */
--gradient-colors: linear-gradient(135deg, #E0E7FF 0%, #DBEAFE 100%);   /* Indigo → Blue */
--gradient-ai: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%);       /* Purple */
--gradient-tools: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);    /* Cyan → Blue */
```

---

## 📦 Spacing System

### Base Unit: 4px
```css
--space-0: 0;
--space-1: 4px;       /* 0.25rem */
--space-2: 8px;       /* 0.5rem */
--space-3: 12px;      /* 0.75rem */
--space-4: 16px;      /* 1rem - Base */
--space-5: 20px;      /* 1.25rem */
--space-6: 24px;      /* 1.5rem */
--space-8: 32px;      /* 2rem */
--space-10: 40px;     /* 2.5rem */
--space-12: 48px;     /* 3rem */
--space-16: 64px;     /* 4rem */
--space-20: 80px;     /* 5rem */
--space-24: 96px;     /* 6rem */
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;  /* Max width */
```

### Usage Guidelines
```css
/* Cards */
padding: var(--space-6);        /* 24px */
gap: var(--space-4);            /* 16px between elements */

/* Sections */
margin-bottom: var(--space-12); /* 48px between sections */
padding: var(--space-16) 0;     /* 64px top/bottom */

/* Grid Gaps */
gap: var(--space-6);            /* 24px for desktop */
gap: var(--space-4);            /* 16px for mobile */
```

---

## 🎴 Card Design

### Default Card
```css
.card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);

  /* Subtle shadow */
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.02);

  /* Smooth transition */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: var(--color-border-hover);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}
```

### Pastel Gradient Card (Learning Style)
```css
.card-gradient {
  background: var(--gradient-ui); /* Or category-specific */
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  padding: var(--space-6);

  /* Soft inner shadow */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.06);

  transition: all 0.25s ease;
}

.card-gradient:hover {
  transform: translateY(-4px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Image Card (With Thumbnail)
```css
.card-image {
  background: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-image__thumbnail {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  background: var(--gradient-ui);
}

.card-image__content {
  padding: var(--space-5);
}
```

---

## 🔘 Border Radius

```css
--radius-none: 0;
--radius-sm: 4px;       /* Badges, pills */
--radius-md: 8px;       /* Buttons, inputs */
--radius-lg: 12px;      /* Cards (main) */
--radius-xl: 16px;      /* Large cards */
--radius-2xl: 24px;     /* Hero sections */
--radius-full: 9999px;  /* Pills, avatars */
```

---

## 🌑 Shadows

```css
/* Elevation levels */
--shadow-none: none;

--shadow-xs:
  0 1px 2px rgba(0, 0, 0, 0.04);

--shadow-sm:
  0 1px 3px rgba(0, 0, 0, 0.06),
  0 1px 2px rgba(0, 0, 0, 0.04);

--shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.08),
  0 2px 4px -1px rgba(0, 0, 0, 0.04);

--shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.08),
  0 4px 6px -2px rgba(0, 0, 0, 0.04);

--shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.08),
  0 10px 10px -5px rgba(0, 0, 0, 0.02);

/* Colored shadows (for hover states) */
--shadow-primary:
  0 8px 24px rgba(59, 130, 246, 0.12);

--shadow-success:
  0 8px 24px rgba(34, 197, 94, 0.12);
```

---

## 🎯 Component Specs

### Buttons
```css
.button {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.button-primary {
  background: var(--color-primary-500);
  color: var(--color-white);
  border: none;
}

.button-primary:hover {
  background: var(--color-primary-600);
  box-shadow: var(--shadow-primary);
}
```

### Tags/Badges
```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  background: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 1px solid var(--color-border);
}

.tag-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-color: var(--color-primary-200);
}
```

### Category Pills (like toools.design)
```css
.category-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-pill:hover {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.category-pill.active {
  background: var(--color-primary-500);
  color: var(--color-white);
  border-color: var(--color-primary-500);
}
```

---

## 📐 Grid System

### Desktop (>= 1024px)
```css
.grid-resources {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);  /* 24px */
}
```

### Tablet (768px - 1023px)
```css
@media (max-width: 1023px) {
  .grid-resources {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);  /* 20px */
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 767px) {
  .grid-resources {
    grid-template-columns: 1fr;
    gap: var(--space-4);  /* 16px */
  }
}
```

---

## ✨ Animations

```css
/* Smooth transitions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover lift */
@keyframes lift {
  to {
    transform: translateY(-4px);
  }
}

.card:hover {
  animation: lift var(--transition-base) forwards;
}
```

---

## 🎨 Usage Examples

### Resource Card (Pastel Learning Style)
```html
<div class="card-gradient" style="background: var(--gradient-ui);">
  <div class="flex items-center gap-3 mb-4">
    <span class="text-3xl">🎨</span>
    <h3 class="text-h3 font-semibold">Figma Design System</h3>
  </div>

  <p class="text-base text-gray-700 mb-4">
    Complete design system with components and guidelines.
  </p>

  <div class="flex flex-wrap gap-2">
    <span class="tag tag-primary">#figma</span>
    <span class="tag">#ui-kits</span>
    <span class="tag">#free</span>
  </div>
</div>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1400px) { /* 2xl */ }
```

---

**Next:** Apply this to `globals.css` 🚀
