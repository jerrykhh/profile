"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { profileConfig, siteConfig } from "@/config/profile";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="pointer-events-none relative z-10 -mt-16 min-h-[min(100vh,58rem)] overflow-hidden border-b border-border/60 pt-16">
      <div className="relative mx-auto flex min-h-[min(calc(100vh-4rem),54rem)] w-full max-w-6xl items-center justify-center px-4 pb-24 pt-12 md:px-8 md:pb-28 md:pt-16">
        <motion.div
          className="pointer-events-auto flex w-full max-w-2xl flex-col items-center gap-5 text-center text-foreground"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div className="relative size-28 overflow-hidden rounded-full border border-white/55 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_48px_rgba(15,23,42,0.16)] ring-1 ring-black/5 backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_48px_rgba(0,0,0,0.45)] dark:ring-white/10 md:size-36">
            <Image
              src={siteConfig.profileIcon}
              alt={siteConfig.name}
              width={288}
              height={288}
              priority
              className="size-full object-cover"
            />
          </div>

          <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            {siteConfig.brand}
          </h1>
          <p className="font-heading text-2xl font-medium tracking-tight text-foreground md:text-4xl">
            {profileConfig.headline}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {profileConfig.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
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
              className="h-10 rounded-md border-foreground/20 bg-white/70 px-5 text-foreground backdrop-blur-sm hover:bg-white hover:text-foreground dark:border-white/20 dark:bg-white/10 dark:text-[#eef1f7] dark:hover:bg-white/15"
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
