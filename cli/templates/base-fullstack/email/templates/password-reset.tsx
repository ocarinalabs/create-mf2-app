import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const PasswordResetEmail = ({
  userFirstname,
  resetPasswordLink,
}: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        {/* SUBJECT: "Reset Your [Brand] Password" 
            Sender: support@ or security@ (not noreply@) */}
        <Preview>Reset your app password in 30 seconds</Preview>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/logo.png`}
            width="40"
            height="40"
            alt="Your App"
            style={logo}
          />
          <Section>
            {/* HEADING: Clear & direct - users need clarity when locked out */}
            <Heading style={heading}>Reset your password</Heading>

            {/* GREETING: Use name when available, "Hi there" as fallback */}
            <Text style={text}>Hi {userFirstname || "there"},</Text>

            {/* OPENING: Get to the point quickly
                B2B: "Let's get you back to work"
                E-commerce: "Let's get you shopping again"
                Finance: "Let's restore your secure access" */}
            <Text style={text}>
              We received a password reset request for your account. Let's get
              you back in quickly and securely.
            </Text>

            {/* RESET BUTTON:
                • Prominent & mobile-friendly (44px+ touch target)
                • Text options: "Reset Password", "Create New Password"
                • Technical: HTTPS + single-use tokens */}
            <Button style={button} href={resetPasswordLink}>
              Reset Password
            </Button>

            {/* EXPIRATION:
                15 min = High security (banking)
                1 hour = Standard
                24 hours = Low security */}
            <Text style={smallText}>This code is valid for 1 hour.</Text>

            {/* FALLBACK: Some clients break buttons - always provide plain text link */}
            <Text style={text}>
              <strong>Button not working?</strong> Copy and paste this link
              instead:
              <br />
              <Link href={resetPasswordLink} style={link}>
                {resetPasswordLink}
              </Link>
            </Text>

            {/* NOT REQUESTED: Tell them to ignore, avoid alarming language */}
            <Text style={securityText}>
              If you didn't request this email, there's nothing to worry about,
              you can safely ignore it.
            </Text>

            {/* AFTER RESET: Tell what happens next (e.g., "access dashboard") */}

            {/* SIGNATURE: Use name/team/company - match brand style */}

            {/* REQUEST INFO (OPTIONAL):
                - Shows when/where reset was requested
                - Add IP/location in production for security
                - Uncomment below to include request details:
                
            <Text style={smallText}>
              <strong>Request details:</strong>
              <br />
              Time:{" "}
              {new Date().toLocaleString("en-US", {
                timeZone: "America/New_York",
              })}
              <br />
              IP: {requestIP} | Location: {requestLocation}
            </Text>
            */}

            {/* SUPPORT: Reply-to email is easiest */}
            <Text style={supportText}>
              Need help? Reply to this email or visit example.com/support
            </Text>
          </Section>

          {/* IMPLEMENTATION CHECKLIST:
          
              SETUP:
              ✓ Transactional service (not marketing)
              ✓ Sender: support@ or security@
              ✓ Configure SPF, DKIM, DMARC
              
              SECURITY:
              ✓ HTTPS + single-use tokens
              ✓ 1 hour expiration (standard)
              ✓ Rate limit: 3 attempts/hour
              × Never include passwords
              
              TESTING:
              ✓ Mobile: 44px+ button, 16px+ text
              ✓ Dark mode support
              ✓ Gmail, Outlook, Apple Mail
              ✓ "Didn't request" flow
              
              AVOID:
              × Marketing content
              × URL shorteners
              × Revealing if email exists
              × Alarming language
          */}
        </Container>
      </Body>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  userFirstname: "User",
  resetPasswordLink: "https://app.example.com/reset-password?token=abc123",
} as PasswordResetEmailProps;

export default PasswordResetEmail;

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
  padding: "45px",
  margin: "0 auto",
  maxWidth: "560px",
};

const logo = {
  margin: "0 auto 30px",
  display: "block",
};

const text = {
  fontSize: "16px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  color: "#404040",
  lineHeight: "26px",
  margin: "0 0 16px",
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

const smallText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6a6a6a",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const link = {
  color: "#000000",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
  fontSize: "14px",
};

const securityText = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#6a6a6a",
  margin: "24px 0 16px",
  textAlign: "center" as const,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const supportText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6a6a6a",
  margin: "0",
  textAlign: "center" as const,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
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
