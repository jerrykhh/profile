"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { GitHubIcon, LinkedInIcon, MailIcon, YouTubeIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { extLinkConfig, profileConfig, siteConfig } from "@/config/profile";
import { glassShell } from "@/lib/glass";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

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

type WalletCardId = "current" | "viutv" | "ha";

type WalletCard = {
  id: WalletCardId;
  peekLabel: string;
  peekMeta: string;
  muted?: boolean;
  accent?: string;
};

const PEEK = 56;
const EXPANDED_CURRENT = 392;
const EXPANDED_ROLE = 188;

const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.78 };

function walletCardsFromProfile(): WalletCard[] {
  const viutv =
    profileConfig.experience.find((item) => /viu/i.test(item.company)) ?? profileConfig.experience[0];
  const ha =
    profileConfig.experience.find((item) => /hospital authority/i.test(item.company)) ??
    profileConfig.experience.at(-1);

  return [
    {
      id: "current",
      peekLabel: siteConfig.brand,
      peekMeta: `${siteConfig.name} · ${siteConfig.location}`,
    },
    {
      id: "viutv",
      peekLabel: "ViuTV",
      peekMeta: viutv?.role ?? siteConfig.title,
      accent: "from-sky-500/25 via-white/10 to-transparent",
    },
    {
      id: "ha",
      peekLabel: "Hospital Authority",
      peekMeta: ha?.role ?? "Student Programmer",
      muted: true,
    },
  ];
}

function CardShell({
  muted,
  className,
  children,
}: {
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] text-foreground",
        muted
          ? "border border-white/25 bg-[linear-gradient(160deg,rgba(148,163,184,0.28)_0%,rgba(100,116,139,0.18)_50%,rgba(71,85,105,0.28)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_36px_rgba(15,23,42,0.14)] backdrop-blur-[18px] backdrop-saturate-125 ring-1 ring-inset ring-white/15"
          : cn(glassShell, "shadow-none"),
        muted && "text-foreground/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PeekStrip({ card }: { card: WalletCard }) {
  return (
    <div className="flex h-14 items-center justify-between gap-3 px-5">
      <div className="min-w-0">
        <p className="truncate font-heading text-sm font-semibold tracking-tight">{card.peekLabel}</p>
        <p className="truncate text-xs text-foreground/60">{card.peekMeta}</p>
      </div>
      <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.14em] text-foreground/45">
        {card.muted ? "Past" : card.id === "current" ? "Now" : "Role"}
      </span>
    </div>
  );
}

function CurrentCardBody() {
  return (
    <div className="flex h-full flex-col items-center px-6 pb-7 pt-6 text-center">
      <Avatar className="size-20 border border-white/60 shadow-[0_10px_30px_rgba(15,23,42,0.12)] md:size-24">
        <AvatarImage src={extLinkConfig.icon} alt={siteConfig.name} />
        <AvatarFallback>JK</AvatarFallback>
      </Avatar>
      <div className="mt-3.5 flex flex-col gap-1">
        <p className="font-heading text-3xl font-semibold tracking-tight md:text-[2.1rem]">
          {siteConfig.brand}
        </p>
        <p className="text-sm text-foreground/70 md:text-[0.95rem]">
          {siteConfig.name} · {siteConfig.title} · {siteConfig.location}
        </p>
      </div>

      <Separator className="my-5 bg-foreground/10" />

      <Button
        size="lg"
        className="h-10 min-w-[10.5rem] rounded-full border-transparent bg-foreground px-6 text-background hover:bg-foreground/90"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Website
      </Button>

      <div className="mt-5 flex w-full justify-center">
        <div className="inline-flex items-center justify-center gap-2.5" aria-label="Connect">
          {socialIcons.map(({ id, label, href, external, Icon }) => (
            <Button
              key={id}
              size="icon"
              variant="outline"
              className={cn(
                "size-11 shrink-0 rounded-full border-white/55 bg-white/35 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
                "backdrop-blur-md hover:bg-white/55 hover:text-foreground",
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
  muted,
}: {
  company: string;
  role: string;
  period: string;
  muted?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-between px-6 pb-6 pt-5">
      <div className="flex flex-col gap-2">
        <p
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.16em]",
            muted ? "text-foreground/45" : "text-foreground/55",
          )}
        >
          {muted ? "Past employment" : "Current role"}
        </p>
        <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">{role}</p>
        <p className={cn("text-base", muted ? "text-foreground/55" : "text-foreground/75")}>{company}</p>
      </div>
      <p className="pt-4 text-sm text-foreground/50">{period}</p>
    </div>
  );
}

/** Apple Wallet–style stacked / collapsing name cards for /ext/link. */
export function ContactNameCard() {
  const cards = useMemo(() => walletCardsFromProfile(), []);
  const [activeId, setActiveId] = useState<WalletCardId>("current");
  const reduceMotion = useReducedMotion();

  const viutv =
    profileConfig.experience.find((item) => /viu/i.test(item.company)) ?? profileConfig.experience[0];
  const ha =
    profileConfig.experience.find((item) => /hospital authority/i.test(item.company)) ??
    profileConfig.experience.at(-1)!;

  const activeIndex = cards.findIndex((card) => card.id === activeId);

  const stackHeight = useMemo(() => {
    return cards.reduce((total, card, index) => {
      if (index === activeIndex) {
        return total + (card.id === "current" ? EXPANDED_CURRENT : EXPANDED_ROLE);
      }
      return total + PEEK;
    }, 12);
  }, [activeIndex, cards]);

  const transition = reduceMotion ? { duration: 0 } : spring;

  let offset = 0;

  return (
    <div className="w-full max-w-md">
      <div className="relative w-full" style={{ height: stackHeight }} role="list" aria-label="Name cards">
        {cards.map((card, index) => {
          const isActive = card.id === activeId;
          const expandedHeight = card.id === "current" ? EXPANDED_CURRENT : EXPANDED_ROLE;
          const height = isActive ? expandedHeight : PEEK;
          const top = offset;
          offset += isActive ? expandedHeight : PEEK;

          const zIndex = isActive ? 30 : 10 + index;
          const scale = isActive ? 1 : 0.985 - index * 0.004;

          const selectCard = () => setActiveId(card.id);
          const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (isActive) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectCard();
            }
          };

          return (
            <motion.div
              key={card.id}
              role="listitem"
              data-wallet-card={card.id}
              aria-current={isActive ? "true" : undefined}
              tabIndex={isActive ? -1 : 0}
              aria-label={`${card.peekLabel}${isActive ? " (selected)" : " — select"}`}
              onClick={isActive ? undefined : selectCard}
              onKeyDown={onKeyDown}
              className={cn(
                "absolute inset-x-0 overflow-hidden rounded-[1.35rem] text-left outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                !isActive && "cursor-pointer",
              )}
              initial={false}
              animate={{
                top,
                height,
                scale,
                zIndex,
              }}
              transition={transition}
              style={{ transformOrigin: "50% 0%" }}
            >
              <CardShell muted={card.muted} className="relative">
                {card.accent && isActive ? (
                  <div
                    aria-hidden
                    className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", card.accent)}
                  />
                ) : null}

                <div className="relative z-[1] h-full">
                  <AnimatePresence initial={false} mode="popLayout">
                    {isActive ? (
                      <motion.div
                        key={`${card.id}-body`}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={
                          reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="h-full"
                      >
                        {card.id === "current" ? (
                          <CurrentCardBody />
                        ) : card.id === "viutv" ? (
                          <RoleCardBody
                            company="HK Television Entertainment Co Ltd (ViuTV)"
                            role={viutv.role}
                            period={viutv.period}
                          />
                        ) : (
                          <RoleCardBody
                            company="Hospital Authority · Storage & Backup Team"
                            role={ha.role}
                            period={ha.period}
                            muted
                          />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${card.id}-peek`}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.15 }}
                      >
                        <PeekStrip card={card} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardShell>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-foreground/50">Tap a card to bring it forward</p>
    </div>
  );
}
