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

const InstagramIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 256"
    fill="currentColor"
  >
    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 640 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83a1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
  </svg>
);

// Default Logo Component - replace with your own
const DefaultLogo = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
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

// CUSTOMIZE THIS: Ship fast. Add real links when you have them.
const defaultMenuItems: MenuItem[] = [
  {
    title: "Product",
    links: [
      { text: "Features", url: "#features" },
      { text: "Pricing", url: "#pricing" },
    ],
  },
  {
    title: "About",
    links: [
      { text: "Contact", url: "mailto:your@email.com" },
      { text: "Blog", url: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Documentation", url: "/docs" },
      { text: "FAQ", url: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms", url: "/terms" },
      { text: "Privacy", url: "/privacy" },
    ],
  },
];

// CUSTOMIZE THIS: Add your real social links. Be where your users are.
const defaultSocialLinks: SocialLink[] = [
  { icon: <XIcon />, href: "https://x.com", label: "X (Twitter)" },
  {
    icon: <GithubIcon />,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: <DiscordIcon />,
    href: "https://discord.com",
    label: "Discord",
  },
  {
    icon: <InstagramIcon />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <LinkedInIcon />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

const defaultStatusItems: StatusItem[] = [];

export function Footer({
  logo = {
    component: DefaultLogo,
    title: "Your Logo",
    href: "/",
  },
  menuItems = defaultMenuItems,
  socialLinks = defaultSocialLinks,
  statusItems = defaultStatusItems,
  copyright = `© ${new Date().getFullYear()} Your Product`,
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
                  <LogoComponent className="transition h-5 w-auto -mt-0.5" />
                  <span className="font-sans">{copyright}</span>
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
