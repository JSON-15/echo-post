import { useState } from "react";
import { PostCard } from "@/components/post/PostCard";
import { ComposeFAB } from "@/components/post/ComposeFAB";
import { mockPosts } from "@/data/mockData";
import { Helmet } from "react-helmet-async";

const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Feed | Prose</title>
        <meta name="description" content="Discover thoughtful posts from writers and thinkers." />
      </Helmet>

      <div className="container max-w-2xl py-8">
        <header className="mb-8">
          <h1 className="heading-section">Your Feed</h1>
          <p className="text-muted-foreground mt-2">
            Thoughts from people you follow
          </p>
        </header>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard post={post} onLike={handleLike} />
            </div>
          ))}
        </div>

        <ComposeFAB />
      </div>
    </>
  );
};

export default Feed;
