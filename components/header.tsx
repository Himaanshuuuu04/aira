import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2 text-gray-500"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1b1f49]">
            Good morning, Neha <span className="inline-block wave">👋</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1 gap-x-2 gap-y-1">
          <span>Tue, 19 Nov 2024, 10:13 AM</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-gray-400"></span>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Manage your team today
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative w-[320px] hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full bg-white/90 pl-9 rounded-xl border-blue-100/60 shadow-sm focus-visible:ring-blue-200"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-blue-600 rounded-full hover:bg-blue-50"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
        </Button>
      </div>
    </div>
  );
}
