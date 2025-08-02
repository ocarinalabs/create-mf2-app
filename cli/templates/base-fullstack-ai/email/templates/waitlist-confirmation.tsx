import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WaitlistConfirmationEmailProps {
  userFirstname?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WaitlistConfirmationEmail = ({
  userFirstname,
}: WaitlistConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        {/* SUBJECT LINE:
            • "You're on the waitlist!" or "Welcome to [Product] waitlist"
            • Create anticipation: "Here's what happens next"
            • Build community: "You're part of something special"
            × Avoid generic thank you subjects */}
        <Preview>Welcome to the waitlist! Here's what happens next...</Preview>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/logo.png`}
            width="40"
            height="40"
            alt="Your App"
            style={logo}
          />

          {/* HEADING: Celebrate action + create community feeling */}
          <Heading style={heading}>You're on the waitlist!</Heading>

          {/* GREETING: Personal touch + immediate thanks = warm tone */}
          <Text style={text}>Hi {userFirstname || "there"},</Text>

          <Text style={text}>
            Thank you for joining our waitlist! We're building something special
            and your early interest means the world to us. You're now part of
            our founding community.
          </Text>

          {/* BENEFITS: Generic for flexibility, focus on early access + community */}
          <Text style={text}>
            <strong>As a waitlist member, you'll get:</strong>
          </Text>
          <Text style={text}>
            ✓ Early access when we launch
            <br />
            ✓ Special founding member pricing
            <br />
            ✓ Direct line to share feedback and shape the product
            <br />✓ Exclusive updates and behind-the-scenes content
          </Text>

          {/* TIMELINE: Clear expectations reduce anxiety. Specific dates when possible */}
          <Section>
            <Text style={subheading}>What happens next:</Text>

            <Text style={text}>
              <strong>This week:</strong> We'll send you a sneak peek of the
              product
              <br />
              <strong>Next 2 weeks:</strong> Exclusive beta feature previews
              <br />
              <strong>Launch day:</strong> You'll get 48-hour early access
              before public release
            </Text>
          </Section>

          <Hr style={hr} />

          {/* ENGAGEMENT: Regular touchpoints prevent list decay */}
          <Text style={text}>
            <strong>While you wait:</strong> Follow us on [Twitter/LinkedIn] for
            daily updates and sneak peeks. Use #[YourHashtag] to connect with
            other early adopters.
          </Text>

          {/* SUPPORT: Shows accessibility even pre-launch */}
          <Text style={supportText}>
            Need help? Reply to this email or visit example.com/support
          </Text>
        </Container>

        {/* WAITLIST SERIES:
        
            SEQUENCE:
            This email: Thank + set expectations
            Week 1: Product sneak peek
            Week 2: Founder story
            Week 3: Community spotlight
            Pre-launch: Early access + pricing
            
            TIMING:
            → Confirm within 5 min
            → Weekly updates
            → 2-3x/week near launch
            
            CONVERSION:
            📈 Waitlist→customer: 5-25%
            📈 Community building: 2x engagement
            📈 Early bird pricing: 20-30% discount
            📈 Exclusive access drives urgency
        */}
      </Body>

      {/* IMPLEMENTATION:
      
          CHECKLIST:
          ✓ Send within 5 min
          ✓ Thank early interest
          ✓ Clear timeline
          ✓ Value of early adoption
          ✓ Regular updates plan
          
          METRICS:
          🎯 Signup→confirm: 95%+
          🎯 Open rate avg: 40%+
          🎯 Unsubscribe: <2%
          🎯 Waitlist→customer: 10%+
          
          MISTAKES TO AVOID:
          × Going silent (50%+ unsubscribes)
          × "Coming soon" vs "Q1 2024"
          × Over-promising features
          × Not gathering feedback
          
          A/B TESTS:
          • Subject: gratitude vs excitement
          • Frequency: weekly vs bi-weekly
          • Benefits: access vs pricing vs input
          • Content: updates vs founder notes
      */}
    </Html>
  );
};

WaitlistConfirmationEmail.PreviewProps = {
  userFirstname: "User",
} as WaitlistConfirmationEmailProps;

export default WaitlistConfirmationEmail;

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

const subheading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#000000",
  margin: "24px 0 12px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "32px 0 24px",
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
