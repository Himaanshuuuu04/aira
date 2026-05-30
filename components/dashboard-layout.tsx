"use client";
import React from "react";

export function DashboardLayout({
  header,
  main,
  sidebar,
}: {
  header: React.ReactNode;
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 flex min-h-20 h-auto py-3 md:py-0 md:h-20 items-center justify-between gap-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 md:px-8 w-full">
        {header}
      </header>
      <div className="relative flex flex-1 flex-col lg:flex-row p-4 md:p-8 gap-8 items-start justify-center w-full mx-auto max-w-370 pt-20">
        <main className="flex-1 w-full min-w-0 flex flex-col gap-6">
          {main}
        </main>
        <aside className="w-full lg:w-85 shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
          {sidebar}
        </aside>
      </div>
    </div>
  );
}
