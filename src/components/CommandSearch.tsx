import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Search,
  FileText,
  Home,
  Briefcase,
  PenTool,
  FolderOpen,
  MapPin,
  Rss,
  ArrowRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface SearchResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  meta?: {
    tags?: string;
    date?: string;
    author?: string;
  };
}

interface QuickLink {
  label: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

interface RecentPost {
  title: string;
  url: string;
  date: string;
  description: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Home",
    url: "/",
    icon: <Home className="w-4 h-4" />,
    description: "Back to homepage",
  },
  {
    label: "Thoughts & Writings",
    url: "/thoughts-and-writings",
    icon: <PenTool className="w-4 h-4" />,
    description: "Blog posts and articles",
  },
  {
    label: "Projects",
    url: "/projects",
    icon: <FolderOpen className="w-4 h-4" />,
    description: "Featured work and projects",
  },
  {
    label: "Work with Me",
    url: "/work-with-me",
    icon: <Briefcase className="w-4 h-4" />,
    description: "CV and experience",
  },
  {
    label: "Work Experience",
    url: "/work-experience",
    icon: <MapPin className="w-4 h-4" />,
    description: "Interactive work map",
  },
  {
    label: "Feeds",
    url: "/feeds",
    icon: <Rss className="w-4 h-4" />,
    description: "RSS and JSON feeds",
  },
];

const RECENT_POSTS: RecentPost[] = [
  {
    title: "Automating Structural Engineering Workflows with Python",
    url: "/thoughts-and-writings/python-automation-structural-engineering",
    date: "2026-01-25",
    description:
      "How I use Python to automate repetitive calculations, generate reports, and streamline BIM workflows.",
  },
  {
    title: "Getting Started with Grasshopper for Structural Engineers",
    url: "/thoughts-and-writings/grasshopper-parametric-structural-design",
    date: "2026-01-20",
    description:
      "A practical introduction to parametric design using Grasshopper, with structural engineering examples.",
  },
  {
    title: "BIM Coordination: A Structural Engineer's Perspective",
    url: "/thoughts-and-writings/bim-coordination-structural-engineers",
    date: "2026-01-15",
    description:
      "Lessons learned from coordinating structural models with architects, MEP engineers, and contractors.",
  },
];

export function CommandSearch({
  showTrigger = true,
}: {
  showTrigger?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pagefind, setPagefind] = React.useState<any>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Initialize Pagefind
  React.useEffect(() => {
    const initPagefind = async () => {
      try {
        if (typeof window === "undefined") return;

        // @ts-ignore
        if (window.pagefind) {
          // @ts-ignore
          setPagefind(window.pagefind);
          return;
        }

        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
          import * as pagefind from '/pagefind/pagefind.js';
          await pagefind.init();
          window.pagefind = pagefind;
          window.dispatchEvent(new CustomEvent('pagefindLoaded'));
        `;

        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Pagefind loading timeout"));
          }, 10000);

          window.addEventListener(
            "pagefindLoaded",
            () => {
              clearTimeout(timeout);
              // @ts-ignore
              setPagefind(window.pagefind);
              resolve(true);
            },
            { once: true },
          );

          script.onerror = () => {
            clearTimeout(timeout);
            reject(new Error("Failed to load pagefind script"));
          };

          document.head.appendChild(script);
        });
      } catch (error) {
        console.error("Failed to initialize pagefind:", error);
        setPagefind(null);
      }
    };

    initPagefind();
  }, []);

  // Hotkey to open
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      setOpen(true);
    },
    { enableOnFormTags: true },
  );

  // External open trigger
  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openCommandSearch", handler);
    return () => window.removeEventListener("openCommandSearch", handler);
  }, []);

  // Escape to close
  useHotkeys(
    "escape",
    () => {
      if (open) {
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    },
    { enableOnFormTags: true, enabled: open },
  );

  // Debounced search
  React.useEffect(() => {
    if (!query.trim() || !pagefind) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const searchFn = async () => {
      try {
        if (!pagefind) {
          setResults([]);
          setLoading(false);
          return;
        }

        const search = await pagefind.search(query);
        const searchResults: SearchResult[] = [];

        if (search?.results && search.results.length > 0) {
          for (const result of search.results.slice(0, 8)) {
            try {
              const data = await result.data();
              searchResults.push({
                id: result.id,
                url: data.url,
                title:
                  data.meta?.title ||
                  data.content?.split("\n")[0] ||
                  "Untitled",
                excerpt: data.excerpt || "",
                meta: {
                  tags: data.meta?.tags,
                  date: data.meta?.date,
                  author: data.meta?.author,
                },
              });
            } catch (e) {
              console.error("Error processing result:", e);
            }
          }
        }

        setResults(searchResults);
        setLoading(false);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchFn, 300);
    return () => clearTimeout(timeoutId);
  }, [query, pagefind]);

  const handleSelect = (url: string) => {
    window.location.href = url;
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  // Keep input focused
  React.useEffect(() => {
    if (open && inputRef.current) {
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [open, results]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Filter quick links by query when searching
  const filteredQuickLinks = query.trim()
    ? QUICK_LINKS.filter(
        (link) =>
          link.label.toLowerCase().includes(query.toLowerCase()) ||
          link.description.toLowerCase().includes(query.toLowerCase()),
      )
    : QUICK_LINKS;

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;
  const hasFilteredLinks = filteredQuickLinks.length > 0;

  return (
    <>
      {/* Trigger Button */}
      {showTrigger && (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 px-4 py-2 text-sm transition-colors rounded-lg border border-stone-600 bg-[#335D9B]/75 hover:bg-[#335D9B] text-stone-300 hover:text-stone-100 w-full max-w-sm"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search the website...</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-stone-600 bg-stone-700 px-1.5 font-mono text-[10px] font-medium text-stone-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      {/* Command Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto p-0 gap-0 bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/50 rounded-xl overflow-hidden">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <Command
            className="rounded-xl border-0 bg-neutral-950 [&_[cmdk-item]]:bg-transparent [&_[cmdk-item][data-selected='true']]:bg-white/[0.06] [&_[cmdk-item]:hover]:bg-white/[0.06]"
            shouldFilter={false}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-neutral-800">
              <Search className="h-4 w-4 shrink-0 text-neutral-500" />
              <CommandInput
                ref={inputRef}
                placeholder="Type a command or search..."
                value={query}
                onValueChange={setQuery}
                className="flex h-12 w-full bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-500 border-0 focus:ring-0"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex shrink-0 h-5 select-none items-center rounded bg-neutral-800 px-1.5 font-mono text-[10px] text-neutral-500">
                ESC
              </kbd>
            </div>

            <CommandList className="max-h-[min(60vh,480px)] overflow-y-auto">
              {/* Loading State */}
              {loading && (
                <div className="py-10 text-center text-sm text-neutral-500">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
                    Searching...
                  </div>
                </div>
              )}

              {/* No Results */}
              {!loading && hasQuery && !hasResults && !hasFilteredLinks && pagefind && (
                <div className="py-10 text-center text-neutral-500 text-sm">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              )}

              {/* Pagefind unavailable */}
              {!pagefind && hasQuery && !hasFilteredLinks && (
                <div className="py-10 text-center text-neutral-500 text-sm">
                  Search is not available.
                </div>
              )}

              {/* Search Results */}
              {!loading && hasResults && (
                <CommandGroup>
                  <div className="px-4 pt-3 pb-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                    Results
                  </div>
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.title}
                      onSelect={() => handleSelect(result.url)}
                      className="mx-1.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/80 shrink-0">
                          <FileText className="w-4 h-4 text-neutral-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-neutral-200 truncate">
                            {result.title}
                          </div>
                          <div className="text-xs text-neutral-500 truncate mt-0.5">
                            {result.excerpt.replace(/<[^>]*>/g, "").slice(0, 80)}
                          </div>
                        </div>
                        {result.meta?.date && (
                          <span className="text-xs text-neutral-600 shrink-0">
                            {formatDate(result.meta.date)}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Quick Links - filtered when searching */}
              {!loading && hasFilteredLinks && (
                <CommandGroup>
                  <div className="px-4 pt-3 pb-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                    {hasQuery ? "Pages" : "Quick Links"}
                  </div>
                  {filteredQuickLinks.map((link) => (
                    <CommandItem
                      key={link.url}
                      value={link.label}
                      onSelect={() => handleSelect(link.url)}
                      className="mx-1.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/80 text-neutral-400 shrink-0">
                          {link.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-neutral-200">
                            {link.label}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {link.description}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Recent Posts - only when no query */}
              {!hasQuery && (
                <CommandGroup>
                  <div className="px-4 pt-3 pb-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                    Recent Posts
                  </div>
                  {RECENT_POSTS.map((post) => (
                    <CommandItem
                      key={post.url}
                      value={post.title}
                      onSelect={() => handleSelect(post.url)}
                      className="mx-1.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/80 shrink-0">
                          <FileText className="w-4 h-4 text-neutral-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-neutral-200 truncate">
                            {post.title}
                          </div>
                          <div className="text-xs text-neutral-500 truncate mt-0.5">
                            {post.description}
                          </div>
                        </div>
                        <span className="text-xs text-neutral-600 shrink-0">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Footer hint */}
              <div className="px-4 py-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-600">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-500 font-mono">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-500 font-mono">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-500 font-mono">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-500 font-mono">esc</kbd>
                    close
                  </span>
                </div>
                <span className="text-neutral-700">
                  Powered by Pagefind
                </span>
              </div>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
