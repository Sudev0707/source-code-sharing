import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Mail, Lock, ArrowRight, Github, Chrome, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup
    // setTimeout(() => {
    //   setIsLoading(false);
    //   toast({
    //     title: "Signup functionality",
    //     description: "Connect Lovable Cloud to enable authentication",
    //   });
    // }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              Code<span className="gradient-text">Share</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl glass border border-border/50 shadow-card">
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">Create your account</h1>
          <p className="text-muted-foreground text-center mb-6">
            Start sharing code in seconds
          </p>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" className="w-full">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full">
              <Chrome className="w-4 h-4" />
              Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters</p>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
