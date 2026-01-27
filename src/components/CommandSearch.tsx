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

interface BlogPost {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export function CommandSearch({ showTrigger = true }: { showTrigger?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pagefind, setPagefind] = React.useState<any>(null);
  const [randomPosts, setRandomPosts] = React.useState<BlogPost[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Load random blog posts
  React.useEffect(() => {
    const loadRandomPosts = async () => {
      try {
        const posts: BlogPost[] = [
          {
            id: "1",
            url: "/thoughts-and-writings/javascript-frameworks-2025",
            title: "JavaScript Frameworks in 2025: A Senior Engineer's Guide",
            description:
              "A comprehensive guide to the current state of JavaScript frameworks",
            tags: ["javascript", "frameworks", "react"],
            date: "2025-07-20",
          },
          {
            id: "2",
            url: "/thoughts-and-writings/steel-beam-design-to-eurocode-3",
            title: "How to Design a Steel Beam to Eurocode 3",
            description: "Complete step-by-step guide for steel beam design",
            tags: ["eurocode3", "steel-design", "engineering"],
            date: "2025-07-20",
          },
          {
            id: "3",
            url: "/thoughts-and-writings/stiffness-matrix-analysis",
            title: "Understanding the Stiffness Matrix",
            description:
              "A foundation of structural analysis with mathematical formulations",
            tags: ["structural-engineering", "mathematics"],
            date: "2024-01-25",
          },
          {
            id: "4",
            url: "/thoughts-and-writings/modern-web-development",
            title: "Modern Web Development: Embracing the Future",
            description:
              "Exploring the latest trends and technologies in web development",
            tags: ["web-development", "javascript"],
            date: "2024-01-15",
          },
        ];

        // Shuffle and take 3
        const shuffled = posts.sort(() => 0.5 - Math.random());
        setRandomPosts(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Failed to load random posts:", error);
      }
    };

    loadRandomPosts();
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

  // Listen for external open trigger
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
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto p-0 gap-0 bg-stone-900 border-stone-700">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <Command
            className="rounded-lg border-0 shadow-lg bg-stone-900 [&_[cmdk-item]]:bg-transparent [&_[cmdk-item][data-selected='true']]:bg-stone-800 [&_[cmdk-item]:hover]:bg-stone-800"
            shouldFilter={false}
          >
            <div className="flex items-center border-b border-stone-700 px-4">
              <Search className="mr-3 h-4 w-4 shrink-0 text-stone-400" />
              <CommandInput
                ref={inputRef}
                placeholder="Search the website..."
                value={query}
                onValueChange={setQuery}
                className="flex h-14 w-full rounded-md bg-transparent py-3 text-stone-200 outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
                autoFocus
              />
            </div>
            <CommandList className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
              {loading && (
                <div className="py-8 text-center text-sm text-stone-400">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-stone-600 border-t-stone-400 rounded-full animate-spin"></div>
                    Searching...
                  </div>
                </div>
              )}

              {!loading && query && results.length === 0 && pagefind && (
                <div className="py-8 text-center text-stone-500">
                  <p>No results found for "{query}"</p>
                </div>
              )}

              {!pagefind && query && (
                <div className="py-8 text-center text-stone-500">
                  <p>Search is not available.</p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <CommandGroup>
                  <div className="px-4 py-2 text-xs font-medium text-stone-400 uppercase tracking-wider">
                    Search Results
                  </div>
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.title}
                      onSelect={() => handleSelect(result.url)}
                      className="mx-2 mb-2 p-3 rounded-lg cursor-pointer border border-transparent hover:border-stone-700 hover:bg-stone-800 transition-colors data-[selected=true]:bg-stone-800 data-[selected=true]:border-stone-700"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <FileText className="h-4 w-4 text-stone-400 mt-1 shrink-0" />
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="font-medium text-stone-100 leading-tight">
                            {result.title}
                          </div>
                          <div className="text-sm text-stone-400 leading-relaxed line-clamp-2">
                            {result.excerpt}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                            {result.meta?.date && (
                              <span>{formatDate(result.meta.date)}</span>
                            )}
                            {result.meta?.tags && (
                              <div className="flex gap-1 flex-wrap">
                                {result.meta.tags
                                  .split(",")
                                  .slice(0, 2)
                                  .map((tag: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-stone-800 text-stone-300 rounded-full text-xs"
                                    >
                                      {tag.trim()}
                                    </span>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!query && randomPosts.length > 0 && (
                <CommandGroup>
                  <div className="px-4 py-2 text-xs font-medium text-stone-400 uppercase tracking-wider">
                    Recent Posts
                  </div>
                  {randomPosts.map((post) => (
                    <CommandItem
                      key={post.id}
                      value={post.title}
                      onSelect={() => handleSelect(post.url)}
                      className="mx-2 mb-2 p-3 rounded-lg cursor-pointer border border-transparent hover:border-stone-700 hover:bg-stone-800 transition-colors data-[selected=true]:bg-stone-800 data-[selected=true]:border-stone-700"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <FileText className="h-4 w-4 text-stone-400 mt-1 shrink-0" />
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="font-medium text-stone-100 leading-tight">
                            {post.title}
                          </div>
                          <div className="text-sm text-stone-400 leading-relaxed">
                            {post.description}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                            <span>{formatDate(post.date)}</span>
                            <div className="flex gap-1 flex-wrap">
                              {post.tags.slice(0, 2).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-stone-800 text-stone-300 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!query && randomPosts.length === 0 && (
                <div className="py-8 text-center text-stone-500">
                  <div className="space-y-3">
                    <p>Start typing to search the website...</p>
                    <div className="flex justify-center gap-4 text-xs">
                      <kbd className="px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-300">
                        ⌘K
                      </kbd>
                      <span className="text-stone-600">to open</span>
                      <kbd className="px-2 py-1 bg-stone-800 border border-stone-700 rounded text-stone-300">
                        ESC
                      </kbd>
                      <span className="text-stone-600">to close</span>
                    </div>
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
