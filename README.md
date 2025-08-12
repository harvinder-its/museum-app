# Sikh History - Multilingual Website

A comprehensive multilingual website showcasing the rich history of Sikhism through the lives of great martyrs and leaders. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌍 Multilingual Support

The website currently supports:
- **English** (`/en`) - Default language
- **Punjabi** (`/pa`) - Gurmukhi script

### Adding New Languages

To add a new language (e.g., Hindi):

1. **Update i18n configuration** in `src/i18n.ts`:
   ```typescript
   export const locales = ['en', 'pa', 'hi'] as const;
   ```

2. **Create translation file** `messages/hi.json`:
   ```json
   {
     "navigation": {
       "title": "सिख इतिहास",
       "themeToggle": "थीम बदलें",
       "progress": "प्रगति",
       "of": "में से"
     },
     "sections": {
       "bhaimanisingh": {
         "title": "शहीद भाई मनी सिंह जी",
         "content": "...",
         "imageDetails": {
           "title": "छवि विवरण",
           "artist": "कलाकार",
           "size": "आकार",
           "type": "कला प्रकार"
         }
       }
     }
   }
   ```

3. **Update middleware** in `src/middleware.ts`:
   ```typescript
   export const config = {
     matcher: ['/', '/(pa|en|hi)/:path*']
   };
   ```

## 🚀 Features

- **Multilingual Support**: Seamless language switching between English and Punjabi
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Interactive Navigation**: Sidebar navigation with progress tracking
- **Rich Content**: Detailed historical information with images and metadata
- **SEO Optimized**: Proper meta tags and structured content

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Icons**: Heroicons (SVG)
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
musem-app/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── layout.tsx     # Locale-specific layout
│   │   │   └── page.tsx       # Main page component
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Root redirect
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   └── ClientOnly.tsx     # Client-side wrapper
│   ├── i18n.ts               # Internationalization config
│   └── middleware.ts         # Locale routing middleware
├── messages/
│   ├── en.json              # English translations
│   └── pa.json              # Punjabi translations
├── public/
│   └── images/              # Historical images
└── package.json
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   - English: http://localhost:3000/en
   - Punjabi: http://localhost:3000/pa

## 📝 Content Management

### Adding New Historical Figures

1. **Update translation files** with new content
2. **Add images** to `public/images/`
3. **Update sections array** in the main page component

### Translation Structure

Each language file follows this structure:
```json
{
  "navigation": {
    "title": "Site title",
    "themeToggle": "Theme toggle text",
    "progress": "Progress text",
    "of": "Of text"
  },
  "sections": {
    "sectionId": {
      "title": "Section title",
      "content": "HTML content",
      "imageDetails": {
        "title": "Image details title",
        "artist": "Artist label",
        "size": "Size label", 
        "type": "Type label"
      }
    }
  },
  "imageDetails": {
    "sectionId": {
      "artist": "Artist name",
      "size": "Image size",
      "type": "Art type"
    }
  },
  "footer": {
    "copyright": "Copyright text",
    "description": "Site description"
  }
}
```

## 🌐 Deployment

The website is optimized for deployment on Vercel, Netlify, or any static hosting platform that supports Next.js.

### Environment Variables

No environment variables are required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add translations for new languages
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Sikh community for preserving and sharing this rich history
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first styling approach
