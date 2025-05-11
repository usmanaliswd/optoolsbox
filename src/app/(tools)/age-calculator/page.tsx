import AgeCalculator from "../../../components/AgeCalculator";

export const metadata = {
  title: "Age Calculator - Calculate Exact Age in Years, Months, Days & More",
  description:
    "Use this free and responsive Age Calculator to find your exact age in years, months, days, hours, minutes, and seconds. Live updating results with a smooth UI.",
  keywords: [
    "Age Calculator",
    "Exact Age Calculator",
    "Live Age Calculator",
    "Age in Seconds",
    "Age in Days",
    "Birthday Calculator",
    "Date of Birth to Age",
    "Calculate Age Online",
    "Shadcn UI Age Calculator",
    "Responsive Age Calculator",
    "Framer Motion UI Tool",
  ],
  openGraph: {
    title: "Age Calculator - Live Accurate Age Calculation Tool",
    description:
      "Calculate your age live in years, months, days, minutes & seconds. Fully responsive, beautiful UI with smooth animations.",
    url: "https://yourdomain.com/tools/age-calculator",
    siteName: "TopToolsBox",
    images: [
      {
        url: "https://yourdomain.com/og-images/age-calculator.png",
        width: 1200,
        height: 630,
        alt: "Age Calculator - TopToolsBox",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Live Accurate Age Calculation Tool",
    description:
      "Live age calculator to find your age in all time formats. Built with TypeScript, Shadcn, Tailwind & Framer Motion.",
    images: ["https://yourdomain.com/og-images/age-calculator.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function AgeCalculatorPage() {
  return <AgeCalculator />;
}
