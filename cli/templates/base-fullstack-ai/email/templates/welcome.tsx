import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  userFirstname?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      {/* SUBJECT LINE:
          • Welcome emails get 50%+ open rates (4x higher than regular)
          • Use: "Welcome to [Brand], [Name]" or "Your account is ready"
          • Test emojis - can increase opens by 20%
          × Avoid: "Thank you for subscribing" */}
      <Preview>Welcome! Get started with your account</Preview>

      <Container style={container}>
        <Img
          src={`${baseUrl}/static/logo.png`}
          width="40"
          height="40"
          alt="Your App"
          style={logo}
        />

        {/* HEADING: "Welcome" is clear and creates immediate connection */}
        <Heading style={heading}>Welcome to [Your Brand]</Heading>

        {/* GREETING: Use name when available. Match tone to brand. First impression! */}
        <Text style={text}>Hi {userFirstname || "there"},</Text>

        {/* OPENING: Get to value immediately (1-2 sentences)
            Newsletter: "Here's your weekly insights"
            Free trial: "Your 14-day trial starts now"
            New account: "Your workspace is ready" */}
        <Text style={text}>
          Thanks for joining us! Your account is now active and ready to use.
        </Text>

        {/* CTA: Welcome emails get 5x more clicks
            • Specific text: "Start Free Trial", "Access Dashboard"
            • Link to most relevant next step
            • Consider multiple CTAs for different segments */}
        <Button style={button} href="https://app.example.com">
          Get started
        </Button>

        {/* QUICK WINS: 3 actionable steps to build momentum */}
        <Text style={text}>
          <strong>Here are 3 ways to get started:</strong>
        </Text>
        <Text style={text}>
          1. [Complete your profile] for a personalized experience
          <br />
          2. [Explore key features] to see what you can do
          <br />
          3. [Connect integrations] to supercharge your workflow
        </Text>

        {/* EXPECTATIONS: Tell what to expect, build trust */}
        <Text style={text}>
          We'll send you [product updates and helpful tips]. You can update your
          preferences anytime.
        </Text>

        {/* SUPPORT: Easy help reduces friction */}
        <Text style={supportText}>
          Need help? Reply to this email or visit example.com/support
        </Text>

        {/* WELCOME SERIES:
        
            SEQUENCE:
            Day 0: Welcome & deliver promise (this email)
            Day 2: Best content/tutorial
            Day 4: Customer success story
            Day 7: Special offer (if not converted)
            Day 10: Ask for feedback
            
            METRICS:
            🎯 Open rate: 50%+
            🎯 Click rate: 14%+
            🎯 Conversion: 2-10%
            
            A/B TESTS:
            • Trial length: 7 vs 14 vs 30 days
            • Single vs multiple CTAs
            • Long vs short content
            • Urgency vs evergreen
        */}
      </Container>

      {/* IMPLEMENTATION:
      
          CHECKLIST:
          ✓ Send within 5 min (74% expect this)
          ✓ Test mobile (48% open on mobile)
          ✓ Use signup source for personalization
          ✓ Set up conversion tracking
          ✓ Segment by audience
          
          CUSTOMIZE:
          → Replace "Get started" with specific action
          → Add actual support email/chat link
          → Include real social proof numbers
          → Match brand voice
          
          COMPLIANCE:
          ✓ Unsubscribe link (CAN-SPAM/GDPR)
          ✓ Double opt-in for EU
          ✓ Store consent records
      */}
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "User",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "45px",
};

const logo = {
  width: 40,
  height: 40,
  margin: "0 auto",
  display: "block",
  marginBottom: "30px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#000000",
  textAlign: "center" as const,
  margin: "0 0 16px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#404040",
  margin: "0 0 16px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "4px",
  color: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  margin: "16px auto 14px",
};

const supportText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6a6a6a",
  margin: "24px 0 0",
  textAlign: "center" as const,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};
