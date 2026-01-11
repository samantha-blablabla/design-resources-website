# DesignHubv2 Migration Plan - January 6, 2026

## 🎯 Project Goal
Migrate UI/UX components from DesignHubv2 (Vite/React) into current Next.js website while preserving all animations and replacing dummy data with real Supabase data (333 resources + 216 videos).

## ✅ Completed (Session 1)

### Dependencies Installed
- ✅ `framer-motion` - Animation library
- ✅ `matter-js` + `@types/matter-js` - Physics engine for Hero section
- ✅ `lenis` - Smooth scroll library (updated from deprecated @studio-freight/lenis)
- ✅ `lucide-react` - Icon library

### Components Ported

#### 1. ScrollWrapper (`components/ScrollWrapper.tsx`)
- **Status**: ✅ Complete
- **Features**:
  - Lenis smooth scroll integration
  - Scroll progress bar (yellow neon)
  - Context API for scroll control (stopScroll/startScroll)
  - Spring physics for progress indicator
- **Next.js Adaptation**: Added `'use client'` directive

#### 2. CursorContext (`components/CursorContext.tsx`)
- **Status**: ✅ Complete
- **Features**:
  - Custom cursor state management
  - Context API for cursor control
  - TypeScript typed cursor states
- **Next.js Adaptation**: Added `'use client'` directive

#### 3. CustomCursor (`components/CustomCursor.tsx`)
- **Status**: ✅ Complete
- **Features**:
  - Smooth mouse tracking with spring physics
  - Mix-blend-mode for visual effects
  - Expandable cursor on hover ('text' mode)
  - Optional cursor labels
- **Next.js Adaptation**: Added `'use client'` directive

## 📋 Remaining Tasks

### Phase 2: Core Components (NEXT SESSION)

#### 4. NoiseOverlay Component
- [ ] Fetch from DesignHubv2
- [ ] Port to Next.js with 'use client'
- [ ] Test visual overlay effect

#### 5. HeroSection Component
- [ ] Fetch complete component from DesignHubv2
- [ ] Port Matter.js physics setup
- [ ] Port magnetic button logic
- [ ] Adapt TAGS data structure
- [ ] Replace dummy tags with Supabase categories
- [ ] Test physics interactions in Next.js

#### 6. ResourceGallery (MainContent) Component
- [ ] Fetch Bento Grid layout
- [ ] Port filter bar with pill animation
- [ ] Port 3D tilt cards
- [ ] Port glow border effects
- [ ] Port shared element transitions (Portal)
- [ ] Map Supabase data structure:
  ```typescript
  interface Resource {
    id: string;
    title: string;
    description: string;
    image_url: string;
    url: string;
    category: string;
    tags: string[];
    featured: boolean;
    gradient: string;
  }
  ```

#### 7. VideoShowcase Component
- [ ] Fetch from DesignHubv2
- [ ] Port smart loading logic
- [ ] Implement hover-to-play (desktop)
- [ ] Implement scroll-to-play (mobile)
- [ ] Add lazy loading for 216 videos
- [ ] Map Supabase video data

### Phase 3: Data Integration

#### 8. Create Server Components
- [ ] Create `app/api/resources/route.ts` for data fetching
- [ ] Create Server Component wrapper for data
- [ ] Pass Supabase data as props to Client Components

#### 9. Data Mapping
- [ ] Map 333 resources to ResourceGallery
- [ ] Map 216 videos to VideoShowcase
- [ ] Assign Urban Palette colors based on category:
  - Neon Yellow (#eab308)
  - Neon Blue (#3b82f6)
  - Neon Orange (#f97316)
  - Neon Purple (#a855f7)
  - Neon Green (#22c55e)
- [ ] Ensure even color distribution

#### 10. Image Optimization
- [ ] Replace `<img>` with Next.js `<Image>`
- [ ] Keep all CSS/animation wrappers intact
- [ ] Add `loading="lazy"` where appropriate

### Phase 4: Layout Integration

#### 11. Update Root Layout
- [ ] Wrap app with CursorProvider
- [ ] Wrap app with ScrollWrapper
- [ ] Add NoiseOverlay
- [ ] Set global CSS:
  ```css
  body {
    background: #060606;
    color: white;
    cursor: none; /* Hide default cursor */
  }
  ```

#### 12. Update Homepage
- [ ] Import HeroSection
- [ ] Import ResourceGallery
- [ ] Import VideoShowcase
- [ ] Remove old components
- [ ] Test full page flow

### Phase 5: Admin Separation
- [ ] Keep admin page on separate route (`/admin`)
- [ ] Admin uses standard cursor (not custom)
- [ ] Admin does NOT use Lenis scroll
- [ ] Admin maintains current functionality

### Phase 6: Testing
- [ ] Test all animations in Next.js
- [ ] Test Matter.js physics
- [ ] Test Lenis smooth scroll
- [ ] Test custom cursor
- [ ] Test magnetic buttons
- [ ] Test 3D card tilts
- [ ] Test video lazy loading
- [ ] Test with 333 resources
- [ ] Test with 216 videos
- [ ] Test mobile responsive
- [ ] Test SEO (ensure SSR works)

## 🚨 Critical Rules (DO NOT MODIFY)

### ❌ NEVER Change These:
1. **Matter.js Physics**: Keep all physics parameters (gravity, friction, restitution)
2. **Spring Animations**: Keep all `stiffness`, `damping`, `mass` values
3. **Tailwind Classes**: Keep all `backdrop-blur`, `border-white/10`, gradients
4. **Lenis Settings**: Keep `duration: 1.2`, `lerp: 0.1`, easing function
5. **Animation Timings**: Keep all `transition` and `duration` values

### ✅ Safe to Modify:
1. Data sources (replace dummy with Supabase)
2. Content (text, images, URLs)
3. Number of items (grid layout auto-adjusts)

## 📦 Tech Stack

### Current (Preserved)
- Next.js 14 (App Router)
- Supabase (Database)
- TypeScript
- Tailwind CSS

### Added (From DesignHubv2)
- Framer Motion (Animations)
- Matter.js (Physics)
- Lenis (Smooth Scroll)
- Lucide React (Icons)

## 🎨 Urban Palette

```css
--bg-pure-black: #060606;
--neon-yellow: #eab308;
--neon-blue: #3b82f6;
--neon-orange: #f97316;
--neon-purple: #a855f7;
--neon-green: #22c55e;
```

## 📂 File Structure

```
WebForDesign/
├── app/
│   ├── layout.tsx (Update: add providers)
│   ├── page.tsx (Replace: new home with v2 components)
│   └── admin/
│       └── page.tsx (Keep as-is)
├── components/
│   ├── ScrollWrapper.tsx ✅
│   ├── CursorContext.tsx ✅
│   ├── CustomCursor.tsx ✅
│   ├── NoiseOverlay.tsx ⏳
│   ├── HeroSection.tsx ⏳
│   ├── ResourceGallery.tsx ⏳
│   └── VideoShowcase.tsx ⏳
├── lib/
│   └── supabase.ts (Keep as-is)
└── MIGRATION-DESIGNHUBV2.md (This file)
```

## 🔄 Migration Strategy

### Approach: Component-by-Component Porting
1. **Fetch** component from DesignHubv2
2. **Add** `'use client'` directive
3. **Test** in isolation
4. **Integrate** with Supabase data
5. **Verify** animations work
6. **Move to next** component

### Priority Order:
1. ✅ ScrollWrapper (Foundation)
2. ✅ Cursor components (UX)
3. ⏳ NoiseOverlay (Visual)
4. ⏳ HeroSection (Landing)
5. ⏳ ResourceGallery (Core content)
6. ⏳ VideoShowcase (Media)

## 📝 Session Notes

### Session 1 (January 6, 2026 - 20:00-21:00)
- Installed all dependencies
- Ported 3 foundational components
- Created migration documentation
- **Next**: Port NoiseOverlay, then HeroSection with Matter.js

### Token Usage
- Used: ~80k tokens
- Remaining: ~119k tokens
- **Recommendation**: Continue in new session to avoid running out

## 🎯 Next Session Checklist

1. [ ] Port NoiseOverlay.tsx
2. [ ] Port HeroSection.tsx (most complex - Matter.js)
3. [ ] Fetch all DesignHubv2 data structures
4. [ ] Start Supabase data mapping
5. [ ] Create color assignment logic

---

**Status**: 🟡 In Progress (25% Complete)
**Last Updated**: January 6, 2026 21:00
**Next Session**: Continue with Phase 2
