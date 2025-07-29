# create-mf2-app

<div align="center">
  <h1>Move F*cking Fast</h1>
  <p><strong>The stack AI moves fast with.</strong></p>
  <p>For devs who want to ship fast. Build with modern tools developers and LLMs love.</p>
  
  <p>
    <a href="https://www.npmjs.com/package/create-mf2-app">
      <img alt="npm version" src="https://img.shields.io/npm/v/create-mf2-app.svg?style=flat-square" />
    </a>
    <a href="https://github.com/korrect-ai/create-mf2-app/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/npm/l/create-mf2-app.svg?style=flat-square" />
    </a>
    <a href="https://github.com/korrect-ai/create-mf2-app">
      <img alt="GitHub stars" src="https://img.shields.io/github/stars/korrect-ai/create-mf2-app?style=flat-square" />
    </a>
  </p>
</div>

---

## 🚀 Quick Start

Get started with a single command:

```bash
npm create mf2-app@latest
```

Also works with:
```bash
yarn create mf2-app       # Yarn
pnpm create mf2-app       # pnpm
bunx create-mf2-app       # Bun
```

## 🎯 What is the MF2 Stack?

The **Move F*cking Fast Stack** is an opinionated, full-stack, typesafe web development starter kit created by [Korrect](https://korrect.ai). 

Stop overthinking your stack, we already did that for you. The MF2 Stack gives you a production-ready foundation so you can focus on what makes your product unique.

### Philosophy

- **Ship Fast**: Pre-configured tools that work together seamlessly
- **Type Safety**: End-to-end TypeScript for reliability
- **AI-First**: Optimized for AI development with streaming, type safety, and real-time data
- **Production Ready**: Authentication, payments, analytics, and deployment configured from day one
- **Developer Experience**: Modern tools that developers and LLMs love to work with

## ✨ Features

### 🎨 Frontend Stack
Every MF2 app includes:

- ⚡ **[Next.js 15](https://nextjs.org)** - React framework with server components, app router, and production-ready features
- 🔷 **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript that catches errors during development
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework for rapid UI development
- 🧩 **[shadcn/ui](https://ui.shadcn.com)** - Beautifully designed components built with Radix UI and Tailwind CSS
- 🌙 **Dark Mode** - Theme switching with next-themes
- 📱 **Responsive** - Mobile-first design that works everywhere
- 🔍 **SEO Optimized** - Meta tags, sitemap, robots.txt configured

### 🔥 Fullstack Features
The SaaS template adds:

- 🔥 **[Convex](https://convex.dev)** - Real-time database with TypeScript support and automatic syncing
- 🔐 **[Clerk](https://clerk.com)** - Complete authentication solution with social logins and user management
- 💳 **[Polar](https://polar.sh)** - Modern payment infrastructure for SaaS and subscriptions
- ✉️ **[Resend](https://resend.com)** - Developer-friendly email API with great deliverability
- 📊 **[PostHog](https://posthog.com)** - Product analytics and feature flags in one platform
- 🚀 **[Vercel](https://vercel.com)** - Deployment platform optimized for Next.js applications
- 📚 **[Mintlify](https://mintlify.com)** - Beautiful documentation that's easy to maintain

## 📦 Templates

### Frontend Template
Perfect for landing pages, marketing sites, and documentation:

- Next.js 15 with App Router
- TypeScript with strict mode
- Tailwind CSS v4 with CSS variables
- Complete shadcn/ui component library
- Dark mode support
- SEO optimization
- Vercel Analytics ready

### Fullstack Template
Everything you need for a production SaaS:

- Everything from Frontend template
- **Authentication**: Clerk with social logins, magic links, and user management
- **Database**: Convex with real-time sync, TypeScript schemas, and serverless functions
- **Payments**: Polar integration with subscriptions and one-time payments
- **Email**: Resend for transactional emails with React Email templates
- **Analytics**: PostHog for product analytics and feature flags
- **Documentation**: Mintlify docs pre-configured
- **Monitoring**: Error tracking and performance monitoring ready

## 🛠️ CLI Usage

### Basic Usage
```bash
# Interactive mode (recommended)
npm create mf2-app@latest

# With project name
npm create mf2-app@latest my-app

# With flags
npm create mf2-app@latest my-app --use-pnpm --no-git
```

### CLI Options
- `--use-npm` - Use npm as package manager
- `--use-yarn` - Use Yarn as package manager  
- `--use-pnpm` - Use pnpm as package manager
- `--use-bun` - Use Bun as package manager
- `--no-git` - Skip git initialization
- `--no-install` - Skip dependency installation

### Coming Soon
- 📱 **Mobile Template** - React Native with Expo
- 🖥️ **Desktop Template** - Electron with Next.js

## 🤔 Why MF2 Stack?

### Optimized for AI Development
- **Type Safety**: TypeScript ensures AI responses match expected schemas
- **Real-time Streaming**: Convex handles streaming responses perfectly
- **Modular Architecture**: Easy to integrate OpenAI, Anthropic, or any AI service
- **Production Ready**: Handle scale from day one

### Stop Decision Fatigue
We've made the hard decisions so you don't have to:
- Best-in-class tools that work together
- Consistent patterns across the stack
- Production-ready configurations
- Regular updates with the latest versions

### Built for Speed
- **Development Speed**: Hot reload, type safety, and great DX
- **Performance**: Optimized builds, edge functions, and caching
- **Time to Market**: Ship in days, not months

## ❓ FAQ

### Is it free to use?
Yes, create-mf2-app is completely free and open source. The individual services in the stack have their own pricing, but most offer generous free tiers perfect for getting started.

### What license is this under?
MIT License. Use it for anything - personal projects, commercial products, or client work. No attribution required.

### What's included?
**Frontend template**: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, dark mode, SEO optimization, and Vercel Analytics. 

**Fullstack template**: Everything above plus Convex, Clerk, Polar, Resend, PostHog, and Mintlify. All pre-configured and production-ready.

### Is this optimized for AI development?
Yes. The stack is designed with AI-first development in mind. TypeScript provides type safety for AI responses, Convex handles real-time data streaming, and the modular architecture makes it easy to integrate AI services like OpenAI, Anthropic, or Replicate.

## 🚀 Deploy

Deploy your MF2 app with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkorrect-ai%2Fcreate-mf2-app%2Ftree%2Fmain%2Fcli%2Ftemplates%2Fbase-fullstack&project-name=my-mf2-saas&repository-name=my-mf2-saas&env=CONVEX_DEPLOYMENT,NEXT_PUBLIC_CONVEX_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,CLERK_WEBHOOK_SECRET,CLERK_FRONTEND_API_URL,CLERK_JWT_ISSUER_DOMAIN,POLAR_ORGANIZATION_TOKEN,POLAR_WEBHOOK_SECRET,POLAR_SERVER,NEXT_PUBLIC_POLAR_ENABLED,NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID,NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,RESEND_API_KEY,RESEND_WEBHOOK_SECRET,RESEND_FROM_EMAIL,NEXT_PUBLIC_POSTHOG_KEY,NEXT_PUBLIC_POSTHOG_HOST,NEXT_PUBLIC_APP_URL&envDescription=Configure%20all%20required%20environment%20variables%20for%20Convex%2C%20Clerk%2C%20Polar%2C%20Resend%2C%20and%20PostHog.%20See%20.env.example%20for%20details&envLink=https%3A%2F%2Fgithub.com%2Fkorrect-ai%2Fcreate-mf2-app%2Fblob%2Fmain%2Fcli%2Ftemplates%2Fbase-fullstack%2F.env.example&demo-title=MF2%20Fullstack%20Template&demo-description=Production-ready%20SaaS%20starter%20with%20auth%2C%20payments%2C%20and%20real-time%20features)

## 🤝 Community & Support

- [Discord](https://discord.gg/mf2stack) - Join our community
- [GitHub](https://github.com/korrect-ai/create-mf2-app) - Report issues and contribute
- [Twitter](https://twitter.com/korrect) - Follow for updates

### Contributing

Got a suggestion? Want to add your favorite tool to the stack? We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Korrect](https://korrect.ai)

---

<div align="center">
  <p>Built with ❤️ by the team at <a href="https://korrect.ai">Korrect</a></p>
  <p><strong>Move F*cking Fast</strong></p>
</div>