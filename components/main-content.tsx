"use client";

import { useState } from "react";
import {
  Filter,
  Layers,
  Speaker,
  Shield,
  Code,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignalCard } from "./signal-card";

type FilterType = "all" | "attention" | "slowing" | "stable";

export function MainContent() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  return (
    <div className="flex flex-col w-full h-full min-w-0">
      {/* Tabs / Filters Section */}
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
            className={`rounded-full gap-2 snap-start shrink-0 ${
              activeFilter === "attention" || activeFilter === "all"
                ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                : "font-medium text-gray-600 border-transparent bg-white shadow-sm"
            }`}
          >
            Needs Attention{" "}
            <Badge
              variant="destructive"
              className="bg-[#E0556E] text-white border-0"
            >
              1
            </Badge>
          </Button>
          <Button
            variant={activeFilter === "slowing" ? "secondary" : "outline"}
            onClick={() =>
              setActiveFilter(activeFilter === "slowing" ? "all" : "slowing")
            }
            className={`rounded-full gap-2 snap-start shrink-0 ${
              activeFilter === "slowing"
                ? "bg-orange-50 text-orange-700 font-semibold border border-orange-100"
                : "font-medium text-gray-600 border-transparent bg-white shadow-sm"
            }`}
          >
            Slowing Down{" "}
            <Badge
              variant="warning"
              className="bg-[#F39B3D] text-white border-0"
            >
              2
            </Badge>
          </Button>
          <Button
            variant={activeFilter === "stable" ? "secondary" : "outline"}
            onClick={() =>
              setActiveFilter(activeFilter === "stable" ? "all" : "stable")
            }
            className={`rounded-full gap-2 snap-start shrink-0 ${
              activeFilter === "stable"
                ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100"
                : "font-medium text-gray-600 border-transparent bg-white shadow-sm"
            }`}
          >
            Stable / FYI{" "}
            <Badge
              variant="success"
              className="bg-[#53C7AE] text-white border-0"
            >
              2
            </Badge>
          </Button>
        </div>

        <Button
          variant="outline"
          className="rounded-full gap-2 font-medium bg-white shrink-0 self-start md:self-auto border-blue-100 text-blue-700 shadow-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Blocked Section */}
        {(activeFilter === "all" || activeFilter === "attention") && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span className="text-red-500">⚠️</span> BLOCKED (Requires
              immediate action){" "}
              <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
                1
              </span>
            </h3>
            <div className="flex flex-col gap-3">
              <SignalCard
                id="1"
                title="Backend integration may block release"
                theme="red"
                icon={<Speaker className="w-6 h-6" />}
                tags={["Ryan", "Engineering"]}
                noResponseText="No response for 6h"
                waitingOnText="Waiting on Infra Team"
                createdTime="15m ago"
                lastActivityTime="6h ago"
                badges={[{ text: "High impact", variant: "destructive" }]}
                statusBadge={{ text: "At Risk", variant: "destructive" }}
              />
            </div>
          </section>
        )}

        {/* Slowing Down Section */}
        {(activeFilter === "all" || activeFilter === "slowing") && (
          <section className="mt-6 pt-5 border-t border-blue-100/60">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span className="text-orange-400">🛡️</span> SLOWING DOWN (Monitor
              and act soon){" "}
              <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
                2
              </span>
            </h3>
            <div className="flex flex-col gap-3">
              <SignalCard
                id="2"
                title="Legal approval required for overnight event"
                theme="orange"
                icon={<Shield className="w-6 h-6" />}
                tags={["Legal", "Finance Team"]}
                noResponseText="No response for 3h"
                waitingOnText="Waiting on Legal"
                createdTime="15m ago"
                lastActivityTime="3h ago"
                badges={[{ text: "Medium impact", variant: "warning" }]}
                statusBadge={{ text: "Pending", variant: "pending" }}
              />
              <SignalCard
                id="3"
                title="Budget approval for marketing campaign"
                theme="orange"
                icon={<Code className="w-6 h-6" />}
                tags={["Legal", "Finance Team"]}
                noResponseText="Multiple follow-ups"
                waitingOnText="Waiting on Finance"
                createdTime="15m ago"
                lastActivityTime="2h ago"
                badges={[{ text: "Medium impact", variant: "warning" }]}
                statusBadge={{ text: "Pending", variant: "pending" }}
              />
            </div>
          </section>
        )}

        {/* Stable / FYI Section */}
        {(activeFilter === "all" || activeFilter === "stable") && (
          <section className="mt-6 pt-5 border-t border-blue-100/60">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span className="text-emerald-500">✔️</span> STABLE / FYI (No
              action needed){" "}
              <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
                2
              </span>
            </h3>
            <div className="flex flex-col gap-3">
              <SignalCard
                id="4"
                title="Legal approval required for overnight event"
                theme="green"
                icon={<Scale className="w-6 h-6 text-white" />}
                tags={["Legal", "Finance Team"]}
                noResponseText="Responded 2h ago"
                waitingOnText="On track"
                createdTime="15m ago"
                lastActivityTime="2h ago"
                badges={[]}
                statusBadge={{ text: "FYI", variant: "success" }}
              />
              <SignalCard
                id="5"
                title="Homepage design approval"
                theme="green"
                icon={
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-white rounded-full" />
                }
                tags={["Review Team"]}
                noResponseText="Completed 2h ago"
                waitingOnText="Closed"
                createdTime="15m ago"
                lastActivityTime="2h ago"
                badges={[]}
                statusBadge={{ text: "Closed", variant: "outline" }}
              />
            </div>
          </section>
        )}

        {/* Footer info */}
        <div className="text-xs text-gray-400 flex items-center gap-2 mt-6 pt-4 border-t border-blue-100/60 pb-8">
          <span>Sort icon</span>
          <span>
            Sorted by <strong className="text-gray-600">impact</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>Showing 5 of 7 signals</span>
        </div>
      </div>
    </div>
  );
}
