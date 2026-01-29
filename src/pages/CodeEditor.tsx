import { useState, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Save,
  Download,
  Share2,
  Copy,
  Check,
  Settings,
  Eye,
  Globe,
  Lock,
  ChevronDown,
  Play,
  Maximize2,
  Menu,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { id: "javascript", name: "JavaScript", ext: ".js" },
  { id: "typescript", name: "TypeScript", ext: ".ts" },
  { id: "python", name: "Python", ext: ".py" },
  { id: "java", name: "Java", ext: ".java" },
  { id: "html", name: "HTML", ext: ".html" },
  { id: "css", name: "CSS", ext: ".css" },
  { id: "json", name: "JSON", ext: ".json" },
  { id: "markdown", name: "Markdown", ext: ".md" },
  { id: "sql", name: "SQL", ext: ".sql" },
  { id: "go", name: "Go", ext: ".go" },
  { id: "rust", name: "Rust", ext: ".rs" },
  { id: "cpp", name: "C++", ext: ".cpp" },
];

const defaultCode = `// Welcome to SourceShare Editor!
// Start writing your code here...

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log("Fibonacci sequence:", results);

// Try sharing this code with a single click! ✨
`;

const CodeEditor = () => {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("typescript");
  const [filename, setFilename] = useState("fibonacci");
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLangMenu, setShowMobileLangMenu] = useState(false);
  const [showMobileActionMenu, setShowMobileActionMenu] = useState(false);
  const { toast } = useToast();

  const currentLang = languages.find((l) => l.id === language) || languages[1];

  // Load code from URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedCode = urlParams.get("code");
    if (encodedCode) {
      try {
        const decodedCode = decodeURIComponent(escape(atob(encodedCode)));
        setCode(decodedCode);
      } catch (error) {
        console.error("Failed to decode code from URL:", error);
      }
    }
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  }, [code, toast]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}${currentLang.ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: `${filename}${currentLang.ext} saved`,
    });
  }, [code, filename, currentLang, toast]);

  const handleSave = useCallback(() => {
    toast({
      title: "Saved!",
      description: "Your code has been saved",
    });
  }, [toast]);

  const handleShare = useCallback(() => {
    try {
      const encodedCode = btoa(unescape(encodeURIComponent(code)));
      const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodeURIComponent(encodedCode)}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Share link copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to encode code for sharing:", error);
      toast({
        title: "Share Failed",
        description: "Unable to share code due to encoding error",
        variant: "destructive",
      });
    }
  }, [code, toast]);

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-card">
        <div className=" mx-auto">
          <div className="flex items-center justify-between h-14">
            {/* Left side */}
            <div className="flex items-center gap-4">
              {/* Filename */}
              {/* <div className="flex items-center gap-2 border"> */}
             <div className="flex items-center gap-1 sm:gap-2 w-fit shrink-0 px-1 sm:px-2 ps-4">
  <input
    type="text"
    value={filename}
    onChange={(e) => setFilename(e.target.value)}
    placeholder="filename"
    className="bg-transparent font-mono text-foreground focus:outline-none 
               border-b border-transparent focus:border-primary transition-colors
               w-[180px] sm:w-[140px] md:w-auto"
  />
  <span className="text-muted-foreground font-mono shrink-0">
    {currentLang.ext}
  </span>
</div>


              {/* Desktop Language selector */}
              <div className="hidden md:block relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="font-mono"
                >
                  {currentLang.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
                {showLanguageMenu && (
                  <div className="absolute top-full left-0 mt-1 w-48 p-2 rounded-lg glass border border-border shadow-card z-50 max-h-64 overflow-y-auto animate-scale-in">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setLanguage(lang.id);
                          setShowLanguageMenu(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          language === lang.id
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {lang.name}
                        <span className="text-xs opacity-60">{lang.ext}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 pe-5">
              {/* Desktop buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="hero" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPublic(!isPublic)}
                  className="gap-2"
                >
                  {isPublic ? (
                    <>
                      <Globe className="w-4 h-4 text-primary" /> Public
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-muted-foreground" /> Private
                    </>
                  )}
                </Button>
              </div>

              {/* Mobile: Language dropdown */}
              <div className="md:hidden relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileLangMenu(!showMobileLangMenu)}
                >
                  {currentLang.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
                {showMobileLangMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 p-2 rounded-lg glass border border-border shadow-card z-50 animate-scale-in max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setLanguage(lang.id);
                          setShowMobileLangMenu(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors mb-1 ${
                          language === lang.id
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {lang.name}
                        <span className="text-xs opacity-60">{lang.ext}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile: Action & Visibility dropdown */}
              <div className="md:hidden relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileActionMenu(!showMobileActionMenu)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                {showMobileActionMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-lg glass border border-border shadow-card z-50 animate-scale-in">
                    {/* Visibility toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPublic(!isPublic)}
                      className="flex w-full justify-between mb-2"
                    >
                      {isPublic ? (
                        <>
                          <Globe className="w-4 h-4 text-primary" /> Public
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-muted-foreground" />{" "}
                          Private
                        </>
                      )}
                    </Button>

                    {/* Action buttons */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-full justify-between mb-1"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" /> Copy
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-full justify-between mb-1"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-full justify-between mb-1"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button
                      variant="hero"
                      size="sm"
                      className="flex w-full justify-between"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4" /> Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="h-[calc(100vh-7.5rem)] px-1 pt-5 rounded-md pb-4">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, monospace",
            minimap: { enabled: true },
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 8,
            lineNumbersMinChars: 4,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </div>
    </main>
  );
};

export default CodeEditor;
