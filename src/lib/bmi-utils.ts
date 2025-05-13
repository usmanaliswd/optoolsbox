export interface BMIResult {
    value: number;
    category: string;
    description: string;
    tips: string[];
    funnyQuote: string;
    color: string;
    percentage: number;
  }
  
  export function getBMIAdvice(category: string): { tips: string[], funnyQuote: string } {
    // Get a random quote from the array for the specific category
    const getRandomQuote = (quotes: string[]): string => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    switch(category) {
      case 'Underweight':
        const underweightQuotes = [
          "You're so light, you might float away! Time to anchor down with some delicious calories! 🎈",
          "If you were a superhero, you'd be 'The Incredible Feather'! Let's add some power to your frame! 🦸",
          "You're like a walking chopstick! Time to become a whole utensil set! 🥢",
          "Are you made of helium? Because you're defying gravity! Let's add some weight to your world! 🌍",
          "You could hide behind a lamp post! Let's make you visible from all angles! 💡"
        ];
        
        return {
          tips: [
            "Eat more protein-rich foods like lean meats, fish, and legumes",
            "Add healthy calories with nuts, avocados, and olive oil",
            "Consider strength training to build muscle mass",
            "Eat more frequent, nutrient-dense meals throughout the day",
            "Try weight gainer smoothies with fruits, protein powder, and nut butters",
            "Don't skip meals and set reminders if you tend to forget eating",
            "Include healthy fats in your diet like coconut oil and full-fat dairy"
          ],
          funnyQuote: getRandomQuote(underweightQuotes)
        };
        
      case 'Normal Weight':
        const normalWeightQuotes = [
          "Boom! You're rocking that healthy body like a boss! 💪",
          "You've found the sweet spot! You're the Goldilocks of BMI - just right! 🏆",
          "Your body is in such perfect balance, even Thanos would be impressed! ⚖️",
          "You're the BMI poster child! Can we put your picture in the dictionary? 📸",
          "Your body is so well-maintained, even luxury cars are jealous! 🚗"
        ];
        
        return {
          tips: [
            "Maintain your balanced diet and regular exercise routine",
            "Stay hydrated and continue your healthy lifestyle habits",
            "Mix up your workout routine to keep things interesting and challenging",
            "Continue eating a variety of nutrient-rich foods from all food groups",
            "Get regular health check-ups to maintain your excellent status",
            "Focus on quality sleep to support your overall health",
            "Consider strength training to improve muscle tone and bone density"
          ],
          funnyQuote: getRandomQuote(normalWeightQuotes)
        };
        
      case 'Overweight':
        const overweightQuotes = [
          "Who said weight loss can't be fun? You're on a journey of transformation! 🚀",
          "You're not overweight, you're just pre-fit! Your fitness journey is loading... ⏳",
          "You've got more to love, but maybe it's time to share some of that love with the universe! ❤️",
          "Your body is like a masterpiece with a little extra canvas! Time to trim the frame! 🖼️",
          "You're not fat, you're just too easy to see! Let's work on your ninja stealth mode! 🥷"
        ];
        
        return {
          tips: [
            "Incorporate more fruits and vegetables into your daily meals",
            "Try low-impact exercises like walking, swimming, or cycling",
            "Practice portion control and mindful eating at every meal",
            "Stay hydrated and reduce sugary drinks and alcohol consumption",
            "Consider consulting a nutritionist for personalized dietary advice",
            "Track your food intake with a journal or app to increase awareness",
            "Find a workout buddy to keep you motivated and accountable",
            "Focus on getting 7-9 hours of quality sleep each night"
          ],
          funnyQuote: getRandomQuote(overweightQuotes)
        };
        
      case 'Obese':
        const obeseQuotes = [
          "Every health journey starts with a single step. You've got this, superhero! 🦸",
          "You're not carrying extra weight, you're just collecting energy for your epic transformation! 🔄",
          "Your body is like a bank with too many savings - time to make some healthy withdrawals! 💰",
          "You've been living life in extra-large mode! Let's find your right-size settings! ⚙️",
          "You're not obese, you're just extremely well-prepared for a famine! Let's adjust for modern times! 🕰️"
        ];
        
        return {
          tips: [
            "Consult with a healthcare professional before starting any weight loss program",
            "Start with small, consistent lifestyle changes rather than drastic diets",
            "Focus on balanced nutrition with plenty of vegetables, lean proteins, and whole grains",
            "Begin with gentle exercise like short walks and gradually increase intensity",
            "Consider working with a registered dietitian or nutritionist for a personalized plan",
            "Set realistic, achievable health goals and celebrate small victories",
            "Join a support group to connect with others on similar journeys",
            "Address emotional eating patterns and find healthy stress management techniques",
            "Monitor your progress with regular check-ins, not just scale measurements"
          ],
          funnyQuote: getRandomQuote(obeseQuotes)
        };
        
      default:
        return {
          tips: [],
          funnyQuote: "Unique body, unique journey! 🌈"
        };
    }
  }
  
  export function calculateBMIMetric(heightCm: number, weightKg: number): BMIResult {
    const heightM = heightCm / 100;
    const bmiValue = weightKg / (heightM * heightM);
    
    let category = '';
    let description = '';
    let color = '';
    let percentage = 0;
  
    if (bmiValue < 18.5) {
      category = 'Underweight';
      description = 'Your BMI suggests you may be underweight. This could potentially indicate nutritional deficiencies or other health issues. Consider consulting with a healthcare provider about healthy ways to gain weight.';
      color = 'text-blue-400';
      percentage = (bmiValue / 18.5) * 25;
    } else if (bmiValue < 25) {
      category = 'Normal Weight';
      description = 'Congratulations! Your BMI falls within the healthy weight range. This suggests a lower risk for weight-related health problems. Keep maintaining your balanced lifestyle.';
      color = 'text-green-400';
      percentage = 25 + ((bmiValue - 18.5) / (25 - 18.5)) * 25;
    } else if (bmiValue < 30) {
      category = 'Overweight';
      description = 'Your BMI indicates you may be overweight. This could increase your risk for certain health conditions. Small lifestyle changes in diet and physical activity can make a significant difference.';
      color = 'text-yellow-400';
      percentage = 50 + ((bmiValue - 25) / (30 - 25)) * 25;
    } else {
      category = 'Obese';
      description = 'Your BMI suggests obesity, which is associated with higher risks for various health conditions including heart disease and diabetes. It\'s recommended to consult with healthcare professionals for personalized guidance.';
      color = 'text-red-400';
      percentage = 75 + Math.min(((bmiValue - 30) / 10) * 25, 25);
    }
  
    const { tips, funnyQuote } = getBMIAdvice(category);
  
    return {
      value: parseFloat(bmiValue.toFixed(1)),
      category,
      description,
      tips,
      funnyQuote,
      color,
      percentage: Math.min(percentage, 100)
    };
  }
  
  export function calculateBMIUS(heightFt: number, heightIn: number, weightLbs: number): BMIResult {
    // Convert to metric first
    const heightCm = (heightFt * 12 + heightIn) * 2.54;
    const weightKg = weightLbs * 0.453592;
    
    return calculateBMIMetric(heightCm, weightKg);
  }
  
  export function validateUSInput(heightFt: string, heightIn: string, weightLbs: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Height feet validation
    const ft = parseFloat(heightFt);
    if (isNaN(ft) || ft < 2 || ft > 8) {
      errors.push("Height in feet must be between 2 and 8.");
    }
  
    // Height inches validation
    const inches = parseFloat(heightIn);
    if (isNaN(inches) || inches < 0 || inches >= 12) {
      errors.push("Height inches must be between 0 and 11.");
    }
  
    // Weight validation
    const lbs = parseFloat(weightLbs);
    if (isNaN(lbs) || lbs < 50 || lbs > 1000) {
      errors.push("Weight must be between 50 and 1000 pounds.");
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  export function validateMetricInput(heightCm: string, weightKg: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Height cm validation
    const cm = parseFloat(heightCm);
    if (isNaN(cm) || cm < 100 || cm > 250) {
      errors.push("Height must be between 100 and 250 cm.");
    }
  
    // Weight validation
    const kg = parseFloat(weightKg);
    if (isNaN(kg) || kg < 20 || kg > 500) {
      errors.push("Weight must be between 20 and 500 kg.");
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  }