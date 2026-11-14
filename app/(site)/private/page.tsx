import { redirect } from "next/navigation";

/**
 * Multi-slug private notes live at /private/[slug].
 * Bare /private has no index; send visitors home.
 */
export default function PrivateIndexPage() {
  redirect("/");
}
