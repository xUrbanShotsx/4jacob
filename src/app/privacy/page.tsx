import { permanentRedirect } from "next/navigation";

/** Canonical home for the policy is now the dynamic legal route. Keep this path
    working (old links, bookmarks, search results) via a 308 redirect. */
export default function PrivacyPage() {
  permanentRedirect("/legal/privacy");
}
