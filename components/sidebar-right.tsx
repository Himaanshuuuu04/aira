"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  AlertTriangle,
  Clock,
  UserX,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { selectJasoDashboard } from "@/lib/jasoSlice";

export function RightSidebar() {
  const [snapshotView, setSnapshotView] = useState("Today");
  const { executionSnapshot, topRisks, trendData, operationalHealth } =
    useSelector(selectJasoDashboard);

  const snapshot =
    executionSnapshot.views[snapshotView as "Today" | "This Week"];

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="rounded-3xl border-gray-200 bg-white overflow-hidden">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">
            Operational Health
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex items-end justify-between gap-4 rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50 border border-blue-100/70 p-4">
            <div>
              <p className="text-4xl font-bold tracking-tight text-gray-900">
                {operationalHealth.smoothPercent}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {operationalHealth.smoothRecords} smooth out of{" "}
                {operationalHealth.totalRecords} records
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-600">
                Intervention
              </p>
              <p className="text-2xl font-bold text-rose-600">
                {operationalHealth.interventionPercent}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-gray-200 overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">
            Execution Snapshot
          </CardTitle>
          <span
            className="text-[11px] text-gray-500 flex items-center cursor-pointer hover:text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1"
            onClick={() =>
              setSnapshotView(snapshotView === "Today" ? "This Week" : "Today")
            }
          >
            {snapshotView} <ChevronRight className="w-3 h-3 ml-1" />
          </span>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-red-100 bg-red-50/70 hover:bg-red-50 transition-colors cursor-pointer rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-2xl leading-none font-semibold text-gray-900">
                  {snapshot.blocked}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">Blocked</p>
              <p className="text-[11px] text-gray-500">Needs action now</p>
            </div>

            <div className="border border-orange-100 bg-orange-50/70 hover:bg-orange-50 transition-colors cursor-pointer rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-2xl leading-none font-semibold text-gray-900">
                  {snapshot.slowingDown}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">
                Slowing down
              </p>
              <p className="text-[11px] text-gray-500">Monitor and act soon</p>
            </div>

            <div className="border border-yellow-100 bg-yellow-50/70 hover:bg-yellow-50 transition-colors cursor-pointer rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <UserX className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl leading-none font-semibold text-gray-900">
                  {snapshot.missingOwner}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">
                Missing owner
              </p>
              <p className="text-[11px] text-gray-500">Need ownership</p>
            </div>

            <div className="border border-green-100 bg-green-50/70 hover:bg-green-50 transition-colors cursor-pointer rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl leading-none font-semibold text-gray-900">
                  {snapshot.stable}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">
                Stable / FYI
              </p>
              <p className="text-[11px] text-gray-500">No action needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-gray-200 bg-white">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">
            Top Risks
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          {topRisks.map((risk, i) => (
            <div
              key={i}
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-xl bg-pink-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {risk.title}
                  </p>
                  <p className="text-xs text-gray-500">{risk.sub}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-white/80 bg-white/85">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">
            Trend{" "}
            <span className="text-gray-400 font-medium normal-case">
              (Last 7 days)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="h-24 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  cursor={{
                    stroke: "#ff4d4f",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  itemStyle={{ color: "#ff4d4f", fontWeight: "semibold" }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  activeDot={{ r: 4, strokeWidth: 0, fill: "#ff4d4f" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2">
            <div className="hover:bg-red-50/50 p-2 -m-2 rounded-lg cursor-pointer transition-colors">
              <p className="text-xl font-bold text-gray-900">
                {snapshot.blocked * 4}
              </p>
              <p className="text-[10px] text-gray-500 mb-1">Blocked</p>
              <p className="text-[10px] font-medium text-red-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> 20%
              </p>
            </div>
            <div className="hover:bg-orange-50/50 p-2 -m-2 rounded-lg cursor-pointer transition-colors">
              <p className="text-xl font-bold text-gray-900">
                {snapshot.slowingDown * 9}
              </p>
              <p className="text-[10px] text-gray-500 mb-1">Slowing</p>
              <p className="text-[10px] font-medium text-orange-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
              </p>
            </div>
            <div className="hover:bg-green-50/50 p-2 -m-2 rounded-lg cursor-pointer transition-colors">
              <p className="text-xl font-bold text-gray-900">
                {snapshot.stable * 4}
              </p>
              <p className="text-[10px] text-gray-500 mb-1">Resolved</p>
              <p className="text-[10px] font-medium text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5 rotate-180" /> 28%
              </p>
            </div>
            <div className="hover:bg-gray-50/50 p-2 -m-2 rounded-lg cursor-pointer transition-colors">
              <p className="text-xl font-bold text-gray-900">
                {snapshot.avgResponseTime}
              </p>
              <p className="text-[10px] text-gray-500 mb-1">
                Avg. response time
              </p>
              <p className="text-[10px] font-medium text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5 rotate-180" /> 18%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-blue-100 bg-linear-to-br from-blue-50 to-white overflow-hidden">
        <CardContent className="p-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900 mb-1">
              How AIRA helps
            </h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              We surface what matters, suggest what helps, and keep your team
              moving.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-blue-600 flex items-center hover:underline"
            >
              Learn more <ChevronRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
