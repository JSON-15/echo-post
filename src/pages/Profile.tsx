import { useParams } from "react-router-dom";
import { Calendar, FileText, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post/PostCard";
import { mockUsers, mockPosts } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  
  const user = mockUsers.find(u => u.username === username) || mockUsers[0];
  const userPosts = mockPosts.filter(p => p.author.username === user.username);
  const isOwnProfile = currentUser?.username === username;

  return (
    <>
      <Helmet>
        <title>{user.username} | Prose</title>
        <meta name="description" content={user.bio} />
      </Helmet>

      <div className="container max-w-2xl py-8">
        {/* Profile Header */}
        <header className="card-elevated p-8 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-card">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl font-medium">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="heading-section">{user.username}</h1>
              <p className="text-muted-foreground mt-2 leading-relaxed max-w-md">
                {user.bio}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {format(user.joinedAt, "MMMM yyyy")}</span>
              </div>
            </div>

            {isOwnProfile && (
              <Button variant="outline" size="sm">
                Edit profile
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <StatItem icon={<FileText className="h-4 w-4" />} value={user.postsCount} label="Posts" />
            <StatItem icon={<Heart className="h-4 w-4" />} value={user.likesCount} label="Likes" />
            <StatItem icon={<MessageCircle className="h-4 w-4" />} value={user.commentsCount} label="Comments" />
          </div>
        </header>

        {/* Posts */}
        <section>
          <h2 className="text-lg font-medium mb-4">Posts</h2>
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map((post, index) => (
                <div key={post.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card-interactive p-12 text-center">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

function StatItem({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: number; 
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="font-semibold text-foreground tabular-nums">
          {value.toLocaleString()}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default Profile;
