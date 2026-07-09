import { Link, useLocation } from "wouter";
import { Home, Wallet, Plus, Percent, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Лента" },
    { path: "/tokens", icon: Wallet, label: "Токены" },
    { path: "/upload", icon: Plus, label: "Создать", isCenter: true },
    { path: "/profit", icon: Percent, label: "Профит" },
    { path: "/profile", icon: User, label: "Профиль" },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
      <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2">
        {navItems.map((item, index) => {
          const isActive = location === item.path || (item.path === '/profile' && location.startsWith('/u/'));
          
          if (item.isCenter) {
            return (
              <Link key={index} href="/upload" className="relative group mx-2">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(30,161,242,0.4)]"
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
                {/* Thin earning ring mock */}
                {location === '/' && (
                  <svg className="absolute -inset-1 w-14 h-14 -rotate-90 animate-spin-slow pointer-events-none">
                    <circle 
                      cx="28" cy="28" r="26" 
                      fill="none" 
                      stroke="rgba(255,165,0,0.5)" 
                      strokeWidth="2"
                      strokeDasharray="163"
                      strokeDashoffset="80"
                    />
                  </svg>
                )}
              </Link>
            );
          }

          return (
            <Link key={index} href={item.path}>
              <motion.div 
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "flex flex-col items-center justify-center w-14 h-12 rounded-2xl gap-1 transition-colors",
                  isActive ? "text-primary" : "text-white/50 hover:text-white/80"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
