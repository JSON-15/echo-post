import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function ComposeFAB() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-card hover:shadow-glow sm:hidden z-50"
    >
      <Link to="/compose">
        <PenLine className="h-5 w-5" />
      </Link>
    </Button>
  );
}
