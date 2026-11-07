"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { HeroShader } from "@/components/hero-shader";
import { Button } from "@/components/ui/button";
import { profileConfig, siteConfig } from "@/config/profile";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="relative isolate -mt-16 min-h-[min(100vh,58rem)] overflow-hidden border-b border-border/60 pt-16">
      <HeroShader />
      <div className="relative z-10 mx-auto flex min-h-[min(calc(100vh-4rem),54rem)] w-full max-w-6xl flex-col justify-center px-4 pb-24 pt-12 md:px-8 md:pb-28 md:pt-16">
        <motion.div
          className="flex max-w-3xl flex-col gap-5 text-foreground"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <p className="font-heading text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            {siteConfig.brand}
          </p>
          <h1 className="max-w-2xl font-heading text-2xl font-medium tracking-tight text-foreground md:text-4xl">
            {profileConfig.headline}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {profileConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="lg"
              className="h-10 rounded-md border-transparent bg-foreground px-5 text-background hover:bg-foreground/90"
              nativeButton={false}
              render={<Link href="/ext/link" />}
            >
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-10 rounded-md border-foreground/20 bg-white/70 px-5 text-foreground backdrop-blur-sm hover:bg-white hover:text-foreground"
              nativeButton={false}
              render={<Link href="/project" />}
            >
              View Projects
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
