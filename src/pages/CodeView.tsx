import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download, Share2, ArrowLeft, Edit, Eye, Globe, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockCodeData = {
  id: "1",
  filename: "fibonacci.ts",
  language: "typescript",
  visibility: "public",
  author: "johndoe",
  createdAt: "Jan 15, 2025",
  views: 1234,
  code: `// Fibonacci sequence implementation in TypeScript

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version for better performance
function fibonacciMemo(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  
  const result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Calculate first 20 Fibonacci numbers
const results = Array.from({ length: 20 }, (_, i) => fibonacciMemo(i));
console.log("Fibonacci sequence:", results);

// Export for use in other modules
export { fibonacci, fibonacciMemo };
`,
};

const CodeView = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const data = mockCodeData; // In a real app, fetch based on id

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  }, [data.code, toast]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([data.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: `${data.filename} saved`,
    });
  }, [data, toast]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Share link copied to clipboard",
    });
  }, [toast]);

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="py-6">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground font-mono mb-2">
                  {data.filename}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {data.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {data.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {data.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-primary" />
                    Public
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Link to={`/editor/${data.id}`}>
                  <Button variant="hero" size="sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-2xl overflow-hidden shadow-card border border-border/50">
          {/* Editor header */}
          <div className="bg-editor flex items-center justify-between px-4 py-3 border-b border-editor-line">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 text-editor-foreground/60 text-sm font-mono">{data.filename}</span>
            </div>
            <span className="text-editor-foreground/40 text-xs font-mono uppercase">{data.language}</span>
          </div>

          {/* Read-only editor */}
          <div className="h-[500px]">
            <Editor
              height="100%"
              language={data.language}
              value={data.code}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "JetBrains Mono, monospace",
                minimap: { enabled: false },
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                readOnly: true,
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 8,
                lineNumbersMinChars: 4,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                renderLineHighlight: "none",
                domReadOnly: true,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CodeView;
