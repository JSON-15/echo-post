import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const MAX_LENGTH = 500;

const Compose = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length === 0) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Post published!",
      description: "Your thoughts are now live.",
    });
    
    navigate("/feed");
  };

  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 50 && remainingChars >= 0;

  return (
    <>
      <Helmet>
        <title>Write | Prose</title>
        <meta name="description" content="Share your thoughts with the world." />
      </Helmet>

      <div className="container max-w-2xl py-8">
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || isOverLimit || content.trim().length === 0}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Posting...
              </>
            ) : (
              "Publish"
            )}
          </Button>
        </header>

        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="card-elevated p-6">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-lg border-0 resize-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
              autoFocus
            />

            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <p className="text-sm text-muted-foreground">
                Share something meaningful
              </p>
              <span
                className={`text-sm tabular-nums ${
                  isOverLimit
                    ? "text-destructive font-medium"
                    : isNearLimit
                    ? "text-amber-500"
                    : "text-muted-foreground"
                }`}
              >
                {remainingChars}
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Compose;
