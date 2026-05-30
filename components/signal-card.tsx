import { Clock, MoreVertical, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SignalCardProps {
  id: string;
  title: string;
  theme: "red" | "orange" | "green" | "blue";
  icon: React.ReactNode;
  tags: string[];
  noResponseText?: string;
  waitingOnText?: string;
  createdTime: string;
  lastActivityTime: string;
  badges: {
    text: string;
    variant:
      | "warning"
      | "destructive"
      | "pending"
      | "success"
      | "default"
      | "secondary"
      | "outline";
  }[];
  statusBadge?: {
    text: string;
    variant:
      | "warning"
      | "destructive"
      | "pending"
      | "success"
      | "default"
      | "secondary"
      | "outline";
  };
}

export function SignalCard({
  title,
  theme,
  icon,
  tags,
  noResponseText,
  waitingOnText,
  createdTime,
  lastActivityTime,
  badges,
  statusBadge,
}: SignalCardProps) {
  const themeStyles = {
    red: "border-[#FFD6DE] bg-[#FFF3F6]",
    orange: "border-[#FFE3C2] bg-[#FFF6EA]",
    green: "border-[#CDEDE3] bg-[#F1FBF7]",
    blue: "border-[#D6E5FF] bg-[#F2F6FF]",
  };

  const iconContainerStyles = {
    red: "bg-[#FFE0E8] text-[#E0556E]",
    orange: "bg-[#FF9F42] text-white",
    green: "bg-[#53C7AE] text-white",
    blue: "bg-[#6EA8FF] text-white",
  };

  const statusBadgeStyles = {
    destructive: "bg-[#FFE8EE] text-[#E0556E] border-[#FFD6DE]",
    warning: "bg-[#FFF3E6] text-[#E28A2B] border-[#FFE3C2]",
    pending: "bg-[#FFF3E6] text-[#E28A2B] border-[#FFE3C2]",
    success: "bg-[#E6F7F0] text-[#1F8D64] border-[#CDEDE3]",
    default: "bg-gray-50 text-gray-600 border-gray-200",
    secondary: "bg-gray-50 text-gray-600 border-gray-200",
    outline: "bg-white text-gray-600 border-gray-200",
  } as const;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 bg-white relative transition-all",
        themeStyles[theme],
      )}
    >
      <div className="flex items-start w-full min-w-0 gap-4">
        <div
          className={cn(
            "shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center",
            iconContainerStyles[theme],
          )}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
            <h4 className="text-sm md:text-base font-semibold text-gray-900 truncate w-full sm:w-auto whitespace-normal sm:whitespace-nowrap">
              {title}
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {badges.map((b, i) => (
                <Badge key={i} variant={b.variant}>
                  {b.text}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-500 gap-y-1 gap-x-2">
            {tags.map((tag, i) => (
              <span key={i} className="flex items-center">
                {tag}
                {i < tags.length - 1 && (
                  <span className="ml-2 w-1 h-1 rounded-xl bg-gray-300"></span>
                )}
              </span>
            ))}
          </div>

          {(noResponseText || waitingOnText) && (
            <div className="flex items-center flex-wrap text-xs sm:text-sm text-gray-600 gap-y-1 gap-x-2 mt-1">
              {noResponseText && (
                <span
                  className={cn(
                    "flex items-center font-medium",
                    theme === "red" ? "text-red-600" : "",
                  )}
                >
                  {theme === "red" && <span className="mr-1">⚠️</span>}
                  {noResponseText}
                </span>
              )}
              {noResponseText && waitingOnText && (
                <span className="w-1 h-1 hidden sm:inline-block rounded-xl bg-gray-300"></span>
              )}
              {waitingOnText && <span>{waitingOnText}</span>}
            </div>
          )}

          <div className="flex items-center flex-wrap text-[11px] sm:text-xs text-gray-400 gap-y-1 gap-x-3 mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Created {createdTime}
            </span>
            <span className="w-1 h-1 hidden sm:inline-block rounded-xl bg-gray-300"></span>
            <span>Last activity {lastActivityTime}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:ml-4 pt-2 sm:pt-0 border-t border-gray-200/50 sm:border-0">
        <div className="flex items-center gap-3">
          {statusBadge && (
            <Badge
              variant={statusBadge.variant}
              className={cn(
                "px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm",
                statusBadgeStyles[statusBadge.variant],
              )}
            >
              {statusBadge.text}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="text-blue-600 border-blue-100 mt-0 sm:mt-2 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm rounded-xl font-medium hover:bg-blue-50 shrink-0"
        >
          View thread
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
