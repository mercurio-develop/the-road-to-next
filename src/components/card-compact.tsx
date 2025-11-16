import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type CardCompactProps = {
  classname?: string;
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};
const CardCompact = ({
                       classname,
  title,
  description,
  content,
  footer,
}: CardCompactProps) => {
  return (
    <Card className={classname}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent>{content}</CardContent>
      </CardHeader>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export { CardCompact };
