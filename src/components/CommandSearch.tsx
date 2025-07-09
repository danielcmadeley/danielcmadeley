import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Search, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {
  Command,
  CommandEmpty,
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

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pagefind, setPagefind] = React.useState<any>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Check if mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Pagefind
  React.useEffect(() => {
    const initPagefind = async () => {
      try {
        // Only run on client side
        if (typeof window === "undefined") return;

        // Check if pagefind is already loaded
        // @ts-ignore
        if (window.pagefind) {
          // @ts-ignore
          setPagefind(window.pagefind);
          return;
        }

        // Load pagefind via script tag since it's in /public
        const script = document.createElement("script");
        script.type = "module";
        script.textContent = `
          import * as pagefind from '/pagefind/pagefind.js';
          await pagefind.init();
          window.pagefind = pagefind;
          window.dispatchEvent(new CustomEvent('pagefindLoaded'));
        `;

        // Wait for pagefind to load
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

  // Hotkey to open command palette
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      setOpen(true);
    },
    {
      enableOnFormTags: true,
    },
  );

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
    {
      enableOnFormTags: true,
      enabled: open,
    },
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

        // Use regular search with manual debouncing for better UI control
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
            } catch (resultError) {
              console.error("Error processing result:", resultError);
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

    // Manual debouncing for better UI control
    const timeoutId = setTimeout(searchFn, 300);
    return () => clearTimeout(timeoutId);
  }, [query, pagefind]);

  const handleSelect = (url: string) => {
    window.location.href = url;
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  // Keep input focused when results update
  React.useEffect(() => {
    if (open && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [open, results]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength?: number) => {
    const length = maxLength || (isMobile ? 80 : 120);
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + "...";
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors w-full max-w-sm"
      >
        <Search className="w-4 h-4 text-stone-400" />
        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-stone-600 bg-stone-700 px-1.5 font-mono text-[10px] font-medium text-stone-400">
          <span className="text-sm">⌘</span>K
        </kbd>
      </button>

      {/* Command Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto p-0 gap-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <Command
            className="rounded-lg border-0 shadow-lg bg-stone-500"
            shouldFilter={false}
          >
            <div className="flex items-center border-b border-stone-700 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 text-stone-400" />
              <CommandInput
                ref={inputRef}
                placeholder="Search blog posts..."
                value={query}
                onValueChange={setQuery}
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
                autoFocus
              />
            </div>
            <CommandList className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
              {loading && (
                <div className="py-6 text-center text-sm text-stone-500">
                  Searching...
                </div>
              )}

              {!loading && query && results.length === 0 && pagefind && (
                <CommandEmpty>No results found for "{query}"</CommandEmpty>
              )}

              {!pagefind && query && (
                <div className="py-6 text-center text-sm text-stone-500">
                  <p>Search is not available.</p>
                  <p className="text-xs mt-2">Check the console for errors.</p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <CommandGroup heading="Blog Posts">
                  {results.map((result, index) => (
                    <CommandItem
                      key={result.id}
                      value={result.title}
                      onSelect={() => handleSelect(result.url)}
                      className="flex flex-col items-start gap-2 p-3 sm:p-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <FileText className="h-4 w-4 text-stone-400 mt-1 shrink-0" />
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="font-medium text-stone-100 leading-tight">
                            {result.title}
                          </div>
                          <div className="text-sm text-stone-400 leading-relaxed">
                            {truncateText(result.excerpt)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-500">
                            {result.meta?.date && (
                              <span>{formatDate(result.meta.date)}</span>
                            )}
                            {result.meta?.author && (
                              <span className="hidden sm:inline">
                                by {result.meta.author}
                              </span>
                            )}
                            {result.meta?.tags && (
                              <span className="flex gap-1 flex-wrap">
                                {result.meta.tags
                                  .split(",")
                                  .slice(0, isMobile ? 1 : 2)
                                  .map((tag: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-1.5 py-0.5 bg-stone-700 text-stone-300 rounded text-xs"
                                    >
                                      {tag.trim()}
                                    </span>
                                  ))}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!query && (
                <div className="py-6 text-center text-sm text-stone-500">
                  <div className="space-y-2">
                    <p>Type to search blog posts...</p>
                    <p className="text-xs hidden sm:block">
                      Press{" "}
                      <kbd className="px-1.5 py-0.5 bg-stone-700 rounded text-stone-300">
                        ⌘K
                      </kbd>{" "}
                      to open •{" "}
                      <kbd className="px-1.5 py-0.5 bg-stone-700 rounded text-stone-300">
                        ESC
                      </kbd>{" "}
                      to close
                    </p>
                    <p className="text-xs sm:hidden">
                      Tap to search •{" "}
                      <kbd className="px-1.5 py-0.5 bg-stone-700 rounded text-stone-300">
                        ESC
                      </kbd>{" "}
                      to close
                    </p>
                  </div>
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
