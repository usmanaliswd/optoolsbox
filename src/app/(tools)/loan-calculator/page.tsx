"use client";

import { Metadata } from "next";
import LoanCalculator from "../../..//components/LoanCalculator"; // Placeholder for your LoanCalculator component

// Metadata for SEO
export const metadata: Metadata = {
  title: "Loan Calculator - Calculate Monthly Payments & Interest",
  description:
    "Use our free loan calculator to estimate monthly payments, interest rates, and amortization schedules for personal, auto, or mortgage loans.",
  keywords: [
    "loan calculator",
    "mortgage calculator",
    "monthly payment calculator",
    "interest rate calculator",
    "amortization schedule",
    "personal loan calculator",
    "auto loan calculator",
    "home loan calculator",
    "loan repayment calculator",
    "financial calculator",
  ],
  openGraph: {
    title: "Loan Calculator - Calculate Monthly Payments & Interest",
    description:
      "Estimate your loan payments with our easy-to-use calculator. Input loan amount, interest rate, and term to see monthly payments and total interest.",
    url: "https://yourdomain.com/loan-calculator",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/loan-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Loan Calculator Preview",
      },
    ],
  },
  alternates: {
    canonical: "https://yourdomain.com/loan-calculator",
  },
};

export default function LoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <LoanCalculator />
    </div>
  );
}
