# 🎨 Hướng Dẫn Tùy Chỉnh Giao Diện (UI)

> Cập nhật lần cuối: 28/12/2025
>
> Hướng dẫn này giúp bạn tùy chỉnh giao diện website theo phong cách **toools.design** với background đẹp mắt, texture, và parallax effects.

---

## 📋 Mục Lục

1. [Background & Texture](#1-background--texture)
2. [Parallax Scroll Effects](#2-parallax-scroll-effects)
3. [Thay Đổi Màu Sắc](#3-thay-đổi-màu-sắc)
4. [Thay Đổi Font Chữ](#4-thay-đổi-font-chữ)
5. [Layout & Spacing](#5-layout--spacing)
6. [Hover Effects & Animations](#6-hover-effects--animations)
7. [Responsive Design](#7-responsive-design)
8. [Tips & Tricks](#8-tips--tricks)

---

## 1. Background & Texture

### 🎨 Gradient Background (Giống toools.design)

**File: `app/globals.css`**

#### Option 1: Subtle Gradient Background

```css
body {
  /* Gradient nhẹ từ trắng đến xanh/tím nhạt */
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fe 50%, #faf8ff 100%);
  min-height: 100vh;
}
```

#### Option 2: Dual-Tone Gradient

```css
body {
  /* Gradient 2 màu chéo góc */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-attachment: fixed; /* Giữ background cố định khi scroll */
}
```

#### Option 3: Mesh Gradient (Trendy 2025)

```css
body {
  background:
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
    #ffffff;
  background-attachment: fixed;
}
```

---

### 🌟 Texture Patterns

#### Pattern 1: Dot Grid Pattern

**File: `app/globals.css`**

```css
body {
  background-color: #fafafa;
  background-image:
    radial-gradient(circle, #e5e5e5 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0;
}
```

#### Pattern 2: Noise Texture

```css
body {
  position: relative;
  background: #ffffff;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}
```

#### Pattern 3: Topographic Lines

```css
body {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e5e5e5' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}
```

#### Pattern 4: Wave Pattern

```css
.hero {
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%236366f1' opacity='0.1'%3E%3C/path%3E%3C/svg%3E") no-repeat;
  background-size: cover;
  opacity: 0.5;
  z-index: -1;
}
```

---

### 🌈 Gradient Backgrounds cho Sections

**File: `app/globals.css`**

```css
/* Hero section với gradient */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
}

/* Hoặc gradient nhẹ hơn */
.hero {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border: 1px solid var(--color-border);
}
```

---

## 2. Parallax Scroll Effects

### 🚀 Simple Parallax Background

**File: `app/globals.css`**

```css
/* Background cố định khi scroll */
body {
  background-image: url('/path/to/background.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
```

---

### 🎯 Parallax cho Elements

**Bước 1: Tạo component Parallax**

**File: `components/Parallax.tsx`**

```typescript
'use client';

import { useEffect, useRef } from 'react';

export default function Parallax({
  children,
  speed = 0.5
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrolled = window.scrollY;
      const rate = scrolled * speed;

      elementRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={elementRef}
      style={{ willChange: 'transform', transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
}
```

**Bước 2: Sử dụng Parallax**

**File: `app/page.tsx`**

```typescript
import Parallax from '@/components/Parallax';

export default function Home() {
  return (
    <div className="container">
      {/* Elements bình thường */}
      <h1>Normal Content</h1>

      {/* Elements với parallax effect */}
      <Parallax speed={-0.3}>
        <div className="decorative-shape">
          {/* Floating decoration */}
        </div>
      </Parallax>

      <Parallax speed={0.5}>
        <div className="category-grid">
          {/* Category cards */}
        </div>
      </Parallax>
    </div>
  );
}
```

---

### ✨ Advanced Parallax với Intersection Observer

**File: `components/ParallaxSection.tsx`**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ParallaxSection({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      const translateY = scrollPercent * 50;

      sectionRef.current.style.transform = `translateY(${translateY}px)`;
      sectionRef.current.style.opacity = `${Math.min(scrollPercent + 0.5, 1)}`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        willChange: 'transform, opacity',
        transition: 'opacity 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
}
```

---

### 🌊 Floating Animation (Không cần scroll)

**File: `app/globals.css`**

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.floating-element {
  animation: float 6s ease-in-out infinite;
}

/* Delay khác nhau cho nhiều elements */
.floating-element:nth-child(1) { animation-delay: 0s; }
.floating-element:nth-child(2) { animation-delay: 1s; }
.floating-element:nth-child(3) { animation-delay: 2s; }
```

---

## 3. Thay Đổi Màu Sắc

### 🎨 CSS Variables (Hiện tại)

**File: `app/globals.css`**

```css
:root {
  /* Màu nền */
  --color-bg: #fafafa;
  --color-surface: #ffffff;

  /* Màu chữ */
  --color-text: #1a1a1a;
  --color-text-muted: #666666;

  /* Màu viền */
  --color-border: #e5e5e5;

  /* Màu accent (chính) */
  --color-accent: #6366f1;
  --color-accent-hover: #4f46e5;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

---

### 💡 Theme Presets

#### Preset 1: Purple Dream

```css
:root {
  --color-bg: #faf5ff;
  --color-accent: #8b5cf6;
  --color-accent-hover: #7c3aed;
}

body {
  background: linear-gradient(180deg, #faf5ff 0%, #f3e8ff 100%);
}
```

#### Preset 2: Ocean Blue

```css
:root {
  --color-bg: #f0f9ff;
  --color-accent: #0ea5e9;
  --color-accent-hover: #0284c7;
}

body {
  background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
}
```

#### Preset 3: Mint Fresh

```css
:root {
  --color-bg: #f0fdf4;
  --color-accent: #10b981;
  --color-accent-hover: #059669;
}

body {
  background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%);
}
```

#### Preset 4: Dark Mode

```css
:root {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --color-accent: #6366f1;
  --color-accent-hover: #818cf8;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}

body {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}
```

---

## 4. Thay Đổi Font Chữ

### 📝 Font Hiện Tại: Plus Jakarta Sans

**File: `app/globals.css`** (dòng 1)

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

### 🔄 Đổi Font Khác

#### Option 1: Inter (Modern, Clean)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### Option 2: Poppins (Friendly, Rounded)

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

#### Option 3: Space Grotesk (Tech, Modern)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Space Grotesk', monospace;
}
```

#### Option 4: Manrope (Elegant)

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Manrope', sans-serif;
}
```

---

## 5. Layout & Spacing

### 📐 Container Width

**File: `app/globals.css`**

```css
.container {
  max-width: 1400px;  /* Hiện tại */
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

/* Đổi thành rộng hơn */
.container {
  max-width: 1600px;  /* Rộng hơn */
}

/* Hoặc hẹp hơn cho clean look */
.container {
  max-width: 1200px;  /* Hẹp hơn */
}
```

---

### 📊 Category Grid Layout

**File: `app/globals.css`**

```css
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--spacing-md);
}

/* Thay đổi số cột tối thiểu */
.category-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Cards lớn hơn */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* Cards nhỏ hơn */
}

/* Hoặc cố định số cột */
.category-grid {
  grid-template-columns: repeat(5, 1fr); /* 5 cột cố định */
  grid-template-columns: repeat(6, 1fr); /* 6 cột cố định */
}
```

---

## 6. Hover Effects & Animations

### ✨ Enhanced Card Hover (Hiện tại)

**File: `app/globals.css`**

```css
.category-card {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}
```

---

### 🎯 Advanced Hover Effects

#### Effect 1: Glow on Hover

```css
.category-card {
  position: relative;
  overflow: hidden;
}

.category-card::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.category-card:hover::after {
  width: 300px;
  height: 300px;
}
```

#### Effect 2: Tilt on Hover (3D)

```css
.category-card {
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.category-card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-8px);
}
```

#### Effect 3: Shine Effect

```css
.category-card {
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.category-card:hover::before {
  left: 100%;
}
```

---

### 🌊 Scroll Animations

**File: `app/globals.css`**

```css
/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-grid > * {
  animation: fadeInUp 0.6s ease-out backwards;
}

.category-grid > *:nth-child(1) { animation-delay: 0.05s; }
.category-grid > *:nth-child(2) { animation-delay: 0.1s; }
.category-grid > *:nth-child(3) { animation-delay: 0.15s; }
.category-grid > *:nth-child(4) { animation-delay: 0.2s; }
.category-grid > *:nth-child(5) { animation-delay: 0.25s; }
.category-grid > *:nth-child(6) { animation-delay: 0.3s; }
/* ... tiếp tục cho các cards khác */
```

---

## 7. Responsive Design

### 📱 Mobile Optimizations

**File: `app/globals.css`**

```css
/* Tablet & smaller */
@media (max-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .category-card {
    min-height: 100px;
    padding: var(--spacing-md) var(--spacing-sm);
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .container {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .hero h1 {
    font-size: 1.75rem;
  }
}
```

---

## 8. Tips & Tricks

### 💡 Xem Thay Đổi Ngay Lập Tức

1. **Dev Server phải chạy**: `npm run dev`
2. **Mở browser**: http://localhost:3001
3. **Chỉnh file CSS** → Save → Browser tự reload
4. **Chỉnh file TSX** → Save → Hot reload

---

### 💡 Dùng Browser DevTools

1. Nhấn **F12** để mở DevTools
2. Tab **Elements** → Click vào element
3. Tab **Styles** → Chỉnh CSS trực tiếp
4. Copy CSS đã chỉnh → Paste vào file

---

### 💡 Tools Hữu Ích

#### Màu sắc & Gradients:
- **https://coolors.co** - Tạo bảng màu
- **https://uigradients.com** - Gradient đẹp
- **https://colorhunt.co** - Phối màu sẵn
- **https://cssgradient.io** - Tạo CSS gradient

#### Patterns & Textures:
- **https://heropatterns.com** - SVG patterns
- **https://pattern.monster** - Pattern generator
- **https://bgjar.com** - Background generator

#### Icons:
- **https://iconoir.com** - Đang dùng (1,671 icons)
- **https://phosphoricons.com** - Alternative
- **https://lucide.dev** - Alternative

#### Fonts:
- **https://fonts.google.com** - Google Fonts
- **https://fontpair.co** - Font pairings

---

### 💡 Performance Tips

```css
/* Sử dụng will-change cho animations */
.category-card {
  will-change: transform, box-shadow;
}

/* Transform thay vì top/left */
.element {
  transform: translateY(10px); /* ✅ Tốt */
  /* top: 10px; ❌ Tránh */
}

/* Optimize shadows */
.card {
  box-shadow: var(--shadow-md); /* ✅ Dùng variable */
}
```

---

## 🚀 Quick Start Examples

### Example 1: Toools.design Style Background

```css
/* File: app/globals.css */

body {
  /* Gradient background */
  background: linear-gradient(180deg,
    #ffffff 0%,
    #faf8ff 50%,
    #f5f3ff 100%
  );
  background-attachment: fixed;

  /* Dot pattern overlay */
  background-image:
    radial-gradient(circle, #e5e5e5 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Example 2: Floating Decorations

```css
/* File: app/globals.css */

.container {
  position: relative;
}

.container::before,
.container::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  z-index: -1;
}

.container::before {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent);
  animation: float 8s ease-in-out infinite;
}

.container::after {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -50px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent);
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}
```

### Example 3: Glass Morphism Cards

```css
/* File: app/globals.css */

.category-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

## 📁 Cấu Trúc File Quan Trọng

```
WebForDesign/
├── app/
│   ├── globals.css          ← Tất cả styles chính (background, colors, etc.)
│   ├── page.tsx             ← Trang chủ với category cards
│   ├── layout.tsx           ← Root layout
│   └── resources/
│       └── page.tsx
├── components/
│   ├── Header.tsx           ← Navigation
│   ├── Parallax.tsx         ← Parallax component (tạo mới)
│   └── ui/
│       ├── Card.tsx
│       └── VideoCard.tsx
└── package.json             ← Dependencies (đã có iconoir-react)
```

---

## ✅ Checklist Tùy Chỉnh UI

- [ ] Chọn background style (gradient / pattern / texture)
- [ ] Thêm parallax effects (nếu muốn)
- [ ] Chọn color scheme (purple / blue / mint / dark)
- [ ] Đổi font chữ (Inter / Poppins / Space Grotesk)
- [ ] Điều chỉnh spacing và layout
- [ ] Tùy chỉnh hover effects
- [ ] Test responsive trên mobile (F12 → Toggle device toolbar)
- [ ] Check performance (animations không lag)

---

## 🆘 Cần Giúp Đỡ?

### Tôi muốn...

**...thêm background gradient**
→ Copy code từ [Section 1: Background & Texture](#1-background--texture)

**...tạo parallax effect**
→ Copy code từ [Section 2: Parallax Scroll Effects](#2-parallax-scroll-effects)

**...đổi màu toàn bộ website**
→ Chỉnh CSS variables trong [Section 3: Thay Đổi Màu Sắc](#3-thay-đổi-màu-sắc)

**...đổi font chữ**
→ Chọn font từ [Section 4: Thay Đổi Font Chữ](#4-thay-đổi-font-chữ)

**...thêm animations**
→ Copy examples từ [Section 6: Hover Effects & Animations](#6-hover-effects--animations)

---

**Chúc bạn tùy chỉnh UI thành công!** 🎨✨

> **Pro Tip**: Bắt đầu với background và màu sắc trước, sau đó mới thêm animations và effects. Điều này giúp bạn thấy rõ sự thay đổi từng bước!
