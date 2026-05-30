"use client";

import { useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  Filter,
  Speaker,
  Shield,
  Code,
  Scale,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignalCard } from "./signal-card";
import { selectJasoDashboard, type SignalCardData } from "@/lib/jasoSlice";

type FilterType = "all" | "attention" | "slowing" | "stable";

const sectionAccentStyles = {
  red: "text-red-500",
  orange: "text-orange-400",
  emerald: "text-emerald-500",
} as const;

const iconMap: Record<SignalCardData["iconKey"], ReactNode> = {
  speaker: <Speaker className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6 text-white" />,
  check: (
    <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-white rounded-xl" />
  ),
};

export function MainContent() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const { operationalHealth, signalSections } =
    useSelector(selectJasoDashboard);

  const toggleSection = (id: string) => {
    setCollapsedSections((s) => ({ ...s, [id]: !s[id] }));
  };

  const counts = signalSections.reduce(
    (accumulator, section) => {
      accumulator[section.id] = section.count;
      accumulator.total += section.count;
      return accumulator;
    },
    {
      blocked: 0,
      slowing: 0,
      stable: 0,
      total: 0,
    },
  );

  const visibleSections = signalSections.filter((section) => {
    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "attention") {
      return section.id === "blocked";
    }

    if (activeFilter === "slowing") {
      return section.id === "slowing";
    }

    return section.id === "stable";
  });

  return (
    <div className="flex flex-col w-full h-full min-w-0 mt-10 md:mt-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x whitespace-nowrap">
          <Button
            variant={
              activeFilter === "attention" || activeFilter === "all"
                ? "secondary"
                : "outline"
            }
            onClick={() =>
              setActiveFilter(
                activeFilter === "attention" ? "all" : "attention",
              )
            }
            className={`rounded-xl gap-2 snap-start shrink-0 border ${
              activeFilter === "attention" || activeFilter === "all"
                ? "bg-blue-50 text-blue-700 font-semibold border-blue-100"
                : "font-medium text-gray-600 border-gray-200 bg-white"
            }`}
          >
            Needs Attention
            <Badge
              variant="destructive"
              className="bg-[#E0556E] text-white border-0"
            >
              {counts.blocked}
            </Badge>
          </Button>
          <Button
            variant={activeFilter === "slowing" ? "secondary" : "outline"}
            onClick={() =>
              setActiveFilter(activeFilter === "slowing" ? "all" : "slowing")
            }
            className={`rounded-xl gap-2 snap-start shrink-0 border ${
              activeFilter === "slowing"
                ? "border-gray-500 bg-orange-50 text-orange-700 font-semibold"
                : "font-medium text-gray-600 border-gray-200 bg-white"
            }`}
          >
            Slowing Down
            <Badge
              variant="warning"
              className="bg-[#F39B3D] text-white border-0"
            >
              {counts.slowing}
            </Badge>
          </Button>
          <Button
            variant={activeFilter === "stable" ? "secondary" : "outline"}
            onClick={() =>
              setActiveFilter(activeFilter === "stable" ? "all" : "stable")
            }
            className={`rounded-xl gap-2 snap-start shrink-0 border ${
              activeFilter === "stable"
                ? "bg-emerald-50 text-emerald-700 font-semibold border-emerald-100"
                : "font-medium text-gray-600 border-gray-200 bg-white"
            }`}
          >
            Stable / FYI
            <Badge
              variant="success"
              className="bg-[#53C7AE] text-white border-0"
            >
              {counts.stable}
            </Badge>
          </Button>
        </div>

        <Button
          variant="outline"
          className="rounded-xl gap-2 font-medium bg-white shrink-0 self-start md:self-auto border border-blue-100 text-blue-700"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {visibleSections.map((section) => {
          const isCollapsed = !!collapsedSections[section.id];

          return (
            <section
              key={section.id}
              className="rounded-3xl border border-gray-200 bg-white p-4 md:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.24em] flex items-center gap-2">
                    <span className={sectionAccentStyles[section.accent]}>
                      {section.iconLabel}
                    </span>
                    {section.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-500 sm:text-right max-w-xl">
                    {section.subtitle}
                  </p>
                  <button
                    aria-expanded={!isCollapsed}
                    onClick={() => toggleSection(section.id)}
                    className="p-2 rounded-xl hover:bg-gray-100"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-150 ${
                        isCollapsed ? "rotate-0" : "-rotate-180"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div
                className={`flex flex-col gap-3 transition-[max-height] duration-200 ease-in-out overflow-hidden ${
                  isCollapsed ? "max-h-0" : "max-h-[2000px]"
                }`}
              >
                {section.items.map((signal) => (
                  <SignalCard
                    key={signal.id}
                    id={signal.id}
                    title={signal.title}
                    theme={signal.theme}
                    icon={iconMap[signal.iconKey]}
                    tags={signal.tags}
                    noResponseText={signal.noResponseText}
                    waitingOnText={signal.waitingOnText}
                    createdTime={signal.createdTime}
                    lastActivityTime={signal.lastActivityTime}
                    badges={signal.badges}
                    statusBadge={signal.statusBadge}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <div className="text-xs text-gray-400 flex flex-wrap items-center gap-2 mt-2 pt-4 border-t border-blue-100/60 pb-8">
          <span>Sort icon</span>
          <span>
            Sorted by <strong className="text-gray-600">impact</strong>
          </span>
          <span className="w-1 h-1 rounded-xl bg-gray-300"></span>
          <span>
            Showing {counts.total} of {operationalHealth.totalRecords} signals
          </span>
        </div>
      </div>
    </div>
  );
}
