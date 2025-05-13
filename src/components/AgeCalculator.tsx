"use client";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { CalendarIcon, RefreshCcw } from "lucide-react";
import { format, differenceInSeconds, parse } from "date-fns";
import { motion } from "framer-motion";

type AgeResult = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
};

export default function AgeCalculator() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [manualDate, setManualDate] = useState<string>("");
  const [age, setAge] = useState<AgeResult | null>(null);
  const [liveAge, setLiveAge] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  // Live timer effect
  useEffect(() => {
    if (!date || !age) return;

    const updateLiveAge = () => {
      const now = new Date();
      const birthDate = new Date(date);

      const diffInSeconds = differenceInSeconds(now, birthDate);

      const seconds = diffInSeconds;
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let exactYears = now.getFullYear() - birthDate.getFullYear();
      let exactMonths = now.getMonth() - birthDate.getMonth();
      let exactDays = now.getDate() - birthDate.getDate();

      if (exactDays < 0) {
        exactMonths--;
        const lastDayOfPrevMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        ).getDate();
        exactDays += lastDayOfPrevMonth;
      }

      if (exactMonths < 0) {
        exactYears--;
        exactMonths += 12;
      }

      setLiveAge({
        years: exactYears,
        months: exactMonths,
        days: exactDays,
        hours,
        minutes,
        seconds,
        totalDays: days,
      });
    };

    updateLiveAge();
    const timer = setInterval(updateLiveAge, 1000);
    return () => clearInterval(timer);
  }, [date, age]);

  const calculateAge = useCallback(() => {
    setError("");
    setShowResults(false);

    if (!date) {
      setError("Please select your date of birth");
      return;
    }

    const birthDate = new Date(date);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      setError("Invalid date format");
      return;
    }

    if (birthDate > today) {
      setError("Birth date cannot be in the future");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += lastDayOfPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const diffInSeconds = differenceInSeconds(today, birthDate);
    const seconds = diffInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const result = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      totalDays,
    };

    setAge(result);
    setLiveAge(result);
    setTimeout(() => setShowResults(true), 100);
  }, [date]);

  const resetCalculator = () => {
    setShowResults(false);
    setTimeout(() => {
      setDate(undefined);
      setManualDate("");
      setAge(null);
      setLiveAge(null);
      setError("");
    }, 300);
  };

  interface ManualDateChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleManualDateChange = (e: ManualDateChangeEvent): void => {
    const input = e.target.value;
    setManualDate(input);
    if (input.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const parsedDate = parse(input, "MM/dd/yyyy", new Date());
      if (parsedDate.getFullYear() >= 1900 && parsedDate <= new Date()) {
        setDate(parsedDate);
        setError("");
      } else {
        setError("Date must be between 1900 and today");
      }
    } else if (input) {
      setError("Please use MM/DD/YYYY format");
    } else {
      setDate(undefined);
      setError("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4 bg-transparent">
      <Card className="w-full max-w-4xl bg-transparent backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-2">
            <CalendarIcon className="h-7 w-7 text-white" />
            Age Calculator
          </CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Enter your date of birth to calculate your exact age.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="dob" className="text-white text-lg">
              Date of Birth
            </Label>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="manual-dob"
                  type="text"
                  value={manualDate}
                  onChange={handleManualDateChange}
                  placeholder="MM/DD/YYYY"
                  className="bg-transparent border-white/30 text-white placeholder-gray-400 pr-10"
                  aria-label="Enter birth date manually"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
              </div>
              <p className="text-white/60 text-sm">
                Example: Enter your date as 02/19/1999. Use MM/DD/YYYY format.
              </p>
              {error && (
                <p
                  id="dob-error"
                  className="text-red-400 text-sm mt-1"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={calculateAge}
              className="h-12 text-lg bg-transparent border border-white/30 text-white hover:bg-white/10"
              disabled={!date}
              aria-label="Calculate age"
            >
              Calculate
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="h-12 text-lg bg-transparent border-white/20 text-white hover:bg-white/10"
              aria-label="Reset calculator"
              disabled={!date}
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          {age && (
            <motion.div
              className="mt-6 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={showResults ? "visible" : "hidden"}
            >
              <motion.p
                className="text-white/80 text-xl text-center font-medium"
                variants={itemVariants}
              >
                You are
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Years
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold">
                        {liveAge ? liveAge.years : age.years}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Months
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold">
                        {liveAge ? liveAge.months : age.months}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Days
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold">
                        {liveAge ? liveAge.days : age.days}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold">
                        {(liveAge ? liveAge.hours : age.hours).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Minutes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold animate-pulse">
                        {(liveAge
                          ? liveAge.minutes
                          : age.minutes
                        ).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-transparent border border-white shadow-lg overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-center text-lg">
                        Seconds
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-white text-xl md:text-3xl font-bold animate-pulse">
                        {(liveAge
                          ? liveAge.seconds
                          : age.seconds
                        ).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <Card className="bg-transparent border border-white shadow-lg">
                  <CardContent className="py-4">
                    <p className="text-center text-white/80">
                      Total Days:{" "}
                      <span className="font-bold text-white">
                        {(liveAge
                          ? liveAge.totalDays
                          : age.totalDays
                        ).toLocaleString()}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-white/40 justify-center pt-0 pb-4 mt-7">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-center w-full">
            <Link href="/bmi-calculator" className="w-full md:w-auto">
              <span className="block w-full text-center px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition">
                Try BMI Calculator
              </span>
            </Link>
            <Link
              href="/tools/image-tools/converter"
              className="w-full md:w-auto"
            >
              <span className="block w-full text-center px-5 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition">
                Use Image Converter
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
