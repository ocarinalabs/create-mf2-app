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

interface VerificationCodeEmailProps {
  validationCode?: string;
  expiresInMinutes?: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VerificationCodeEmail = ({
  validationCode = "144833",
  expiresInMinutes = 10,
}: VerificationCodeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      {/* SUBJECT LINE:
          ✓ Direct phrases: "Verify Your Email Now" or "Confirm Your Account"
          ✓ Include code in preview text (mobile users can copy without opening)
          ✓ Keep under 50 characters for mobile
          × Avoid: "urgent", "free", excessive punctuation
          📊 Typical open rate: 80-95% */}
      <Preview>Your verification code: {validationCode}</Preview>

      <Container style={container}>
        <Img
          src={`${baseUrl}/static/logo.png`}
          width="40"
          height="40"
          alt="Your App"
          style={logo}
        />

        {/* HEADING:
            Simple & action-oriented. "Verify your email" outperforms creative alternatives.
            Users may be anxious → clarity helps */}
        <Heading style={heading}>Verify your email</Heading>

        {/* DUAL VERIFICATION:
            Always provide both button AND code - some mobile clients don't support buttons */}
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`https://app.example.com/verify?code=${validationCode}`}
          >
            Continue
          </Button>
        </Section>

        <Text style={paragraph}>
          You can also use the login verification code directly:
        </Text>

        <Section style={codeContainer}>
          <code style={code}>{validationCode}</code>
        </Section>

        {/* EXPIRATION:
            • 10 min = good balance (< 5 min causes panic, > 60 min security risk)
            • Say "valid for" not "expires in" (friendlier) */}
        <Text style={smallText}>
          This code is valid for {expiresInMinutes} minutes.
        </Text>

        {/* NEXT STEPS:
            Tell users what they'll access after verification.
            Replace [key feature] with your main value prop */}
        <Text style={paragraph}>
          <strong>After verification:</strong> You'll have full access to [key
          feature]
        </Text>

        {/* SECURITY:
            This reassurance reduces support tickets. Keep brief - long warnings increase anxiety */}
        <Text style={securityText}>
          If you didn't request this email, there's nothing to worry about, you
          can safely ignore it.
        </Text>

        {/* SUPPORT:
            Provide escape hatch for issues. Reply-to email is easiest */}
        <Text style={supportText}>
          Need help? Reply to this email or visit example.com/support
        </Text>

        {/* IMPLEMENTATION CHECKLIST:
        
            SETUP:
            ✓ Sender: verify@, hello@, or support@ (never noreply@)
            ✓ Mobile test: iOS Mail, Gmail app, Outlook mobile
            ✓ Size limit: < 102KB total
            ✓ Track: Open rate 80%+, completion 75%+
            
            CUSTOMIZE:
            → Replace [key feature] with your value prop
            → Update support.example.com
            → Consider brand color for button
            → Adjust expiration time for your security needs
            
            A/B TESTS:
            • Code in subject line vs not
            • Button text: "Verify Email" vs "Continue" vs "Confirm"
            • Urgency for signups with perks
        */}
      </Container>
    </Body>
  </Html>
);

VerificationCodeEmail.PreviewProps = {
  validationCode: "123456",
  expiresInMinutes: 10,
} as VerificationCodeEmailProps;

export default VerificationCodeEmail;

const logo = {
  width: 40,
  height: 40,
  margin: "0 auto",
  display: "block",
  marginBottom: "30px",
};

const main = {
  backgroundColor: "#f6f9fc", // Light gray helps email stand out in crowded inboxes
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  margin: "0 auto",
  maxWidth: "560px", // Works perfectly across all devices
  padding: "45px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#000000",
  textAlign: "center" as const,
  margin: "0 0 16px",
};

const paragraph = {
  margin: "0 0 16px",
  fontSize: "16px", // Minimum for accessibility
  lineHeight: "26px",
  color: "#404040",
  textAlign: "center" as const,
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000000", // Neutral, works with any brand
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px", // Meets 44x44px touch target
  margin: "0 auto",
};

const codeContainer = {
  background: "#f3f3f3", // Subtle gray improves readability (hex for Outlook)
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px", // Large for easy mobile reading
  fontWeight: 700,
  letterSpacing: "6px", // Prevents character confusion
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  display: "block",
  textAlign: "center" as const,
};

const securityText = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#6a6a6a",
  margin: "24px 0 16px",
  textAlign: "center" as const,
};

const smallText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6a6a6a",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const supportText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6a6a6a",
  margin: "0",
  textAlign: "center" as const,
};
