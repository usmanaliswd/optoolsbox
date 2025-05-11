"use client";

import SheetSide from "@/components/SheetSide";

export function Header() {
  return (
    <header className="flex md:hidden justify-between items-center p-4 border-b border-white/10">
      <SheetSide />
      <h1 className="text-xl font-bold">TopToolsBox</h1>
    </header>
  );
}
