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
    <div className="group relative flex flex-col md:flex-row items-center md:items-start gap-6 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 my-20 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <Avatar className="w-20 h-20 border-4 border-background shadow-xl shrink-0">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
          {author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center md:text-left space-y-3 relative">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Written by {author.name}</h3>
          <p className="text-sm font-medium text-primary">Senior Frontend Engineer</p>
        </div>
        
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Passionate about building exceptional digital experiences. Specialized in React, Next.js, and modern web architectures. I love sharing my knowledge through technical writing and open-source contributions.
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Social</span>
            <div className="flex gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
