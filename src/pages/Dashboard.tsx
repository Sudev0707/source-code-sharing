import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  FileCode,
  FolderOpen,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Clock,
  Eye,
  Lock,
  Globe,
  Code2,
  FileText,
} from "lucide-react";

// Mock data for demonstration
const mockFiles = [
  {
    id: "1",
    name: "api-handlers.ts",
    language: "typescript",
    visibility: "public",
    updatedAt: "2 hours ago",
    views: 124,
  },
  {
    id: "2",
    name: "styles.css",
    language: "css",
    visibility: "private",
    updatedAt: "Yesterday",
    views: 56,
  },
  {
    id: "3",
    name: "utils.py",
    language: "python",
    visibility: "public",
    updatedAt: "3 days ago",
    views: 89,
  },
  {
    id: "4",
    name: "index.html",
    language: "html",
    visibility: "public",
    updatedAt: "1 week ago",
    views: 234,
  },
  {
    id: "5",
    name: "config.json",
    language: "json",
    visibility: "private",
    updatedAt: "2 weeks ago",
    views: 12,
  },
];

const mockSnippets = [
  {
    id: "s1",
    title: "React useDebounce Hook",
    language: "typescript",
    visibility: "public",
    views: 456,
  },
  {
    id: "s2",
    title: "Python List Comprehension",
    language: "python",
    visibility: "public",
    views: 234,
  },
  {
    id: "s3",
    title: "CSS Grid Layout",
    language: "css",
    visibility: "private",
    views: 89,
  },
];

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    typescript: "bg-blue-500",
    javascript: "bg-yellow-500",
    python: "bg-green-500",
    css: "bg-purple-500",
    html: "bg-orange-500",
    json: "bg-gray-500",
    java: "bg-red-500",
  };
  return colors[lang] || "bg-primary";
};

const FileCard = ({ file }: { file: typeof mockFiles[0] }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${getLanguageColor(file.language)} flex items-center justify-center`}>
            <FileCode className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <Link to={`/editor/${file.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
              {file.name}
            </Link>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="capitalize">{file.language}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {file.updatedAt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            {file.views}
          </div>
          {file.visibility === "public" ? (
            <Globe className="w-4 h-4 text-primary" />
          ) : (
            <Lock className="w-4 h-4 text-muted-foreground" />
          )}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            {showMenu && (
              <div className="absolute right-0 top-8 w-40 p-2 rounded-lg glass border border-border shadow-card z-10 animate-scale-in">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SnippetCard = ({ snippet }: { snippet: typeof mockSnippets[0] }) => (
  <div className="p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-card">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getLanguageColor(snippet.language)}`} />
        <span className="text-xs text-muted-foreground capitalize">{snippet.language}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {snippet.visibility === "public" ? (
          <Globe className="w-3 h-3" />
        ) : (
          <Lock className="w-3 h-3" />
        )}
      </div>
    </div>
    <Link to={`/view/${snippet.id}`} className="font-medium text-foreground hover:text-primary transition-colors block mb-2">
      {snippet.title}
    </Link>
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Eye className="w-3 h-3" />
      {snippet.views} views
    </div>
  </div>
);

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"files" | "snippets">("files");

  return (
    <main className="pt-20 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your code files and snippets</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "files" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("files")}
            >
              <FolderOpen className="w-4 h-4" />
              Files
            </Button>
            <Button
              variant={activeTab === "snippets" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("snippets")}
            >
              <FileText className="w-4 h-4" />
              Snippets
            </Button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <Link to="/editor">
              <Button variant="hero">
                <Plus className="w-4 h-4" />
                New File
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Files", value: "12", icon: FileCode },
            { label: "Snippets", value: "8", icon: Code2 },
            { label: "Public", value: "15", icon: Globe },
            { label: "Total Views", value: "1.2K", icon: Eye },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl glass border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        {activeTab === "files" ? (
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Your Files
            </h2>
            <div className="grid gap-3">
              {mockFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Your Snippets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
