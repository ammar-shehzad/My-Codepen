import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardImageProps {
  myFile?: string | any;
}

export function CardImage({ myFile }: CardImageProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video " />

      <div
        className="rounded-2xl w-full h-[30vh]"
        style={
          {
            backgroundColor: "white",
            "--tw-bg-opacity": "1",
          } as React.CSSProperties
        }
      >
        <div
          className="editor-output relative text-black p-2 z-20 w-full h-full overflow-auto"
          dangerouslySetInnerHTML={{ __html: myFile.Html || "" }}
        />
      </div>

      {/* <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      /> */}
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{myFile.BookName}</CardTitle>
        <CardDescription>
          <p className="capitalize">{myFile.userName}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/viewcode/${myFile.id}`}>View Code</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
