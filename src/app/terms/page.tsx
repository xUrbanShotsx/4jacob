import { permanentRedirect } from "next/navigation";

/** Canonical home for the terms is now the dynamic legal route. Keep this path
    working (old links, bookmarks, search results) via a 308 redirect. */
export default function TermsPage() {
  permanentRedirect("/legal/terms");
}
