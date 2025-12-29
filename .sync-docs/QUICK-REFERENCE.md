# Quick Reference Guide

## 🚀 Most Used Commands

### Start Development
```bash
npm run dev
# Opens at http://localhost:3000
```

### Fix Localhost Issues
```bash
# Kill all node processes
taskkill //F //IM node.exe

# Clean and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Git Workflow
```bash
# Check status
git status
git log --oneline -5

# Pull latest (when switching computers)
git pull origin main

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# Force redeploy (empty commit)
git commit --allow-empty -m "Force redeploy"
git push origin main
```

---

## 📁 Important Files to Check

### When Starting on Different Computer
1. `.sync-docs/SESSION-2025-12-29.md` - Latest session details
2. `.sync-docs/CURRENT-STATE.md` - Current project state
3. This file - Quick commands

### Key Project Files
- `app/globals.css` - All global styles and responsive CSS
- `components/ui/Card.tsx` - Main card component
- `components/ui/VideoCard.tsx` - Video card component
- `app/page.tsx` - Homepage layout
- `app/videos/page.tsx` - Videos page

---

## 🎨 Current CSS Classes (Video Cards)

### Desktop (default)
```css
.video-card-content { padding: 12px; }
.video-card-title { font-size: 16px; }
.video-card-description { font-size: 14px; }
```

### Mobile (< 480px)
```css
.video-card-content { padding: 8px !important; }
.video-card-title { font-size: 13px !important; }
.video-card-description { font-size: 11px !important; }
```

---

## 🔍 Where to Find Things

### Card Title Size
- **File**: `app/globals.css`
- **Line**: 674
- **Value**: `1.125rem` (18px)

### Section Spacing
- **File**: `app/globals.css`
- **Line**: 947
- **Value**: `6rem` (margin-top)

### Video Card Styles
- **Desktop**: `app/globals.css` lines 1079-1096
- **Mobile**: `app/globals.css` lines 1414-1427

### Card Text Truncation
- **Title**: `WebkitLineClamp: 1`
- **Description**: `WebkitLineClamp: 2`
- **Files**: `components/ui/Card.tsx` and `components/ui/VideoCard.tsx`

---

## 🌐 URLs

- **Production**: https://design-resources-website.vercel.app
- **Videos Page**: https://design-resources-website.vercel.app/videos
- **GitHub**: https://github.com/samantha-blablabla/design-resources-website
- **Localhost**: http://localhost:3000

---

## 📱 Testing Breakpoints

```css
@media (max-width: 480px) {
  /* Mobile styles */
}

@media (min-width: 481px) and (max-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 769px) {
  /* Desktop styles */
}
```

**Current mobile breakpoint**: `480px`

---

## 🐛 Common Issues & Solutions

### Issue: Localhost won't start
```bash
taskkill //F //IM node.exe
rm -rf .next node_modules
npm install
npm run dev
```

### Issue: Changes not on production
1. Wait 5-10 min for Vercel deployment
2. Hard refresh: `Ctrl + Shift + R`
3. Test incognito mode
4. Force redeploy with empty commit

### Issue: Git conflicts
```bash
git stash
git pull origin main
git stash pop
# Fix conflicts in files
git add .
git commit -m "Resolve conflicts"
git push origin main
```

---

## 📝 Git Commit Message Format

```bash
# Good examples:
git commit -m "Fix: Video card mobile padding reduced to 8px"
git commit -m "Update: Card title size increased for better hierarchy"
git commit -m "Add: Mobile responsive styles for video cards"
git commit -m "Refactor: Remove inline styles from VideoCard component"

# Types:
# - Fix: Bug fixes
# - Update: Changes to existing features
# - Add: New features or files
# - Refactor: Code restructuring
# - Docs: Documentation only
```

---

## 🎯 Current Project Status

### ✅ Completed
- Card text truncation (1 line title, 2 lines description)
- Homepage layout reorganization (arrows below sliders)
- Typography hierarchy (title 18px, description 15px)
- Section spacing increase (6rem)
- Video card mobile optimization (code done)

### ⏳ Pending
- Verify video card mobile styles on production
- May need cache clearing

### 📋 No Outstanding Tasks
All requested features completed, waiting for production verification.

---

## 💡 Tips for Next Session

1. **Always pull first**: `git pull origin main`
2. **Read sync docs**: Check `.sync-docs/` folder files
3. **Test locally**: Run `npm run dev` before deploying
4. **Hard refresh**: Use `Ctrl+Shift+R` to see latest changes
5. **Check Vercel**: Monitor deployment status if needed

---

## 🔧 Useful VSCode Shortcuts

- `Ctrl + P` - Quick file open
- `Ctrl + Shift + F` - Search across files
- `Ctrl + /` - Toggle comment
- `Alt + Up/Down` - Move line up/down
- `Ctrl + D` - Select next occurrence

---

## 📊 Component Props Quick Copy

### Card
```typescript
<Card
  title="Title"
  description="Description"
  tags={['tag1', 'tag2']}
  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  url="https://example.com"
/>
```

### VideoCard
```typescript
<VideoCard
  title="Video Title"
  description="Video description"
  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  duration="12:34"
  url="https://youtube.com/watch?v=..."
  thumbnailUrl="https://..."
  channelName="Channel Name"
  publishedAt="2025-12-29T00:00:00Z"
/>
```

---

## 📞 Emergency Recovery

### If Everything Breaks
```bash
# 1. Backup current changes
git stash

# 2. Get clean version
git pull origin main

# 3. Clean everything
taskkill //F //IM node.exe
rm -rf .next node_modules package-lock.json

# 4. Fresh install
npm install

# 5. Test
npm run dev

# 6. Restore your changes if needed
git stash pop
```

### If Need to Revert Last Commit
```bash
# See recent commits
git log --oneline -5

# Revert to previous commit (keeps changes)
git reset --soft HEAD~1

# Revert completely (loses changes)
git reset --hard HEAD~1
git push --force origin main  # ⚠️ Use carefully!
```

---

## 🎨 Color Palette (Current)

```css
--color-primary: #667eea
--color-secondary: #764ba2
--color-text: #333
--color-text-light: #666
--color-background: #fff
--color-border: #e0e0e0
```

---

**Last Updated**: December 29, 2025
**Next Update**: When new changes are made

Keep this file handy for quick reference! 📌
