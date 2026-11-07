import { Contact } from "@/features/contact/Contact";
import { Experience } from "@/features/experience/Experience";
import { SiteHeader } from "@/features/header/SiteHeader";
import { TabBar } from "@/features/header/TabBar";
import { Hero } from "@/features/hero/Hero";
import { IntroReel } from "@/features/intro/IntroReel";
import { StackCards } from "@/features/stack/StackCards";
import { Stage } from "@/features/stage/Stage";
import { SelectedWork } from "@/features/work/SelectedWork";
import { JsonLd } from "./json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <IntroReel />
      <main id="main">
        <Hero />
        <Stage />
        <StackCards />
        <Experience />
        <SelectedWork />
        <Contact />
      </main>
      <TabBar />
    </>
  );
}
