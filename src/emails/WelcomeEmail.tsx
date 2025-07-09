import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userEmail: string;
}

export const WelcomeEmail = ({ userEmail }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Daniel Madeley's newsletter!</Preview>
      <Body style={{ backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "20px" }}>
          <Section
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <Heading
              style={{
                color: "#111827",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Welcome to the newsletter!
            </Heading>

            <Text style={{ color: "#374151", fontSize: "16px" }}>
              Hi there! 👋
            </Text>

            <Text style={{ color: "#6b7280", fontSize: "14px" }}>
              Thanks for subscribing to my newsletter! I'm excited to share my
              thoughts on design, development, and the intersection of
              technology and creativity with you.
            </Text>

            <Text style={{ color: "#6b7280", fontSize: "14px" }}>
              Here's what you can expect:
            </Text>

            <Section
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "16px",
                margin: "16px 0",
              }}
            >
              <Text
                style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0" }}
              >
                📚 <strong>Latest Blog Posts</strong> - Deep dives into web
                development, design systems, and engineering
              </Text>
              <Text
                style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0" }}
              >
                🛠️ <strong>Tools & Resources</strong> - Curated tools and
                resources I'm using in my projects
              </Text>
              <Text
                style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0" }}
              >
                💡 <strong>Insights & Tips</strong> - Practical advice from my
                experience in the field
              </Text>
            </Section>

            <Section style={{ textAlign: "center", margin: "24px 0" }}>
              <Button
                href="https://danielcmadeley.vercel.app/blog"
                style={{
                  backgroundColor: "#1c1917",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Read Latest Posts
              </Button>
            </Section>

            <Section
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "16px",
                backgroundColor: "#f9fafb",
                marginTop: "24px",
              }}
            >
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                You're receiving this email because you subscribed to updates
                from Daniel Madeley.
              </Text>
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                Subscribed with: <strong>{userEmail}</strong>
              </Text>
              <Section style={{ textAlign: "center", margin: "12px 0" }}>
                <Link
                  href="https://danielcmadeley.vercel.app"
                  style={{
                    color: "#57534e",
                    fontSize: "12px",
                    marginRight: "16px",
                  }}
                >
                  Website
                </Link>
                <Link
                  href="https://danielcmadeley.vercel.app/blog"
                  style={{
                    color: "#57534e",
                    fontSize: "12px",
                    marginRight: "16px",
                  }}
                >
                  Blog
                </Link>
                <Link
                  href="https://danielcmadeley.vercel.app/feeds"
                  style={{ color: "#57534e", fontSize: "12px" }}
                >
                  RSS Feeds
                </Link>
              </Section>
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: "10px",
                  textAlign: "center",
                }}
              >
                © {new Date().getFullYear()} Daniel Madeley. All rights
                reserved.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  userEmail: "example@email.com",
} as WelcomeEmailProps;

export default WelcomeEmail;
