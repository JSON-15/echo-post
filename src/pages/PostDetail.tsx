import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockPosts, mockComments } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const post = mockPosts.find(p => p.id === id);
  const comments = mockComments.filter(c => c.postId === id);

  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) {
    return (
      <div className="container max-w-2xl py-8">
        <div className="card-elevated p-12 text-center">
          <h1 className="heading-section mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            This post may have been deleted or doesn't exist.
          </p>
          <Button asChild variant="outline">
            <Link to="/feed">Back to feed</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsAnimating(true);
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (newComment.trim().length === 0) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added.",
    });
    
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{post.author.username}'s post | Prose</title>
        <meta name="description" content={post.content.slice(0, 160)} />
      </Helmet>

      <div className="container max-w-2xl py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Post */}
        <article className="card-elevated p-8 animate-fade-in">
          <div className="flex items-start gap-4">
            <Link to={`/profile/${post.author.username}`}>
              <Avatar className="h-12 w-12 ring-2 ring-background shadow-soft">
                <AvatarImage src={post.author.avatar} alt={post.author.username} />
                <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                  {post.author.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link 
                  to={`/profile/${post.author.username}`}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {post.author.username}
                </Link>
                <span className="text-muted-foreground">·</span>
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </time>
              </div>

              <p className="mt-4 text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              <div className="flex items-center gap-1 mt-6 pt-4 border-t border-border -ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={cn(
                    "gap-2 text-muted-foreground hover:text-destructive",
                    isLiked && "text-destructive"
                  )}
                >
                  <Heart
                    className={cn(
                      "h-[18px] w-[18px] transition-all",
                      isLiked && "fill-current",
                      isAnimating && "animate-like-bounce"
                    )}
                  />
                  <span className="tabular-nums">{likesCount}</span>
                </Button>

                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <MessageCircle className="h-[18px] w-[18px]" />
                  <span className="tabular-nums">{comments.length}</span>
                </Button>

                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                  <Share2 className="h-[18px] w-[18px]" />
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Comment Form */}
        <div className="mt-6">
          <form onSubmit={handleComment} className="card-elevated p-4">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                  {user?.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder={isAuthenticated ? "Write a comment..." : "Sign in to comment"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[44px] max-h-[120px] resize-none"
                  disabled={!isAuthenticated}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!isAuthenticated || isSubmitting || newComment.trim().length === 0}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Comments */}
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-medium">Comments ({comments.length})</h2>
          
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div 
                key={comment.id} 
                className="card-interactive p-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-3">
                  <Link to={`/profile/${comment.author.username}`}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                        {comment.author.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/profile/${comment.author.username}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {comment.author.username}
                      </Link>
                      <span className="text-muted-foreground text-xs">·</span>
                      <time className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </time>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card-interactive p-8 text-center">
              <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No comments yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
