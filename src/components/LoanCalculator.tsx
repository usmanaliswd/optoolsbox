import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Calculator, Clock, Coins } from "lucide-react";

export default function LoanCalculator() {
  // Default state for all three calculators
  const [activeTab, setActiveTab] = useState("amortized");

  // Amortized Loan State
  const [amortizedLoan, setAmortizedLoan] = useState({
    amount: 10000,
    years: 5,
    months: 0,
    interestRate: 5,
    compound: "monthly",
    payback: "monthly",
  });

  // Deferred Payment Loan State
  const [deferredLoan, setDeferredLoan] = useState({
    amount: 10000,
    years: 5,
    months: 0,
    interestRate: 5,
    compound: "monthly",
  });

  // Bond Calculator State
  const [bondCalc, setBondCalc] = useState({
    amount: 10000,
    years: 10,
    months: 0,
    interestRate: 4,
    compound: "semi-annually",
  });

  // Results state for each calculator
  const [amortizedResults, setAmortizedResults] = useState(null);
  const [deferredResults, setDeferredResults] = useState(null);
  const [bondResults, setBondResults] = useState(null);

  // Compound options - identical across all calculators
  const compoundOptions = [
    { value: "annually", label: "Annually (APY)" },
    { value: "semi-annually", label: "Semi-annually" },
    { value: "quarterly", label: "Quarterly" },
    { value: "monthly", label: "Monthly (APR)" },
    { value: "semi-monthly", label: "Semi-monthly" },
    { value: "biweekly", label: "Biweekly" },
    { value: "weekly", label: "Weekly" },
    { value: "daily", label: "Daily" },
    { value: "continuously", label: "Continuously" },
  ];

  // Payback options - only for amortized loans
  const paybackOptions = [
    { value: "daily", label: "Every Day" },
    { value: "weekly", label: "Every Week" },
    { value: "biweekly", label: "Every 2 Weeks" },
    { value: "semi-monthly", label: "Every Half Month" },
    { value: "monthly", label: "Every Month" },
    { value: "quarterly", label: "Every Quarter" },
    { value: "semi-annually", label: "Every 6 Months" },
    { value: "annually", label: "Every Year" },
  ];

  // Handler for input changes on the amortized loan calculator
  const handleAmortizedChange = (e) => {
    const { name, value } = e.target;
    setAmortizedLoan({
      ...amortizedLoan,
      [name]:
        name === "amount" ||
        name === "interestRate" ||
        name === "years" ||
        name === "months"
          ? parseFloat(value) || 0
          : value,
    });
  };

  // Handler for select changes on the amortized loan calculator
  const handleAmortizedSelectChange = (name, value) => {
    setAmortizedLoan({
      ...amortizedLoan,
      [name]: value,
    });
  };

  // Handler for input changes on the deferred loan calculator
  const handleDeferredChange = (e) => {
    const { name, value } = e.target;
    setDeferredLoan({
      ...deferredLoan,
      [name]:
        name === "amount" ||
        name === "interestRate" ||
        name === "years" ||
        name === "months"
          ? parseFloat(value) || 0
          : value,
    });
  };

  // Handler for select changes on the deferred loan calculator
  const handleDeferredSelectChange = (name, value) => {
    setDeferredLoan({
      ...deferredLoan,
      [name]: value,
    });
  };

  // Handler for input changes on the bond calculator
  const handleBondChange = (e) => {
    const { name, value } = e.target;
    setBondCalc({
      ...bondCalc,
      [name]:
        name === "amount" ||
        name === "interestRate" ||
        name === "years" ||
        name === "months"
          ? parseFloat(value) || 0
          : value,
    });
  };

  // Handler for select changes on the bond calculator
  const handleBondSelectChange = (name, value) => {
    setBondCalc({
      ...bondCalc,
      [name]: value,
    });
  };

  // Function to get periods per year based on compound frequency
  const getPeriodsPerYear = (frequency) => {
    switch (frequency) {
      case "annually":
        return 1;
      case "semi-annually":
        return 2;
      case "quarterly":
        return 4;
      case "monthly":
        return 12;
      case "semi-monthly":
        return 24;
      case "biweekly":
        return 26;
      case "weekly":
        return 52;
      case "daily":
        return 365;
      case "continuously":
        return Infinity;
      default:
        return 12; // Default to monthly
    }
  };

  // Calculate results for the amortized loan
  const calculateAmortizedLoan = () => {
    // Get total loan term in years
    const totalYears = amortizedLoan.years + amortizedLoan.months / 12;

    // Get compound and payment frequencies
    const compoundFrequency = getPeriodsPerYear(amortizedLoan.compound);
    const paymentFrequency = getPeriodsPerYear(amortizedLoan.payback);

    // Convert annual interest rate to periodic interest rate
    let periodicRate;

    if (amortizedLoan.compound === "continuously") {
      // For continuous compounding
      periodicRate = Math.exp(amortizedLoan.interestRate / 100) - 1;
    } else {
      // For discrete compounding
      periodicRate = amortizedLoan.interestRate / 100 / compoundFrequency;
    }

    // Effective annual rate
    const effectiveAnnualRate =
      amortizedLoan.compound === "continuously"
        ? Math.exp(amortizedLoan.interestRate / 100) - 1
        : Math.pow(1 + periodicRate, compoundFrequency) - 1;

    // Convert to payment periodic rate
    const paymentPeriodicRate =
      Math.pow(1 + effectiveAnnualRate, 1 / paymentFrequency) - 1;

    // Total number of payments
    const totalPayments = totalYears * paymentFrequency;

    // Monthly payment formula: P = (PV * r) / (1 - (1 + r)^-n)
    const payment =
      (amortizedLoan.amount * paymentPeriodicRate) /
      (1 - Math.pow(1 + paymentPeriodicRate, -totalPayments));

    // Total amount paid
    const totalPayment = payment * totalPayments;

    // Total interest paid
    const totalInterest = totalPayment - amortizedLoan.amount;

    setAmortizedResults({
      payment: payment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
      numPayments: totalPayments,
      periodicRate: paymentPeriodicRate,
    });
  };

  // Calculate results for the deferred loan
  const calculateDeferredLoan = () => {
    // Get total loan term in years
    const totalYears = deferredLoan.years + deferredLoan.months / 12;

    // Get compound frequency
    const compoundFrequency = getPeriodsPerYear(deferredLoan.compound);

    // Calculate future value
    let futureValue;

    if (deferredLoan.compound === "continuously") {
      // For continuous compounding: FV = PV * e^(rt)
      futureValue =
        deferredLoan.amount *
        Math.exp((deferredLoan.interestRate / 100) * totalYears);
    } else {
      // For discrete compounding: FV = PV * (1 + r/n)^(nt)
      const periodicRate = deferredLoan.interestRate / 100 / compoundFrequency;
      futureValue =
        deferredLoan.amount *
        Math.pow(1 + periodicRate, compoundFrequency * totalYears);
    }

    // Total interest
    const totalInterest = futureValue - deferredLoan.amount;

    setDeferredResults({
      futureValue: futureValue,
      totalInterest: totalInterest,
    });
  };

  // Calculate results for the bond
  const calculateBond = () => {
    // Get total bond term in years
    const totalYears = bondCalc.years + bondCalc.months / 12;

    // Get compound frequency
    const compoundFrequency = getPeriodsPerYear(bondCalc.compound);

    // Face value is the amount
    const faceValue = bondCalc.amount;

    // Coupon rate is the interest rate
    const couponRate = bondCalc.interestRate / 100;

    // Calculate periodic coupon payment
    const periodicPayment = (faceValue * couponRate) / compoundFrequency;

    // Total number of periods
    const totalPeriods = totalYears * compoundFrequency;

    // Calculate present value of all coupon payments
    let presentValueCoupons = 0;
    for (let i = 1; i <= totalPeriods; i++) {
      presentValueCoupons +=
        periodicPayment / Math.pow(1 + couponRate / compoundFrequency, i);
    }

    // Present value of face value at maturity
    const presentValueFaceValue =
      faceValue / Math.pow(1 + couponRate / compoundFrequency, totalPeriods);

    // Bond price
    const bondPrice = presentValueCoupons + presentValueFaceValue;

    // Total interest is the sum of all coupon payments
    const totalInterest = periodicPayment * totalPeriods;

    setBondResults({
      bondPrice: bondPrice,
      periodicPayment: periodicPayment,
      totalInterest: totalInterest,
      totalPayment: totalInterest + faceValue,
    });
  };

  // Define colors for pie chart
  const COLORS = ["#10B981", "#6366F1"];

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Loan Calculator
      </h2>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="amortized" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Amortized Loan</span>
          </TabsTrigger>
          <TabsTrigger value="deferred" className="flex items-center gap-2">
            <Clock size={16} />
            <span>Deferred Payment</span>
          </TabsTrigger>
          <TabsTrigger value="bond" className="flex items-center gap-2">
            <Coins size={16} />
            <span>Bond Calculator</span>
          </TabsTrigger>
        </TabsList>

        {/* Amortized Loan Calculator */}
        <TabsContent value="amortized" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Amortized Loan Calculator</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amortized-amount">Loan Amount ($)</Label>
                    <Input
                      id="amortized-amount"
                      name="amount"
                      type="number"
                      min="0"
                      placeholder="10000"
                      value={amortizedLoan.amount}
                      onChange={handleAmortizedChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amortized-years">Years</Label>
                      <Input
                        id="amortized-years"
                        name="years"
                        type="number"
                        min="0"
                        placeholder="5"
                        value={amortizedLoan.years}
                        onChange={handleAmortizedChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amortized-months">Months</Label>
                      <Input
                        id="amortized-months"
                        name="months"
                        type="number"
                        min="0"
                        max="11"
                        placeholder="0"
                        value={amortizedLoan.months}
                        onChange={handleAmortizedChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amortized-interest">
                      Interest Rate (%)
                    </Label>
                    <Input
                      id="amortized-interest"
                      name="interestRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="5.0"
                      value={amortizedLoan.interestRate}
                      onChange={handleAmortizedChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amortized-compound">Compound</Label>
                      <Select
                        value={amortizedLoan.compound}
                        onValueChange={(value) =>
                          handleAmortizedSelectChange("compound", value)
                        }
                      >
                        <SelectTrigger id="amortized-compound">
                          <SelectValue placeholder="Select compound frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {compoundOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amortized-payback">Payback</Label>
                      <Select
                        value={amortizedLoan.payback}
                        onValueChange={(value) =>
                          handleAmortizedSelectChange("payback", value)
                        }
                      >
                        <SelectTrigger id="amortized-payback">
                          <SelectValue placeholder="Select payback frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {paybackOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
                  onClick={calculateAmortizedLoan}
                >
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          {amortizedResults && (
            <Card className="border-emerald-200 overflow-hidden transition-all duration-300 ease-in-out">
              <CardHeader className="bg-emerald-500 text-white border-b">
                <CardTitle>Amortized Loan Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-500 text-sm font-medium">
                        Payment Amount
                      </h4>
                      <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(amortizedResults.payment)}
                        <span className="text-gray-500 text-sm font-normal ml-2">
                          per {amortizedLoan.payback.replace("ly", "")}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Total of Payments
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatCurrency(amortizedResults.totalPayment)}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Total Interest
                        </h4>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatCurrency(amortizedResults.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        View Amortization Table
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center h-64">
                    <h4 className="text-gray-500 text-sm font-medium mb-4">
                      Payment Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Principal", value: amortizedLoan.amount },
                            {
                              name: "Interest",
                              value: amortizedResults.totalInterest,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[0, 1].map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Deferred Payment Loan Calculator */}
        <TabsContent value="deferred" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Deferred Payment Loan Calculator</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deferred-amount">Loan Amount ($)</Label>
                    <Input
                      id="deferred-amount"
                      name="amount"
                      type="number"
                      min="0"
                      placeholder="10000"
                      value={deferredLoan.amount}
                      onChange={handleDeferredChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deferred-years">Years</Label>
                      <Input
                        id="deferred-years"
                        name="years"
                        type="number"
                        min="0"
                        placeholder="5"
                        value={deferredLoan.years}
                        onChange={handleDeferredChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deferred-months">Months</Label>
                      <Input
                        id="deferred-months"
                        name="months"
                        type="number"
                        min="0"
                        max="11"
                        placeholder="0"
                        value={deferredLoan.months}
                        onChange={handleDeferredChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deferred-interest">Interest Rate (%)</Label>
                    <Input
                      id="deferred-interest"
                      name="interestRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="5.0"
                      value={deferredLoan.interestRate}
                      onChange={handleDeferredChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deferred-compound">Compound</Label>
                    <Select
                      value={deferredLoan.compound}
                      onValueChange={(value) =>
                        handleDeferredSelectChange("compound", value)
                      }
                    >
                      <SelectTrigger id="deferred-compound">
                        <SelectValue placeholder="Select compound frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {compoundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
                  onClick={calculateDeferredLoan}
                >
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          {deferredResults && (
            <Card className="border-emerald-200 overflow-hidden transition-all duration-300 ease-in-out">
              <CardHeader className="bg-emerald-500 text-white border-b">
                <CardTitle>Deferred Payment Loan Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-500 text-sm font-medium">
                        Amount Due At End
                      </h4>
                      <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(deferredResults.futureValue)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Principal Amount
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatCurrency(deferredLoan.amount)}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Total Interest
                        </h4>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatCurrency(deferredResults.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        View Payment Schedule
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center h-64">
                    <h4 className="text-gray-500 text-sm font-medium mb-4">
                      Payment Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Principal", value: deferredLoan.amount },
                            {
                              name: "Interest",
                              value: deferredResults.totalInterest,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[0, 1].map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Bond Calculator */}
        <TabsContent value="bond" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Bond Calculator</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bond-amount">Bond Face Value ($)</Label>
                    <Input
                      id="bond-amount"
                      name="amount"
                      type="number"
                      min="0"
                      placeholder="10000"
                      value={bondCalc.amount}
                      onChange={handleBondChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bond-years">Years to Maturity</Label>
                      <Input
                        id="bond-years"
                        name="years"
                        type="number"
                        min="0"
                        placeholder="10"
                        value={bondCalc.years}
                        onChange={handleBondChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bond-months">Months</Label>
                      <Input
                        id="bond-months"
                        name="months"
                        type="number"
                        min="0"
                        max="11"
                        placeholder="0"
                        value={bondCalc.months}
                        onChange={handleBondChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bond-interest">Coupon Rate (%)</Label>
                    <Input
                      id="bond-interest"
                      name="interestRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="4.0"
                      value={bondCalc.interestRate}
                      onChange={handleBondChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bond-compound">
                      Coupon Payment Frequency
                    </Label>
                    <Select
                      value={bondCalc.compound}
                      onValueChange={(value) =>
                        handleBondSelectChange("compound", value)
                      }
                    >
                      <SelectTrigger id="bond-compound">
                        <SelectValue placeholder="Select payment frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {compoundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
                  onClick={calculateBond}
                >
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          {bondResults && (
            <Card className="border-emerald-200 overflow-hidden transition-all duration-300 ease-in-out">
              <CardHeader className="bg-emerald-500 text-white border-b">
                <CardTitle>Bond Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-500 text-sm font-medium">
                        Bond Price (Present Value)
                      </h4>
                      <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(bondResults.bondPrice)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Periodic Payment
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatCurrency(bondResults.periodicPayment)}
                          <span className="text-gray-500 text-sm font-normal ml-2">
                            per {bondCalc.compound.replace("ly", "")}
                          </span>
                        </p>
                      </div>

                      <div>
                        <h4 className="text-gray-500 text-sm font-medium">
                          Total Interest
                        </h4>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatCurrency(bondResults.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        View Payment Schedule
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center h-64">
                    <h4 className="text-gray-500 text-sm font-medium mb-4">
                      Payment Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Principal", value: bondCalc.amount },
                            {
                              name: "Interest",
                              value: bondResults.totalInterest,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[0, 1].map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
