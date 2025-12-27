import React from "react";
import { PostMetadata } from "@/lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthorCard({
  author,
  date,
  readingTime,
}: {
  author: NonNullable<PostMetadata["author"]>;
  date: string;
  readingTime: number;
}) {
  return (
    <div className="flex items-center gap-4 py-8 border-y border-zinc-100 dark:border-zinc-800 my-12">
      <Avatar className="w-12 h-12 border border-zinc-200 dark:border-zinc-800">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-foreground">{author.name}</p>
        <p className="text-sm text-muted-foreground">
          Front End Web Developer | React.js & Next.js Specialist | Responsive
          UI/UX | Tailwind CSS | TypeScript | JavaScript
        </p>
      </div>
    </div>
  );
}
