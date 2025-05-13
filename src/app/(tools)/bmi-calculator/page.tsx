import BMICalculator from "../../../components/BMICalculator";

export const metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index",
  description:
    "Use this free BMI Calculator to determine your Body Mass Index (BMI) based on weight and height. Supports metric and imperial units with category insights.",
  keywords: [
    "BMI Calculator",
    "Body Mass Index",
    "Calculate BMI",
    "Health Calculator",
    "Weight Loss Tracker",
    "Calorie Counter",
    "Nutrition Planner",
    "Weight Calculator",
    "Metric BMI",
    "Imperial BMI",
    "Healthy Weight",
    "Obesity Calculator",
    "Fitness Tool",
  ],
  openGraph: {
    title: "BMI Calculator - Accurate Health Assessment Tool",
    description:
      "Calculate your BMI with our free online tool. Supports metric and imperial units, with detailed category information for health monitoring.",
    url: "https://yourdomain.com/calculators/bmi",
    siteName: "YourSiteName",
    images: [
      {
        url: "https://yourdomain.com/og-images/bmi-calculator.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator - YourSiteName",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator - Accurate Health Assessment Tool",
    description:
      "Calculate your BMI with our free tool. Supports metric and imperial units, with detailed category insights.",
    images: ["https://yourdomain.com/og-images/bmi-calculator.png"],
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

export default function BMICalculatorPage() {
  return <BMICalculator />;
}
