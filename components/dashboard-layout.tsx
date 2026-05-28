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
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fd] via-[#f6f8ff] to-[#f3f6ff] flex flex-col font-sans">
      <header className="sticky top-0 z-30 flex min-h-[5rem] h-auto py-3 md:py-0 md:h-20 items-center justify-between gap-4 border-b border-blue-100/60 bg-white/80 backdrop-blur px-4 md:px-8">
        {header}
      </header>
      <div className="flex flex-1 flex-col lg:flex-row p-4 md:p-8 gap-8 items-start justify-center max-w-[1480px] w-full mx-auto">
        <main className="flex-1 w-full min-w-0 flex flex-col gap-6">
          {main}
        </main>
        <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-6">
          {sidebar}
        </aside>
      </div>
    </div>
  );
}
