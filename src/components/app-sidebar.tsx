"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Link,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Calculators",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Age Calculator",
          url: "/age-calculator",
        },
        {
          title: "BMI Calculator",
          url: "#",
        },
        {
          title: "EMI Calculator",
          url: "#",
        },
        {
          title: "Date difference",
          url: "#",
        },
        {
          title: "Loan/EMI Calculator",
          url: "#",
        },
        {
          title: "Discount Calculator",
          url: "#",
        },
        {
          title: "Percentage Calculator",
          url: "#",
        },
      ],
    },
    {
      title: "Converters",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "PDF to Word",
          url: "#",
        },
        {
          title: "Image Extension Converter",
          url: "#",
        },
        {
          title: "Temperature Units",
          url: "#",
        },
        {
          title: "Currency Converter",
          url: "#",
        },
        {
          title: "Time Zone Converter",
          url: "#",
        },
      ],
    },
    {
      title: "Text Tools",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Slug Generator",
          url: "#",
        },
        {
          title: "Remove Duplicate Lines",
          url: "#",
        },
        {
          title: "Text Case Converter",
          url: "#",
        },
        {
          title: "Text Repeater",
          url: "#",
        },
      ],
    },
    {
      title: "Coding/Dev Tools",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "JSON Formatter/Validator",
          url: "#",
        },
        {
          title: "QR Code Generator",
          url: "#",
        },
        {
          title: "Color Picker",
          url: "#",
        },
        {
          title: "Lorem Ipsum Generator",
          url: "#",
        },
      ],
    },
    {
      title: "Social Links Tree",
      url: "#",
      icon: Link,
      // items: [
      //   {
      //     title: "JSON Formatter/Validator",
      //     url: "#",
      //   },
      //   {
      //     title: "QR Code Generator",
      //     url: "#",
      //   },
      //   {
      //     title: "Color Picker",
      //     url: "#",
      //   },
      //   {
      //     title: "Lorem Ipsum Generator",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "SEO/Marketing",
      url: "#",
      icon: Link,
      items: [
        {
          title: "Meta Tag Generator",
          url: "#",
        },
        {
          title: "UTM Builder",
          url: "#",
        },
        {
          title: "Keyword Density Checker",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}

        <h1 className="text-xl font-bold p-4 dark:text-white">TopToolsBox</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
