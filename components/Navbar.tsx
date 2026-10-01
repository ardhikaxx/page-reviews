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
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        toast.error("Gagal masuk dengan Google");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-5xl mx-auto">
      <nav className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border border-neutral-200/80 dark:border-neutral-800/80 rounded-full px-4 sm:px-6 relative">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquareQuote className="w-7 h-7 text-red-500" />
            </Link>
            
            {/* Desktop Left Nav */}
            <div className="hidden sm:flex items-center">
              <a 
                href="https://yanuar-ardhika.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Portofolio
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">

            
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
            ) : user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 max-w-[120px] truncate">
                    {user.displayName || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
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
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
              className="p-2 text-neutral-600 dark:text-neutral-400 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-200", isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none")}>
        <div className="px-4 pt-4 pb-6 space-y-1">
          <a 
            href="https://yanuar-ardhika.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Portofolio
          </a>
          
          {!loading && user ? (
            <div className="pt-4 pb-3 border-t border-neutral-200 dark:border-neutral-800 mt-4">
              <div className="flex items-center px-3 mb-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-neutral-800 dark:text-neutral-200">{user.displayName || "User"}</div>
                  <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => { handleLogoutClick(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut className="w-5 h-5" /> Keluar
              </button>
            </div>
          ) : !loading && (
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
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
