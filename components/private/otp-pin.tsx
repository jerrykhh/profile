"use client";

import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react";

const LENGTH = 6;

/**
 * OTP Variant C (shipped): six discrete digit cells with auto-advance + paste.
 * Variant D (rejected): single mono field with letter-spacing — less OTP-native.
 */
export function OtpPinInput(props: {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  id?: string;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: LENGTH }, (_, i) => props.value[i] ?? "");

  useEffect(() => {
    if (props.disabled) return;
    const firstEmpty = digits.findIndex((d) => !d);
    const focusIndex = firstEmpty === -1 ? LENGTH - 1 : firstEmpty;
    refs.current[focusIndex]?.focus();
    // Only on mount / when value clears after reject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.disabled, props.value.length === 0]);

  function setAt(index: number, char: string) {
    const next = digits.map((d, i) => (i === index ? char : d));
    const joined = next.join("").replace(/\D/g, "").slice(0, LENGTH);
    props.onChange(joined);
    if (char && index < LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        setAt(index, "");
        return;
      }
      if (index > 0) {
        refs.current[index - 1]?.focus();
        setAt(index - 1, "");
      }
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < LENGTH - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!text) return;
    props.onChange(text);
    const focusAt = Math.min(text.length, LENGTH - 1);
    refs.current[focusAt]?.focus();
  }

  return (
    <div
      role="group"
      aria-label="Six digit PIN"
      className="flex items-center justify-center gap-2 sm:gap-2.5"
      id={props.id}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={props.disabled}
          aria-label={`Digit ${index + 1} of ${LENGTH}`}
          onPaste={onPaste}
          onKeyDown={(event) => onKeyDown(index, event)}
          onChange={(event) => {
            const raw = event.target.value.replace(/\D/g, "");
            if (!raw) {
              setAt(index, "");
              return;
            }
            // Mobile may dump a full OTP into one cell
            if (raw.length > 1) {
              props.onChange(raw.slice(0, LENGTH));
              refs.current[Math.min(raw.length, LENGTH) - 1]?.focus();
              return;
            }
            setAt(index, raw);
          }}
          className="h-12 w-10 rounded-lg border border-border bg-transparent text-center font-mono text-lg tracking-normal text-foreground outline-none transition-[border-color,box-shadow] focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/15 disabled:opacity-50 sm:h-14 sm:w-11 sm:text-xl dark:border-white/25 dark:focus-visible:border-white dark:focus-visible:ring-white/20"
        />
      ))}
    </div>
  );
}
