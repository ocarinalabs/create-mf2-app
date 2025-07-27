"use client";

import { BlurFade } from "@/components/ui/blur-fade";
const XIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 496 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const DefaultLogo = ({ className }: { className?: string }) => (
  <span
    className={className}
    style={{
      fontSize: "24px",
      lineHeight: 1,
      fontWeight: "bold",
      display: "inline-block",
      transform: "translateY(-2px)",
    }}
  >
    ❃
  </span>
);

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface SocialLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}

interface StatusItem {
  icon: React.ReactElement;
  text: string;
  href?: string;
}

interface FooterProps {
  logo?: {
    component: React.ComponentType<{ className?: string }>;
    title: string;
    href: string;
  };
  menuItems?: MenuItem[];
  socialLinks?: SocialLink[];
  statusItems?: StatusItem[];
  copyright?: string;
}

const defaultMenuItems: MenuItem[] = [
  {
    title: "Product",
    links: [
      { text: "Stack", url: "#stack" },
      { text: "CLI", url: "https://github.com/korrect-ai/create-mf2-app" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        text: "Documentation",
        url: "https://github.com/korrect-ai/create-mf2-app#readme",
      },
      { text: "FAQ", url: "#faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "GitHub", url: "https://github.com/korrect-ai/create-mf2-app" },
      {
        text: "Issues",
        url: "https://github.com/korrect-ai/create-mf2-app/issues",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "Korrect", url: "https://korrect.ai" },
      { text: "Blog", url: "https://korrect.ai/blog" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  {
    icon: <GithubIcon />,
    href: "https://github.com/korrect-ai/create-mf2-app",
    label: "GitHub",
  },
  {
    icon: <XIcon />,
    href: "https://x.com/korrectai",
    label: "X (Twitter)",
  },
];

const defaultStatusItems: StatusItem[] = [];

export function Footer({
  logo = {
    component: DefaultLogo,
    title: "MF2",
    href: "/",
  },
  menuItems = defaultMenuItems,
  socialLinks = defaultSocialLinks,
  statusItems = defaultStatusItems,
  copyright = `© ${new Date().getFullYear()} MF2`,
}: FooterProps) {
  const LogoComponent = logo.component;

  return (
    <footer className="w-full bg-transparent text-foreground flex flex-col items-center justify-center px-4 pt-16 pb-8">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="relative">
          <BlurFade delay={0.1} inView={true}>
            <div className="grid grid-cols-2 gap-12 lg:gap-20 text-base lg:grid-cols-4">
              {menuItems.map((section, sectionIdx) => (
                <ul key={sectionIdx} className="space-y-3">
                  <li className="font-sans text-muted-foreground text-sm uppercase tracking-wider mb-4">
                    {section.title}
                  </li>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        className="text-foreground hover:text-primary transition-colors font-sans"
                        href={link.url}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.15} inView={true}>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-0 border-t border-dashed border-border mt-12 pt-8">
              <div className="flex flex-col space-y-4 text-sm lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                {statusItems.map((item, idx) => (
                  <a
                    key={idx}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 py-1 text-foreground hover:text-primary transition-colors cursor-pointer"
                    href={item.href || "#"}
                  >
                    <span className="text-green-500 group-hover:text-primary">
                      {item.icon}
                    </span>
                    <span className="font-sans">{item.text}</span>
                  </a>
                ))}
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm">
                  <LogoComponent className="transition" />
                  <span className="font-sans">
                    {copyright} • Built by{" "} 
                    <a
                      href="https://korrect.ai"
                      className="underline hover:text-foreground transition-colors"
                    >
                      ⊨ Korrect
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex space-x-4 text-foreground">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    href={social.href}
                    aria-label={social.label}
                  >
                    <div className="size-7 flex items-center justify-center">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </footer>
  );
}
