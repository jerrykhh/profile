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
import { motion, useReducedMotion } from "motion/react";

import { GitHubIcon, LinkedInIcon, MailIcon, YouTubeIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { extLinkConfig, profileConfig, siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const VIUTV_BLUE = "#0180f5";
const CARD_HEIGHT = 352;
const PEEK = 58;

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

type CardId = "current" | "viutv" | "ha";
type CardTone = "white" | "viutv" | "muted";

type WalletCard = {
  id: CardId;
  tone: CardTone;
  peekTitle: string;
  peekMeta: string;
};

function CardShell({
  tone,
  cardId,
  children,
  className,
}: {
  tone: CardTone;
  cardId: CardId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-wallet-card={cardId}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border shadow-[0_14px_40px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_48px_rgba(0,0,0,0.55)]",
        // Personal pass: white by day, cool ink plate by night (not flat grey).
        tone === "white" &&
          "border-black/5 bg-white text-foreground dark:border-white/12 dark:bg-[#171c2a] dark:text-[#eef1f7]",
        // Past HA: white + muted ink by day; deeper plate + quieter type by night.
        tone === "muted" &&
          "border-black/5 bg-white text-foreground/55 dark:border-white/8 dark:bg-[#121620] dark:text-[#8b93a8]",
        // ViuTV keeps brand blue; slight lift on dark for punch against night mesh.
        tone === "viutv" && "border-transparent text-white dark:border-white/10",
        className,
      )}
      style={
        tone === "viutv"
          ? { backgroundColor: VIUTV_BLUE }
          : undefined
      }
    >
      {children}
    </div>
  );
}

function CurrentCardBody() {
  return (
    <div className="flex h-full flex-col items-center px-6 pb-7 pt-7 text-center">
      <Avatar className="size-20 border border-black/5 shadow-[0_10px_30px_rgba(15,23,42,0.1)] dark:border-white/15 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <AvatarImage src={extLinkConfig.icon} alt={siteConfig.name} />
        <AvatarFallback>JK</AvatarFallback>
      </Avatar>
      <div className="mt-3.5 flex flex-col gap-1">
        <p className="font-heading text-3xl font-semibold tracking-tight">{siteConfig.brand}</p>
        <p className="text-sm text-foreground/70 dark:text-[#eef1f7]/70">
          {siteConfig.name} · {siteConfig.title} · {siteConfig.location}
        </p>
      </div>

      <Separator className="my-5 bg-foreground/10 dark:bg-white/10" />

      <Button
        size="lg"
        className="h-10 min-w-[10.5rem] rounded-full border-transparent bg-foreground px-6 text-background hover:bg-foreground/90 dark:bg-[#eef1f7] dark:text-[#0b0d14] dark:hover:bg-white"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Website
      </Button>

      <div className="mt-5 flex w-full flex-1 items-end justify-center">
        <div className="inline-flex items-center justify-center gap-2.5" aria-label="Connect">
          {socialIcons.map(({ id, label, href, external, Icon }) => (
            <Button
              key={id}
              size="icon"
              variant="outline"
              className={cn(
                "size-11 shrink-0 rounded-full border-black/10 bg-white text-foreground",
                "hover:bg-muted hover:text-foreground",
                "dark:border-white/15 dark:bg-white/5 dark:text-[#eef1f7] dark:hover:bg-white/10",
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
    <div className="flex h-full flex-col justify-between px-6 pb-7 pt-7">
      <div className="flex flex-col gap-2.5">
        <p
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.16em]",
            onBlue ? "text-white/70" : "text-foreground/40 dark:text-[#8b93a8]/70",
          )}
        >
          {onBlue ? "Current role" : "Past employment"}
        </p>
        <p
          className={cn(
            "font-heading text-2xl font-semibold tracking-tight md:text-[1.75rem]",
            onBlue ? "text-white" : "text-foreground/60 dark:text-[#a7afc2]",
          )}
        >
          {role}
        </p>
        <p
          className={cn(
            "text-base leading-relaxed",
            onBlue ? "text-white/85" : "text-foreground/45 dark:text-[#8b93a8]",
          )}
        >
          {company}
        </p>
      </div>
      <p className={cn("pt-6 text-sm", onBlue ? "text-white/65" : "text-foreground/35 dark:text-[#6f778c]")}>
        {period}
      </p>
    </div>
  );
}

/** Apple Wallet–style overlapping vertical stack of equal-size name cards. */
export function ContactNameCard() {
  const reduceMotion = useReducedMotion();
  const [frontId, setFrontId] = useState<CardId>("current");

  const viutv =
    profileConfig.experience.find((item) => /viu/i.test(item.company)) ?? profileConfig.experience[0];
  const ha =
    profileConfig.experience.find((item) => /hospital authority/i.test(item.company)) ??
    profileConfig.experience.at(-1)!;

  const cards = useMemo<WalletCard[]>(
    () => [
      {
        id: "current",
        tone: "white",
        peekTitle: siteConfig.brand,
        peekMeta: `${siteConfig.name} · ${siteConfig.location}`,
      },
      {
        id: "viutv",
        tone: "viutv",
        peekTitle: "ViuTV",
        peekMeta: viutv.role,
      },
      {
        id: "ha",
        tone: "muted",
        peekTitle: "Hospital Authority",
        peekMeta: ha.role,
      },
    ],
    [ha.role, viutv.role],
  );

  // Front card sits on top; remaining cards keep original relative order for peeks below.
  const stackOrder = useMemo(() => {
    const front = cards.find((card) => card.id === frontId)!;
    const rest = cards.filter((card) => card.id !== frontId);
    return [front, ...rest];
  }, [cards, frontId]);

  const stackHeight = CARD_HEIGHT + PEEK * (cards.length - 1);
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

  return (
    <div className="w-full max-w-md">
      <div
        className="relative mx-auto w-full"
        style={{ height: stackHeight }}
        role="list"
        aria-label="Name cards"
      >
        {stackOrder.map((card, index) => {
          const isFront = card.id === frontId;
          const top = index * PEEK;
          const zIndex = 30 - index;

          const bringForward = () => setFrontId(card.id);
          const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (isFront) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              bringForward();
            }
          };

          return (
            <motion.div
              key={card.id}
              role="listitem"
              aria-current={isFront ? "true" : undefined}
              tabIndex={isFront ? -1 : 0}
              aria-label={`${card.peekTitle}${isFront ? " (front)" : " — bring forward"}`}
              onClick={isFront ? undefined : bringForward}
              onKeyDown={onKeyDown}
              className={cn(
                "absolute inset-x-0 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                !isFront && "cursor-pointer",
              )}
              style={{ height: CARD_HEIGHT }}
              initial={false}
              animate={{ top, zIndex }}
              transition={spring}
            >
              <CardShell tone={card.tone} cardId={card.id} className="h-full">
                {isFront ? (
                  <div className="h-full">
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
                  </div>
                ) : (
                  // Equal-height cards offset downward: the visible peek is the bottom strip.
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 flex h-[58px] items-center justify-between gap-3 px-5",
                      card.tone === "viutv"
                        ? "text-white"
                        : card.tone === "muted"
                          ? "text-foreground/70 dark:text-[#8b93a8]"
                          : "text-foreground dark:text-[#eef1f7]",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-heading text-sm font-semibold tracking-tight">
                        {card.peekTitle}
                      </p>
                      <p
                        className={cn(
                          "truncate text-xs",
                          card.tone === "viutv"
                            ? "text-white/75"
                            : card.tone === "muted"
                              ? "text-foreground/50 dark:text-[#6f778c]"
                              : "text-foreground/50 dark:text-[#eef1f7]/55",
                        )}
                      >
                        {card.peekMeta}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[0.65rem] uppercase tracking-[0.14em]",
                        card.tone === "viutv"
                          ? "text-white/60"
                          : card.tone === "muted"
                            ? "text-foreground/40 dark:text-[#6f778c]"
                            : "text-foreground/40 dark:text-[#eef1f7]/45",
                      )}
                    >
                      {card.id === "ha" ? "Past" : card.id === "viutv" ? "Role" : "Now"}
                    </span>
                  </div>
                )}
              </CardShell>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-foreground/50">Tap a card to bring it forward</p>
    </div>
  );
}
