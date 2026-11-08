"use client";

import Link from "next/link";
import { type ComponentType, type ReactNode, type SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { GitHubIcon, LinkedInIcon, MailIcon, YouTubeIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { extLinkConfig, profileConfig, siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const VIUTV_BLUE = "#0180f5";

const iconById: Record<string, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  email: MailIcon,
};

const socialIcons = ["github", "linkedin", "youtube", "email"].flatMap((id) => {
  const social = profileConfig.socials.find((item) => item.id === id);
  const Icon = iconById[id];
  if (!social || !Icon) return [];

  const href = id === "email" ? "/" : social.href;
  const external = href.startsWith("http");

  return [
    {
      id,
      label: id === "email" ? "Email — go to homepage" : social.label,
      href,
      external,
      Icon,
    },
  ];
});

type CardTone = "white" | "viutv" | "muted";

function CardShell({
  tone,
  cardId,
  children,
  className,
}: {
  tone: CardTone;
  cardId: "current" | "viutv" | "ha";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-wallet-card={cardId}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border shadow-[0_12px_36px_rgba(15,23,42,0.1)]",
        tone === "white" && "border-black/5 bg-white text-foreground",
        tone === "muted" && "border-black/5 bg-white text-foreground/55",
        tone === "viutv" && "border-transparent text-white",
        className,
      )}
      style={tone === "viutv" ? { backgroundColor: VIUTV_BLUE } : undefined}
    >
      {children}
    </div>
  );
}

function CurrentCardBody() {
  return (
    <div className="flex h-full flex-col items-center px-5 pb-6 pt-7 text-center md:px-6 md:pb-7">
      <Avatar className="size-16 border border-black/5 shadow-[0_10px_30px_rgba(15,23,42,0.1)] md:size-20">
        <AvatarImage src={extLinkConfig.icon} alt={siteConfig.name} />
        <AvatarFallback>JK</AvatarFallback>
      </Avatar>
      <div className="mt-3 flex flex-col gap-1">
        <p className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{siteConfig.brand}</p>
        <p className="text-sm leading-relaxed text-foreground/70">
          {siteConfig.name} · {siteConfig.title} · {siteConfig.location}
        </p>
      </div>

      <Separator className="my-4 bg-foreground/10 md:my-5" />

      <Button
        size="lg"
        className="h-10 min-w-[9.5rem] rounded-full border-transparent bg-foreground px-6 text-background hover:bg-foreground/90"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Website
      </Button>

      <div className="mt-4 flex w-full flex-1 items-end justify-center md:mt-5">
        <div className="inline-flex items-center justify-center gap-2" aria-label="Connect">
          {socialIcons.map(({ id, label, href, external, Icon }) => (
            <Button
              key={id}
              size="icon"
              variant="outline"
              className={cn(
                "size-10 shrink-0 rounded-full border-black/10 bg-white text-foreground md:size-11",
                "hover:bg-muted hover:text-foreground",
              )}
              nativeButton={false}
              render={
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={label}
                />
              }
            >
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleCardBody({
  company,
  role,
  period,
  tone,
}: {
  company: string;
  role: string;
  period: string;
  tone: Extract<CardTone, "viutv" | "muted">;
}) {
  const onBlue = tone === "viutv";

  return (
    <div className="flex h-full flex-col justify-between px-5 pb-6 pt-7 md:px-6 md:pb-7">
      <div className="flex flex-col gap-2.5">
        <p
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.16em]",
            onBlue ? "text-white/70" : "text-foreground/40",
          )}
        >
          {onBlue ? "Current role" : "Past employment"}
        </p>
        <p
          className={cn(
            "font-heading text-2xl font-semibold tracking-tight md:text-[1.7rem]",
            onBlue ? "text-white" : "text-foreground/60",
          )}
        >
          {role}
        </p>
        <p className={cn("text-sm leading-relaxed md:text-base", onBlue ? "text-white/85" : "text-foreground/45")}>
          {company}
        </p>
      </div>
      <p className={cn("pt-6 text-sm", onBlue ? "text-white/65" : "text-foreground/35")}>{period}</p>
    </div>
  );
}

/** Three equal, always-visible wallet-style name cards for /ext/link. */
export function ContactNameCard() {
  const reduceMotion = useReducedMotion();
  const viutv =
    profileConfig.experience.find((item) => /viu/i.test(item.company)) ?? profileConfig.experience[0];
  const ha =
    profileConfig.experience.find((item) => /hospital authority/i.test(item.company)) ??
    profileConfig.experience.at(-1)!;

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  const cards = [
    { id: "current" as const, tone: "white" as const },
    { id: "viutv" as const, tone: "viutv" as const },
    { id: "ha" as const, tone: "muted" as const },
  ];

  return (
    <div
      className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5"
      role="list"
      aria-label="Name cards"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          role="listitem"
          className="h-full min-h-[22rem] md:min-h-[24rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.06 }}
        >
          <CardShell tone={card.tone} cardId={card.id} className="h-full">
            {card.id === "current" ? (
              <CurrentCardBody />
            ) : card.id === "viutv" ? (
              <RoleCardBody
                company="HK Television Entertainment Co Ltd (ViuTV)"
                role={viutv.role}
                period={viutv.period}
                tone="viutv"
              />
            ) : (
              <RoleCardBody
                company="Hospital Authority · Storage & Backup Team"
                role={ha.role}
                period={ha.period}
                tone="muted"
              />
            )}
          </CardShell>
        </motion.div>
      ))}
    </div>
  );
}
