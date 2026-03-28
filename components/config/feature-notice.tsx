import { InfoIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

type FeatureNoticeProps = {
  description: string;
  missingEnv?: string[];
  title: string;
  toggleEnv?: string;
};

export function FeatureNotice({
  description,
  title,
}: FeatureNoticeProps) {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
      </AlertDescription>
    </Alert>
  );
}
