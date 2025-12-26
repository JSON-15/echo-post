import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <article className="card-interactive p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <Link to={`/profile/${post.author.username}`}>
          <Avatar className="h-11 w-11 ring-2 ring-background shadow-soft">
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
            <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
              {post.author.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Link 
                to={`/profile/${post.author.username}`}
                className="font-medium text-foreground hover:text-primary transition-colors truncate"
              >
                {post.author.username}
              </Link>
              <span className="text-muted-foreground">·</span>
              <time className="text-sm text-muted-foreground shrink-0">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </time>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link to={`/post/${post.id}`} className="block mt-3">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </Link>

          <div className="flex items-center gap-1 mt-4 -ml-2">
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
              <span className="text-sm tabular-nums">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <Link to={`/post/${post.id}`}>
                <MessageCircle className="h-[18px] w-[18px]" />
                <span className="text-sm tabular-nums">{post.commentsCount}</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <Share2 className="h-[18px] w-[18px]" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
