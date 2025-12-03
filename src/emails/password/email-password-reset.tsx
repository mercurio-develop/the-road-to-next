import {
  Html,
  Head,
  Body,
  Section,
  Container,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello {toName}, you have request to reset your password. Click
                the button below to reset your password.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2"
              >
                Reset Password
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName:"ALEJANDRO FIDANZA",
  url:"http://localhost:3001/password-reset/vntodmlppd4vr27mcjlbfkwsmc6rtogp"
}

export default EmailPasswordReset;
