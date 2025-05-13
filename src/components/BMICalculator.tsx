// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// type BMICategory = {
//   range: string;
//   description: string;
// };

// type BMIResult = {
//   bmi: number | null;
//   category: string;
//   error: string | null;
// };

// type UnitSystem = "metric" | "imperial";

// export default function BMICalculator() {
//   const [weight, setWeight] = useState<string>("");
//   const [height, setHeight] = useState<string>("");
//   const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
//   const [result, setResult] = useState<BMIResult>({
//     bmi: null,
//     category: "",
//     error: null,
//   });

//   const calculateBMI = () => {
//     const w = parseFloat(weight);
//     const h = parseFloat(height);

//     if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
//       setResult({
//         bmi: null,
//         category: "",
//         error: "Please enter valid weight and height values.",
//       });
//       return;
//     }

//     let bmi: number;
//     if (unitSystem === "metric") {
//       bmi = w / ((h / 100) * (h / 100)); // height in cm, weight in kg
//     } else {
//       const heightInInches = h;
//       const weightInPounds = w;
//       bmi = (weightInPounds / (heightInInches * heightInInches)) * 703; // imperial formula
//     }

//     const categories: BMICategory[] = [
//       { range: "< 18.5", description: "Underweight" },
//       { range: "18.5 - 24.9", description: "Normal weight" },
//       { range: "25 - 29.9", description: "Overweight" },
//       { range: "30+", description: "Obese" },
//     ];

//     let category = "";
//     if (bmi < 18.5) category = "Underweight";
//     else if (bmi >= 18.5 && bmi <= 24.9) category = "Normal weight";
//     else if (bmi >= 25 && bmi <= 29.9) category = "Overweight";
//     else category = "Obese";

//     setResult({
//       bmi: Number(bmi.toFixed(1)),
//       category,
//       error: null,
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">BMI Calculator</h1>
//       <Tabs defaultValue="metric" className="w-full">
//         <TabsList className="grid w-full grid-cols-3 mb-4">
//           <TabsTrigger
//             value="metric"
//             className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
//           >
//             Metric
//           </TabsTrigger>
//           <TabsTrigger
//             value="imperial"
//             className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
//           >
//             Imperial
//           </TabsTrigger>
//           <TabsTrigger
//             value="categories"
//             className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
//           >
//             BMI Categories
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="metric">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="weight-metric" className="text-gray-700">
//                 Weight (kg)
//               </Label>
//               <Input
//                 id="weight-metric"
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter weight in kg"
//               />
//             </div>
//             <div>
//               <Label htmlFor="height-metric" className="text-gray-700">
//                 Height (cm)
//               </Label>
//               <Input
//                 id="height-metric"
//                 type="number"
//                 value={height}
//                 onChange={(e) => setHeight(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter height in cm"
//               />
//             </div>
//             <Button
//               onClick={calculateBMI}
//               className="bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Calculate BMI
//             </Button>
//           </div>
//         </TabsContent>
//         <TabsContent value="imperial">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="weight-imperial" className="text-gray-700">
//                 Weight (lbs)
//               </Label>
//               <Input
//                 id="weight-imperial"
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter weight in lbs"
//               />
//             </div>
//             <div>
//               <Label htmlFor="height-imperial" className="text-gray-700">
//                 Height (in)
//               </Label>
//               <Input
//                 id="height-imperial"
//                 type="number"
//                 value={height}
//                 onChange={(e) => setHeight(e.target.value)}
//                 className="mt-1"
//                 placeholder="Enter height in inches"
//               />
//             </div>
//             <Button
//               onClick={calculateBMI}
//               className="bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Calculate BMI
//             </Button>
//           </div>
//         </TabsContent>
//         <TabsContent value="categories">
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               BMI Categories
//             </h2>
//             <ul className="list-disc pl-5 text-gray-700">
//               <li>
//                 <strong>&lt; 18.5:</strong> Underweight
//               </li>
//               <li>
//                 <strong>18.5 - 24.9:</strong> Normal weight
//               </li>
//               <li>
//                 <strong>25 - 29.9:</strong> Overweight
//               </li>
//               <li>
//                 <strong>30+:</strong> Obese
//               </li>
//             </ul>
//             <p className="text-gray-600">
//               BMI is a general guideline and does not account for muscle mass,
//               bone density, or overall health.
//             </p>
//           </div>
//         </TabsContent>
//       </Tabs>
//       {result.error && <p className="text-red-600 mt-4">{result.error}</p>}
//       {result.bmi !== null && !result.error && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           <p className="text-lg font-medium text-gray-800">
//             Your BMI: {result.bmi}
//           </p>
//           <p className="text-gray-700">Category: {result.category}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// This is a BMI calculator component that allows users to calculate their Body Mass Index (BMI) using either US or Metric units. It provides a user-friendly interface with tabs for unit selection, input fields for height and weight, and displays the calculated BMI along with its category and description.
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateBMIUS,
  calculateBMIMetric,
  BMIResult,
} from "../lib/bmi-utils";

// CSS variables for glow effects
const glowStyles = `
  :root {
    --blue-400-glow: rgba(96, 165, 250, 0.6);
    --green-400-glow: rgba(74, 222, 128, 0.6);
    --yellow-400-glow: rgba(250, 204, 21, 0.6);
    --red-400-glow: rgba(248, 113, 113, 0.6);
  }
`;

export default function BMICalculator() {
  // US Units State
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");

  // Metric Units State
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // BMI Result State
  const [bmiResult, setBMIResult] = useState<BMIResult | null>(null);
  const [showTips, setShowTips] = useState(false);

  // Inject CSS variables for glow effects
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement("style");
    styleElement.innerHTML = glowStyles;
    document.head.appendChild(styleElement);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Handle tab switch
  const handleTabChange = () => {
    setBMIResult(null); // Reset BMI result
    setShowTips(false); // Hide tips
    // Clear all input fields
    setHeightFt("");
    setHeightIn("");
    setWeightLbs("");
    setHeightCm("");
    setWeightKg("");
  };

  // Calculate BMI for US Units
  const calculateUSBMI = () => {
    const ft = parseFloat(heightFt);
    const inches = parseFloat(heightIn);
    const lbs = parseFloat(weightLbs);

    if (!isNaN(ft) && !isNaN(inches) && !isNaN(lbs)) {
      const result = calculateBMIUS(ft, inches, lbs);
      setBMIResult(result);
    }
  };

  // Calculate BMI for Metric Units
  const calculateMetricBMI = () => {
    const cm = parseFloat(heightCm);
    const kg = parseFloat(weightKg);

    if (!isNaN(cm) && !isNaN(kg)) {
      const result = calculateBMIMetric(cm, kg);
      setBMIResult(result);
    }
  };

  // Handle input changes and calculations
  const handleUSInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    const ft =
      setter === setHeightFt ? parseFloat(value) : parseFloat(heightFt);
    const inches =
      setter === setHeightIn ? parseFloat(value) : parseFloat(heightIn);
    const lbs =
      setter === setWeightLbs ? parseFloat(value) : parseFloat(weightLbs);

    if (!isNaN(ft) && !isNaN(inches) && !isNaN(lbs)) {
      const result = calculateBMIUS(ft, inches, lbs);
      setBMIResult(result);
    }
  };

  const handleMetricInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    const cm =
      setter === setHeightCm ? parseFloat(value) : parseFloat(heightCm);
    const kg =
      setter === setWeightKg ? parseFloat(value) : parseFloat(weightKg);

    if (!isNaN(cm) && !isNaN(kg)) {
      const result = calculateBMIMetric(cm, kg);
      setBMIResult(result);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-6xl border-none shadow-2xl">
        <CardHeader className="px-4 sm:px-6 pt-6">
          <CardTitle className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-white">
            BMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-3">
              <Tabs
                defaultValue="us"
                className="w-full"
                onValueChange={handleTabChange}
              >
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-transparent">
                  <TabsTrigger
                    value="us"
                    className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border border-white/30 text-sm sm:text-base"
                  >
                    US Units
                  </TabsTrigger>
                  <TabsTrigger
                    value="metric"
                    className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white border border-white/30 text-sm sm:text-base"
                  >
                    Metric Units
                  </TabsTrigger>
                </TabsList>

                {/* US Units Tab */}
                <TabsContent value="us">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="w-1/2">
                        <label className="block text-sm sm:text-base font-medium text-white mb-1">
                          Height (ft)
                        </label>
                        <Input
                          type="number"
                          placeholder="Feet"
                          value={heightFt}
                          onChange={(e) =>
                            handleUSInputChange(setHeightFt, e.target.value)
                          }
                          className="w-full bg-transparent border-white/30 text-white text-base sm:text-lg placeholder:text-white/50"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm sm:text-base font-medium text-white mb-1">
                          Height (in)
                        </label>
                        <Input
                          type="number"
                          placeholder="Inches"
                          value={heightIn}
                          onChange={(e) =>
                            handleUSInputChange(setHeightIn, e.target.value)
                          }
                          className="w-full bg-transparent border-white/30 text-white text-base sm:text-lg placeholder:text-white/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-1">
                        Weight (lbs)
                      </label>
                      <Input
                        type="number"
                        placeholder="Pounds"
                        value={weightLbs}
                        onChange={(e) =>
                          handleUSInputChange(setWeightLbs, e.target.value)
                        }
                        className="w-full bg-transparent border-white/30 text-white text-base sm:text-lg placeholder:text-white/50"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Metric Units Tab */}
                <TabsContent value="metric">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-1">
                        Height (cm)
                      </label>
                      <Input
                        type="number"
                        placeholder="Centimeters"
                        value={heightCm}
                        onChange={(e) =>
                          handleMetricInputChange(setHeightCm, e.target.value)
                        }
                        className="w-full bg-transparent border-white/30 text-white text-base sm:text-lg placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-1">
                        Weight (kg)
                      </label>
                      <Input
                        type="number"
                        placeholder="Kilograms"
                        value={weightKg}
                        onChange={(e) =>
                          handleMetricInputChange(setWeightKg, e.target.value)
                        }
                        className="w-full bg-transparent border-white/30 text-white text-base sm:text-lg placeholder:text-white/50"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* BMI Result Section */}
              <AnimatePresence>
                {bmiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="bg-transparent border border-white/30 rounded-lg p-3 sm:p-4 text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Your BMI: {bmiResult.value}
                      </h3>
                      <p
                        className={`text-lg sm:text-xl font-semibold ${bmiResult.color}`}
                      >
                        {bmiResult.category}
                      </p>
                      <p className="text-white mt-2 text-base sm:text-lg">
                        {bmiResult.description}
                      </p>
                      <p className="text-white/90 mt-3 italic text-base sm:text-lg">
                        {bmiResult.funnyQuote}
                      </p>
                    </div>

                    {/* BMI Scale Visualization */}
                    {/* <div className="w-full bg-white/30 rounded-full h-3 sm:h-4 mt-4">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${bmiResult.percentage}%` }}
                        transition={{ duration: 0.5, type: "tween" }}
                        className={`h-full rounded-full ${bmiResult.color} shadow-glow`}
                        style={{
                          boxShadow: `0 0 10px 1px var(--${bmiResult.color.replace(
                            "text-",
                            ""
                          )}-glow, rgba(255,255,255,0.3))`,
                        }}
                      />
                    </div> */}

                    {/* Tips Section */}
                    <div className="mt-4">
                      <button
                        onClick={() => setShowTips(!showTips)}
                        className="text-white text-base sm:text-lg underline hover:text-white/70 transition-colors"
                      >
                        {showTips ? "Hide health tips" : "Show health tips"}
                      </button>

                      <AnimatePresence>
                        {showTips && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 bg-transparent border border-white/30 rounded-lg p-3 sm:p-4"
                          >
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                              Health Tips
                            </h4>
                            <ul className="list-disc pl-4 sm:pl-5 text-white space-y-1 text-sm sm:text-base">
                              {bmiResult.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Section (Sidebar) */}
            <div className="bg-transparent border border-white/30 rounded-lg p-3 sm:p-4 text-white order-first md:order-last mb-4 md:mb-0 h-full flex flex-col">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 border-b border-white/20 pb-2">
                BMI Information
              </h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base flex-grow">
                <p>
                  <strong>Who should not use this tool:</strong>
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                  <li>People under 18 years old</li>
                  <li>Pregnant individuals</li>
                  <li>Those with eating disorders</li>
                  <li>People with conditions affecting height</li>
                </ul>

                <p>
                  <strong>Ethnic background considerations:</strong>
                </p>
                <p className="text-white/90">
                  People from Asian, Black African, African-Caribbean or Middle
                  Eastern backgrounds may have higher health risks at lower BMI
                  values.
                </p>

                <p>
                  <strong>BMI Categories:</strong>
                </p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                  <li>
                    <span className="text-blue-400">Underweight:</span> Below
                    18.5
                  </li>
                  <li>
                    <span className="text-green-400">Normal weight:</span> 18.5
                    - 24.9
                  </li>
                  <li>
                    <span className="text-yellow-400">Overweight:</span> 25 -
                    29.9
                  </li>
                  <li>
                    <span className="text-red-400">Obese:</span> 30 and above
                  </li>
                </ul>

                <p className="italic text-white/70 text-xs sm:text-sm mt-2">
                  BMI is a general guideline and does not account for muscle
                  mass, bone density, or overall health.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
