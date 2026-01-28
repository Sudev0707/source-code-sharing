import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  Share2,
  Download,
  Eye,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex rounded-b-3xl pt-16 justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              The modern way to share code
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Share Code.
            <br />
            <span className="gradient-text">Collaborate Better.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Create, edit, and share code snippets with a beautiful VSCode-like
            editor. Support for 20+ languages with syntax highlighting and
            real-time collaboration.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* <Link to="/signup">
              <Button variant="hero" size="lg" className="min-w-[180px]">
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link> */}
            <Link to="/editor">
              <Button variant="glass" size="lg" className="min-w-[180px]">
                <Code2 className="w-5 h-5" />
                Try Editor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">20+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Code Snippets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">5K+</div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="group p-6 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card">
    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow">
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Code2,
      title: "VSCode-like Editor",
      description:
        "Full-featured code editor with syntax highlighting, auto-completion, and multiple themes.",
    },
    {
      icon: Share2,
      title: "Instant Sharing",
      description:
        "Share code files and snippets with a single link. Control visibility with public or private access.",
    },
    {
      icon: Download,
      title: "Download & Export",
      description:
        "Download your code files in any format. Export entire projects as ZIP archives.",
    },
    {
      icon: Eye,
      title: "Beautiful Previews",
      description:
        "Render HTML, Markdown, and more with live previews. Perfect for documentation.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description:
        "Your code is encrypted and stored securely. Control who can view and edit your files.",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description:
        "Support for JavaScript, TypeScript, Python, Java, HTML, CSS, and 15+ more languages.",
    },
  ];

  return (
    <section className="py-24 relative mt-80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything you need to{" "}
            <span className="gradient-text">share code</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete platform for developers to create, organize, and share
            their code with the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center md:px-6 lg:px-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CodePreviewSection = () => {
  const sampleCode = `// Welcome to SourceShare!
function greet(name: string): string {
  return \`Hello, \${name}! 👋\`;
}

const developers = ["Alice", "Bob", "Charlie"];

developers.forEach(dev => {
  console.log(greet(dev));
});

// Share this snippet with a single click ✨`;

  return (
    <section className=" py-24 absolute overflow-hidden top-[480px] md:top-[500px] w-full">
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Code that <span className="gradient-text">looks beautiful</span>
            </h2>
            <h3 className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Syntax highlighting for 20+ languages. Just like your favorite
              editor.
            </h3>
            {/* <p className="text-muted-foreground">
              Syntax highlighting for 20+ languages. Just like your favorite editor.
            </p> */}
          </div>

          {/* Code Preview */}
          <div className="p-3 rounded-2xl overflow-hidden shadow-card bg-slate-100 border-border/50 animate-scale-in">
            {/* Editor header */}
            <div className="bg-editor rounded-t-md flex items-center justify-between px-4 py-3 border-b border-editor-line">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-editor-foreground/60 text-sm font-mono">
                  welcome.ts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-editor-foreground/60 hover:text-editor-foreground h-7"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-editor-foreground/60 hover:text-editor-foreground h-7"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            {/* Code content */}
            <div className=" bg-editor p-6 font-mono text-sm overflow-x-auto rounded-b-md">
              <pre className="text-editor-foreground">
                <code>
                  {sampleCode.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-editor-foreground/30 w-8 select-none">
                        {i + 1}
                      </span>
                      <span className="text-editor-foreground">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl glass border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to start sharing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of developers who use SourceShare to organize and
              share their code snippets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* <Link to="/signup">
                <Button variant="hero" size="lg">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link> */}
              <Link to="/dashboard">
                <Button variant="glass" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-2 md:px-0 lg:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">
              SourceShare
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SourceShare. Built with love for developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <main className="pt-16">
      <HeroSection />
      <CodePreviewSection />
      <FeaturesSection />

      {/* <CTASection /> */}
      <Footer />
    </main>
  );
};

export default LandingPage;
