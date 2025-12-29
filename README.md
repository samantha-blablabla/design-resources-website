# Design Resources Website

A modern Next.js website for curating and discovering design resources, built with App Router and Supabase.


## 🚀 Features

- **Clean Minimal UI** - Grid-based design inspired by toools.design
- **Dynamic Content** - Fetch resources from Supabase database
- **AI Classification** - Automatic categorization with OpenAI
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Edge Functions** - Automated resource scraping with cron jobs

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page
│   ├── resources/           # Resources listing
│   ├── inspiration/         # Inspiration gallery
│   └── tips/                # Tips & tricks videos
├── components/
│   ├── ui/                  # Pure UI components
│   │   ├── Card.tsx
│   │   └── VideoCard.tsx
│   ├── Header.tsx           # Navigation
│   └── Footer.tsx           # Site footer
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── types.ts             # TypeScript types
├── supabase/functions/
│   └── fetch-resources/     # Edge Function for scraping
└── public/                  # Static assets
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase
- **Styling:** CSS (minimal design system)
- **AI:** OpenAI GPT-4o-mini
- **Deployment:** Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/design-resources-website.git
cd design-resources-website
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000

## 🗄️ Database Setup

See [supabase_setup.md](docs/supabase_setup.md) for detailed instructions.

### Quick Schema

```sql
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  emoji TEXT,
  gradient TEXT,
  category TEXT,
  url TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🤖 Edge Functions

The project includes an automated resource scraper:

- **Function:** `fetch-resources`
- **Schedule:** Every 3 days
- **Features:** AI classification, duplicate prevention
- **Deploy:** See [edge_function_deployment.md](docs/edge_function_deployment.md)

## 🎨 Component Architecture

Pure presentational components in `/components/ui`:
- Components accept props only
- No data fetching in UI components
- Reusable across the application

See [component_architecture.md](docs/component_architecture.md)

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Deploy Edge Functions

```bash
supabase functions deploy fetch-resources
supabase secrets set OPENAI_API_KEY=your-key
```

## 📄 Documentation

- [Supabase Setup](docs/supabase_setup.md)
- [Component Architecture](docs/component_architecture.md)
- [Edge Function Deployment](docs/edge_function_deployment.md)
- [GitHub Setup Guide](docs/github_setup.md)

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/YOUR_USERNAME/design-resources-website](https://github.com/YOUR_USERNAME/design-resources-website)
# Updated

