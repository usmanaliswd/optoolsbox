"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  Wrench,
  Image,
  Link as LinkIcon,
  ChevronDown,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Calculators",
    icon: Wrench,
    children: [
      { label: "BMI Calculator", href: "/calculators/bmi" },
      { label: "Age Calculator", href: "/calculators/age" },
    ],
  },
  {
    label: "Image Tools",
    icon: Image,
    children: [
      { label: "Image Converter", href: "/tools/image-tools/converter" },
    ],
  },
  {
    label: "Link Tools",
    icon: LinkIcon,
    children: [{ label: "URL Shortener", href: "/tools/link-tools/shortener" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const RenderNavContent = () => (
    <nav className="space-y-4">
      {links.map(({ label, href, icon: Icon, children }) => {
        const isParentActive =
          children?.some((child) => child.href === pathname) ||
          pathname === href;
        const isOpen = openMenus.includes(label);

        return (
          <div key={label}>
            <div
              className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all",
                isParentActive
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-white/10"
              )}
              onClick={() => {
                if (children) toggleMenu(label);
              }}
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="h-5 w-5" />}
                {href ? (
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                ) : (
                  <span>{label}</span>
                )}
              </div>
              {children && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </div>

            {children && isOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-2 py-1 rounded-md text-sm",
                      pathname === child.href
                        ? "bg-white text-black font-medium"
                        : "hover:bg-white/10"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ✅ Mobile Sidebar */}
      <div className="md:hidden p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent focus:ring-0 focus-visible:ring-0 p-0"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-60 bg-[#0f1515] text-white p-4"
          >
            <SheetHeader>
              {/* ✅ Fix: accessibility error by adding SheetTitle */}
              <SheetTitle className="text-2xl text-white font-bold mb-6">
                TopToolsBox
              </SheetTitle>
            </SheetHeader>
            {RenderNavContent()}
          </SheetContent>
        </Sheet>
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 w-60 h-full bg-[#0f1515] text-white p-4">
        <div className="text-2xl font-bold mb-6">TopToolsBox</div>
        {RenderNavContent()}
      </aside>
    </>
  );
}
