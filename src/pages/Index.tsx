import { Link } from "react-router-dom";
import { ArrowRight, PenLine, Heart, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-display animate-slide-up opacity-0 text-balance">
            Where words find
            <span className="block gradient-text">their home</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up opacity-0 stagger-1 text-balance">
            A minimal space for writers, thinkers, and dreamers to share ideas. 
            No noise, no distractions—just pure, thoughtful expression.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 stagger-2">
            {isAuthenticated ? (
              <>
                <Button asChild size="lg" variant="glow">
                  <Link to="/compose">
                    <PenLine className="h-5 w-5 mr-2" />
                    Start writing
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/feed">
                    View feed
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" variant="glow">
                  <Link to="/auth?mode=signup">
                    Get started free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/auth">
                    Sign in
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-section text-center mb-16 animate-fade-in">
            Simple by design
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PenLine className="h-6 w-6" />}
              title="Pure text, pure thought"
              description="No images, no embeds. Just your words and the ideas they carry. Simplicity breeds clarity."
              delay="stagger-1"
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6" />}
              title="Genuine engagement"
              description="Likes and comments that mean something. Build real connections with readers who care."
              delay="stagger-2"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Your voice, amplified"
              description="A profile that showcases your journey. Every post tells your story, word by word."
              delay="stagger-3"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-2xl mx-auto text-center card-elevated p-12 animate-fade-in">
          <h2 className="heading-section mb-4">Ready to write?</h2>
          <p className="text-muted-foreground mb-8">
            Join a community of thoughtful writers and start sharing your perspective today.
          </p>
          <Button asChild size="lg" variant="glow">
            <Link to={isAuthenticated ? "/compose" : "/auth?mode=signup"}>
              {isAuthenticated ? "Write your first post" : "Create your account"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: string;
}) {
  return (
    <div className={`card-interactive p-8 text-center animate-slide-up opacity-0 ${delay}`}>
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-5">
        {icon}
      </div>
      <h3 className="heading-card mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default Index;
