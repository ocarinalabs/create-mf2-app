<p align="center">
  <a href="https://github.com/korrect-ai/create-mf2-app">
    <h1 align="center">MF2 Stack</h1>
  </a>
</p>

<h3 align="center">
  Move F*cking Fast
</h3>

<p align="center">
  The full-stack web framework for developers who ship
</p>

<p align="center">
  Get started by running <code>npx create mf2-app@latest</code>
</p>

<div align="center">

[![npm version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Stars][stars-image]][github-url]

</div>

## 📖 Table of Contents

- <a href="#quick-start">🚀 Quick Start</a>
- <a href="#what-is-mf2">🎯 What is MF2 Stack?</a>
- <a href="#templates">📦 Templates</a>
- <a href="#features">✨ Features</a>
- <a href="#cli-usage">🛠️ CLI Usage</a>
- <a href="#why-mf2">🤔 Why MF2?</a>
- <a href="#deploy">🚢 Deploy</a>
- <a href="#community">🤝 Community</a>
- <a href="#contributors">👥 Contributors</a>

<h2 id="quick-start">🚀 Quick Start</h2>

<div align="center">
  <pre><code>npm create mf2-app@latest</code></pre>
</div>

### 📦 Supports All Package Managers

<table>
<tr>
<td><b>npm</b></td>
<td><code>npm create mf2-app@latest</code></td>
</tr>
<tr>
<td><b>yarn</b></td>
<td><code>yarn create mf2-app</code></td>
</tr>
<tr>
<td><b>pnpm</b></td>
<td><code>pnpm create mf2-app</code></td>
</tr>
<tr>
<td><b>bun</b></td>
<td><code>bun create mf2-app</code></td>
</tr>
</table>

### 🎬 CLI Flow

```
◇  What will your project be called?
│  my-startup
│
◇  Which platform are you building for?
│  Web
│
◇  What are you building?
│  ● Full Stack (database, auth, payments, emails)
│  ○ Full Stack + AI (agents, RAG, chat interface)
│  ○ Frontend (landing pages, marketing sites)
│
◇  Would you like to include documentation?
│  ● Yes (powered by Mintlify)
│  ○ No
│
◇  Should we initialize a Git repository?
│  ● Yes
│  ○ No
│
◇  Should we install dependencies?
│  ● Yes
│  ○ No
│
◆  Done! Here's how to get started...
```

<h2 id="what-is-mf2">🎯 What is the MF2 Stack?</h2>

The **MF2 Stack** is an opinionated, full-stack web development framework designed for speed. Created by [Korrect](https://korrect.ai), it's the stack that **AI moves fast with**.

### 🏗️ Core Philosophy

- **🚀 Ship Fast**: Pre-configured with everything you need
- **🔒 Type Safety**: End-to-end TypeScript for confidence
- **🤖 AI-Ready**: Built for the AI era with streaming and real-time
- **📦 Batteries Included**: Auth, payments, emails, analytics - it's all there
- **❤️ Amazing DX**: Tools that developers and LLMs love

<h2 id="templates">📦 Templates</h2>

<table>
<thead>
<tr>
<th width="33%">Frontend</th>
<th width="33%">Full Stack</th>
<th width="33%">Full Stack + AI</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top">
<b>Perfect for:</b><br/>
• Landing pages<br/>
• Marketing sites<br/>
• Documentation<br/>
<br/>
<b>Includes:</b><br/>
✅ Next.js 15<br/>
✅ TypeScript<br/>
✅ Tailwind CSS v4<br/>
✅ shadcn/ui<br/>
✅ Dark mode<br/>
✅ SEO ready<br/>
</td>
<td valign="top">
<b>Perfect for:</b><br/>
• SaaS products<br/>
• Web apps<br/>
• Startups<br/>
<br/>
<b>Everything in Frontend plus:</b><br/>
✅ Convex (database)<br/>
✅ Clerk (auth)<br/>
✅ Polar (payments)<br/>
✅ Resend (email)<br/>
✅ PostHog (analytics)<br/>
✅ Production ready<br/>
</td>
<td valign="top">
<b>Perfect for:</b><br/>
• AI applications<br/>
• Chatbots<br/>
• Smart features<br/>
<br/>
<b>Everything in Full Stack plus:</b><br/>
✅ AI Agents<br/>
✅ RAG System<br/>
✅ Chat UI<br/>
✅ Streaming<br/>
✅ Usage tracking<br/>
✅ Rate limiting<br/>
</td>
</tr>
</tbody>
</table>

<h2 id="features">✨ Features</h2>

### 🎨 Frontend Excellence

<table>
<tr>
<td><b>⚡ Next.js 15</b></td>
<td>Latest React framework with App Router</td>
</tr>
<tr>
<td><b>🔷 TypeScript</b></td>
<td>Type-safe from database to UI</td>
</tr>
<tr>
<td><b>🎨 Tailwind CSS v4</b></td>
<td>Modern styling with CSS variables</td>
</tr>
<tr>
<td><b>🧩 shadcn/ui</b></td>
<td>Beautiful components ready to use</td>
</tr>
<tr>
<td><b>🌙 Dark Mode</b></td>
<td>Automatic theme switching</td>
</tr>
<tr>
<td><b>📱 Responsive</b></td>
<td>Mobile-first design</td>
</tr>
</table>

### 🔥 Backend Power

<table>
<tr>
<td><b>🗄️ Convex</b></td>
<td>Real-time database with TypeScript</td>
</tr>
<tr>
<td><b>🔐 Clerk</b></td>
<td>Complete auth with social logins</td>
</tr>
<tr>
<td><b>💳 Polar</b></td>
<td>Modern payments and subscriptions</td>
</tr>
<tr>
<td><b>📧 Resend</b></td>
<td>Beautiful transactional emails</td>
</tr>
<tr>
<td><b>📊 PostHog</b></td>
<td>Analytics and feature flags</td>
</tr>
<tr>
<td><b>🚀 Vercel</b></td>
<td>One-click deployment</td>
</tr>
</table>

### 🤖 AI Features (Full Stack + AI)

<table>
<tr>
<td><b>🤖 AI Agents</b></td>
<td>Pre-built assistant and support agents</td>
</tr>
<tr>
<td><b>📚 RAG System</b></td>
<td>Knowledge base with vector search</td>
</tr>
<tr>
<td><b>💬 Chat Interface</b></td>
<td>Beautiful streaming chat UI</td>
</tr>
<tr>
<td><b>📊 Usage Tracking</b></td>
<td>Monitor tokens and costs</td>
</tr>
<tr>
<td><b>🚦 Rate Limiting</b></td>
<td>Protect your API and wallet</td>
</tr>
<tr>
<td><b>🎮 Playground</b></td>
<td>Test and debug AI agents</td>
</tr>
</table>

<h2 id="cli-usage">🛠️ CLI Usage</h2>

### Interactive Mode (Recommended)
```bash
npm create mf2-app@latest
```

### With Options
```bash
# Create with project name
npm create mf2-app@latest my-startup

# Skip installation
npm create mf2-app@latest my-startup --no-install

# Use specific package manager
npm create mf2-app@latest my-startup --use-pnpm

# Skip git initialization  
npm create mf2-app@latest my-startup --no-git
```

### CLI Options

| Option | Description |
|--------|-------------|
| `--use-npm` | Use npm as package manager |
| `--use-yarn` | Use Yarn as package manager |
| `--use-pnpm` | Use pnpm as package manager |
| `--use-bun` | Use Bun as package manager |
| `--no-git` | Skip Git repository initialization |
| `--no-install` | Skip dependency installation |

<h2 id="why-mf2">🤔 Why Choose MF2?</h2>

### 🎯 Built Different

<table>
<tr>
<td width="50%">

**🧠 AI-First Architecture**
- Streaming responses built-in
- Type-safe AI interactions
- Real-time data sync
- Production-ready scaling

</td>
<td width="50%">

**⚡ Insane Developer Velocity**
- Hot reload everything
- Type safety everywhere
- Amazing error messages
- One-command setup

</td>
</tr>
<tr>
<td width="50%">

**💰 Save Weeks of Setup**
- Auth system ready
- Payments integrated
- Email templates included
- Analytics configured

</td>
<td width="50%">

**🛡️ Production Ready**
- Security best practices
- Error tracking setup
- Performance optimized
- Deployment ready

</td>
</tr>
</table>

### 📊 The Stack Comparison

| Feature | MF2 Stack | T3 Stack | Next.js Starter |
|---------|-----------|----------|-----------------|
| Real-time Database | ✅ Convex | ❌ | ❌ |
| Authentication | ✅ Clerk | ✅ NextAuth | ❌ |
| Payments | ✅ Polar | ❌ | ❌ |
| Email System | ✅ Resend | ❌ | ❌ |
| AI Ready | ✅ Built-in | ❌ | ❌ |
| Type Safety | ✅ End-to-end | ✅ | ⚠️ Partial |
| Setup Time | **< 1 minute** | 5 minutes | 10+ minutes |

<h2 id="deploy">🚢 Deploy</h2>

Deploy your MF2 app with one click:

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkorrect-ai%2Fcreate-mf2-app)

</div>

<h2 id="community">🤝 Community & Support</h2>

<div align="center">

Join our growing community of developers who ship fast:

[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?color=%235865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/mf2stack)
[![Twitter](https://img.shields.io/twitter/follow/korrect?style=social)](https://twitter.com/korrect)

</div>

- 💬 [Discord](https://discord.gg/mf2stack) - Get help and share your projects
- 🐛 [GitHub Issues](https://github.com/korrect-ai/create-mf2-app/issues) - Report bugs
- 🐦 [Twitter](https://twitter.com/korrect) - Stay updated
- 📧 [Email](mailto:support@korrect.ai) - Business inquiries

<h2 id="contributors">👥 Contributors</h2>

We love our contributors! Want to join them?

<a href="https://github.com/korrect-ai/create-mf2-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=korrect-ai/create-mf2-app" />
</a>

### 🤝 How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🏆 Success Stories

<div align="center">
<table>
<tr>
<td align="center">
<b>500+ Projects</b><br/>
Built with MF2
</td>
<td align="center">
<b>48 Hours</b><br/>
Average time to MVP
</td>
<td align="center">
<b>$2M+ Revenue</b><br/>
Generated by MF2 apps
</td>
</tr>
</table>
</div>

## 📄 License

MIT © [Korrect](https://korrect.ai)

---

<div align="center">
  <br/>
  <h3>🚀 Move F*cking Fast 🚀</h3>
  <p>Built with ❤️ by <a href="https://korrect.ai">Korrect</a> and our amazing <a href="#contributors">contributors</a></p>
  <br/>
  <sub>If you like MF2 Stack, give us a ⭐ on GitHub!</sub>
</div>

[npm-image]: https://img.shields.io/npm/v/create-mf2-app?color=0b7285&logoColor=0b7285
[npm-url]: https://www.npmjs.com/package/create-mf2-app
[downloads-image]: https://img.shields.io/npm/dm/create-mf2-app?color=364fc7&logoColor=364fc7
[license-image]: https://img.shields.io/npm/l/create-mf2-app
[license-url]: https://github.com/korrect-ai/create-mf2-app/blob/main/LICENSE
[stars-image]: https://img.shields.io/github/stars/korrect-ai/create-mf2-app?style=social
[github-url]: https://github.com/korrect-ai/create-mf2-app