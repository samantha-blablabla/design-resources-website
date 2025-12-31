# Content Policy - Design Resources Website

**Last Updated**: December 31, 2025

---

## 📋 Overview

This document defines what content belongs on each page of the website and what should be excluded.

---

## 🎬 Videos Page

### ✅ ALLOWED
- YouTube video tutorials about:
  - UI/UX Design
  - Motion Design
  - 3D Design (Blender, Cinema 4D, etc.)
  - Graphic Design
  - Web Design
  - Mobile App Design

### ❌ NOT ALLOWED
- Non-design videos
- Videos shorter than 3 minutes
- Promotional/sales videos
- Non-English videos (unless highly valuable)

### 📊 Current Sources
13 YouTube channels (see VERCEL-CRON-SETUP.md for list)

---

## ✨ Inspiration Page

### ✅ ALLOWED
- Design showcases from:
  - **Packaging of the World** (RSS Feed) - Packaging design showcase
  - **ArtStation** (Public API) - Digital art, 3D art, illustration
- Real design project showcases
- Digital art and illustrations
- Packaging design
- Award-winning designs
- Design trends and creative work

### ❌ NOT ALLOWED
- Dummy/placeholder content
- Generic blog posts
- Non-design content
- Promotional content
- Paid marketplace content

### 📊 Current Sources
- **RSS Feeds**: 1 source (Packaging of the World)
- **Public APIs**: 1 source (ArtStation)
- **Total items per fetch**: 6 items (3 from each source)

---

## 🎨 Resources Page

### ✅ ALLOWED - Downloadable Design Resources

**ONLY websites that provide downloadable design assets:**

1. **Brushes & Patterns**
   - Photoshop brushes
   - Procreate brushes
   - Illustrator patterns
   - Texture packs

2. **Mockups**
   - Device mockups
   - Scene mockups
   - Print mockups
   - Template mockups

3. **UI Kits**
   - Figma UI kits
   - Sketch UI kits
   - Adobe XD kits
   - Component libraries

4. **Icons**
   - Icon packs (downloadable)
   - Icon libraries
   - SVG icon sets

5. **Fonts**
   - Free font downloads
   - Font foundries
   - Typography resources

6. **Illustrations**
   - Illustration packs
   - Vector illustrations
   - Character sets

7. **3D Assets**
   - 3D models
   - Materials
   - HDRIs

8. **Stock Photos**
   - Free stock photo sites
   - Curated photo collections

9. **Templates**
   - Design templates
   - Website templates
   - Presentation templates

10. **Actions & Presets**
    - Photoshop actions
    - Lightroom presets
    - Figma plugins

### ❌ NOT ALLOWED

**DO NOT include:**

1. **GitHub Repositories**
   - ❌ Icon libraries on GitHub (e.g., Font Awesome repo)
   - ❌ UI frameworks (e.g., Ant Design repo)
   - ❌ Design systems code
   - ❌ Font source code
   - ❌ Any code repositories

2. **Tools/Software**
   - ❌ Design tools (Figma, Photoshop, etc.)
   - ❌ Color pickers
   - ❌ Converters
   - ❌ Generators
   - ❌ Utilities

3. **Learning Resources**
   - ❌ Tutorial websites
   - ❌ Blog posts
   - ❌ Documentation sites
   - ❌ Learning platforms

4. **Developer Libraries**
   - ❌ React component libraries
   - ❌ Vue component libraries
   - ❌ CSS frameworks
   - ❌ JavaScript libraries

### 📝 Important Notes

- **Focus**: Resources page = **Downloadable design files ONLY**
- **Test**: Ask "Can I download this and use it in my design project?"
  - If YES → Include
  - If NO → Exclude

### ✅ Good Examples
- ✅ Mockuuups Studio (downloadable mockups)
- ✅ unDraw (downloadable illustrations)
- ✅ Fontshare (downloadable fonts)
- ✅ Iconoir website (icon download page)

### ❌ Bad Examples
- ❌ Font Awesome GitHub repo (code, not downloadable files)
- ❌ Ant Design GitHub repo (code library)
- ❌ Material Icons GitHub (source code)
- ❌ System Design Primer (learning resource)

---

## 🔧 Tools Page (Separate Section)

### ✅ ALLOWED
- Online design tools
- Utilities (TinyPNG, Remove.bg, etc.)
- Color tools (Coolors, Adobe Color, etc.)
- Typography tools (Fontpair, Typescale, etc.)

### ❌ NOT ALLOWED
- Desktop software
- Paid-only tools
- Development tools (non-design)

---

## 🤖 Automation Policy

### Videos
- Auto-fetched from YouTube channels
- Auto-categorized by channel
- Auto-removed if video becomes unavailable

### Inspiration
- Auto-fetched from RSS feeds
- Auto-categorized by source
- Auto-removed if link becomes 404

### Resources
- ❌ NO auto-fetching from GitHub
- ✅ Manual curation only
- Auto-removed if link becomes 404

---

## 🧹 Cleanup Process

### Daily Cleanup (8 AM UTC / 3 PM Vietnam)
1. Check all resource URLs
2. Test each URL for accessibility
3. Remove 404/dead links
4. Log removed items

### Flow
```
Cron runs → Check each URL → 404? → Remove from DB
                              ↓
                           OK? → Keep in DB
```

---

## 📊 Current Database Stats

**Total Resources**: 276 (as of Dec 31, 2025)
- Videos: 201
- Inspiration: 43
- Resources: 32 (icons, mockups, UI kits, illustrations, fonts)
- Tools: 4
- Colors: 6
- Typography: 5

---

## 🔄 Reporting Schedule

### Morning Report (9:15 AM Vietnam Time)
- Did cron job run at 9 AM?
- Any errors in automation?
- How many new items fetched?

### Afternoon Report (11 AM Vietnam Time)
- Are new items visible on website?
- Any 404 links found and removed?
- Database health check

---

## 📝 Remember

**Resources Page = Downloadable Design Files ONLY**

When in doubt, ask:
1. Can I download this?
2. Will I use this file in my design project?
3. Is this a design asset (not code/tool/tutorial)?

If all answers are YES → Include
If any answer is NO → Exclude
