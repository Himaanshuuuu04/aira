"use client";

import { Search, Bell, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { selectJasoDashboard } from "@/lib/jasoSlice";

export function Header() {
  const { header } = useSelector(selectJasoDashboard);
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 18) return "Good afternoon";
    return "Good night";
  };

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2 text-gray-500 rounded-xl bg-white border border-gray-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1b1f49]">
            {getTimeGreeting()}, {header.greetingName}
          </h1>
        </div>
        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1 gap-x-2 gap-y-1">
          <span>{new Date().toLocaleString()}</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-xl bg-gray-400"></span>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            {header.ctaLabel}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative hidden md:block md:w-[320px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />

          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full bg-white pl-9 rounded-xl border border-gray-200"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-blue-600 rounded-xl bg-white border border-white/80 hover:bg-blue-50"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-xl bg-blue-600 ring-2 ring-white"></span>
        </Button>
      </div>
    </div>
  );
}
