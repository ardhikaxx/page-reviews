"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Loader2, LogOut, Menu, MessageSquareQuote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogoutClick = async () => {
    await signOut(auth);
  };

  const handleGoogleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Berhasil masuk!");
      setIsMenuOpen(false);
    } catch (error: unknown) {
      console.error("Login error:", error);
      const authError = error as { code?: string };
      if (authError.code !== 'auth/popup-closed-by-user' && authError.code !== 'auth/cancelled-popup-request') {
        toast.error("Gagal masuk dengan Google");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-5xl mx-auto">
      <nav className="bg-surface/85 backdrop-blur-md shadow-lg shadow-black/30 border border-foreground/12 rounded-full px-4 sm:px-6 relative">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquareQuote className="w-7 h-7 text-accent" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-foreground/45" />
            ) : user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-foreground/12">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-foreground/15 object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/12 text-accent border border-accent/25 flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.displayName || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="p-2 text-foreground/60 hover:text-accent hover:bg-accent/10 rounded-full transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="px-4 py-2 text-sm font-medium text-accent-foreground bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-sm shadow-accent/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Masuk dengan Google
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground/75 hover:text-foreground focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-surface border border-foreground/12 rounded-2xl shadow-xl shadow-black/40 overflow-hidden transition-all duration-200", isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none")}>
        <div className="px-4 py-4 space-y-1">
          {!loading && user ? (
            <div className="pb-1">
              <div className="flex items-center px-3 mb-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-foreground/15" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent/12 text-accent flex items-center justify-center font-bold text-lg">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">{user.displayName || "User"}</div>
                  <div className="text-sm font-medium text-foreground/60">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => { handleLogoutClick(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-accent/10"
              >
                <LogOut className="w-5 h-5" /> Keluar
              </button>
            </div>
          ) : !loading && (
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-accent hover:bg-accent-hover text-accent-foreground rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {isLoggingIn ? "Memproses..." : "Masuk dengan Google"}
              </button>
            </div>
          )}
        </div>
      </div>
      </nav>
    </div>
  );
}
