import { ToolResult, ToolInput } from '@/types/tool'

export const healthToolCalculations = {
  bmi: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height) / 100
      const bmi = weight / (height * height)

      let category = ''
      if (bmi < 18.5) category = 'Underweight'
      else if (bmi < 25) category = 'Normal weight'
      else if (bmi < 30) category = 'Overweight'
      else category = 'Obese'

      return {
        outputs: [
          { label: 'BMI', value: bmi.toFixed(1), unit: 'kg/m²' },
          { label: 'Category', value: category },
        ],
        details: [
          {
            title: 'What is BMI?',
            content: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated as weight (kg) divided by height (m) squared.',
          },
        ],
        tips: [
          'A BMI between 18.5 and 24.9 is considered normal weight',
          'Regular exercise and balanced diet can help maintain healthy BMI',
          'Consult a healthcare provider for personalized advice',
        ],
      }
    },
  },

  calories: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
      { name: 'age', type: 'number', label: 'Age', unit: 'years', placeholder: 'e.g., 30', required: true },
      { name: 'gender', type: 'select', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], required: true },
      { name: 'activity', type: 'select', label: 'Activity Level', options: [
        { value: '1.2', label: 'Sedentary (little exercise)' },
        { value: '1.375', label: 'Lightly active (1-3 days/week)' },
        { value: '1.55', label: 'Moderately active (3-5 days/week)' },
        { value: '1.725', label: 'Very active (6-7 days/week)' },
        { value: '1.9', label: 'Extremely active (physical job)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height)
      const age = parseFloat(inputs.age)
      const gender = inputs.gender
      const activity = parseFloat(inputs.activity)

      let bmr = 0
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
      }

      const tdee = bmr * activity

      return {
        outputs: [
          { label: 'BMR', value: bmr.toFixed(0), unit: 'kcal/day', description: 'Calories burned at rest' },
          { label: 'TDEE', value: tdee.toFixed(0), unit: 'kcal/day', description: 'Total daily energy expenditure' },
          { label: 'Deficit (0.5kg/week)', value: (tdee - 500).toFixed(0), unit: 'kcal/day' },
          { label: 'Deficit (1kg/week)', value: (tdee - 1000).toFixed(0), unit: 'kcal/day' },
        ],
        tips: [
          'To lose weight, consume fewer calories than your TDEE',
          'To gain weight, consume more calories than your TDEE',
          'A 500 calorie deficit per day results in 0.5kg weight loss per week',
        ],
      }
    },
  },

  bmr: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
      { name: 'age', type: 'number', label: 'Age', unit: 'years', placeholder: 'e.g., 30', required: true },
      { name: 'gender', type: 'select', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height)
      const age = parseFloat(inputs.age)
      const gender = inputs.gender

      let bmr = 0
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
      }

      return {
        outputs: [
          { label: 'BMR', value: bmr.toFixed(0), unit: 'kcal/day' },
        ],
        details: [
          {
            title: 'What is BMR?',
            content: 'Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions at rest.',
          },
        ],
        tips: [
          'BMR decreases with age',
          'Muscle tissue increases BMR',
          'BMR accounts for about 70% of daily calorie burn',
        ],
      }
    },
  },

  tdee: {
    inputs: [
      { name: 'bmr', type: 'number', label: 'BMR', unit: 'kcal/day', placeholder: 'e.g., 1700', required: true },
      { name: 'activity', type: 'select', label: 'Activity Level', options: [
        { value: '1.2', label: 'Sedentary' },
        { value: '1.375', label: 'Lightly active' },
        { value: '1.55', label: 'Moderately active' },
        { value: '1.725', label: 'Very active' },
        { value: '1.9', label: 'Extremely active' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const bmr = parseFloat(inputs.bmr)
      const activity = parseFloat(inputs.activity)
      const tdee = bmr * activity

      return {
        outputs: [
          { label: 'TDEE', value: tdee.toFixed(0), unit: 'kcal/day' },
        ],
        tips: [
          'TDEE = BMR × Activity Factor',
          'Use TDEE to determine daily calorie goals',
        ],
      }
    },
  },

  waterIntake: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Body Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const liters = weight * 0.03
      const cups = liters * 4.227

      return {
        outputs: [
          { label: 'Daily Water Intake', value: liters.toFixed(2), unit: 'liters' },
          { label: 'Daily Water Intake', value: cups.toFixed(1), unit: 'cups' },
          { label: 'Hourly Intake', value: (liters / 8).toFixed(2), unit: 'liters' },
        ],
        tips: [
          'Drink water throughout the day',
          'Increase intake during exercise',
          'Listen to your thirst signals',
        ],
      }
    },
  },

  proteinIntake: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Body Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'goal', type: 'select', label: 'Goal', options: [
        { value: '1.2', label: 'General fitness' },
        { value: '1.6', label: 'Muscle building' },
        { value: '2.2', label: 'Athletic training' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const factor = parseFloat(inputs.goal)
      const proteinGrams = weight * factor

      return {
        outputs: [
          { label: 'Protein Needed', value: proteinGrams.toFixed(1), unit: 'grams/day' },
          { label: 'Protein per meal (3 meals)', value: (proteinGrams / 3).toFixed(1), unit: 'grams' },
        ],
        tips: [
          'Spread protein intake throughout the day',
          'Include protein from various sources',
          'Combine with resistance training for muscle growth',
        ],
      }
    },
  },

  macroCalculator: {
    inputs: [
      { name: 'tdee', type: 'number', label: 'TDEE', unit: 'kcal/day', placeholder: 'e.g., 2500', required: true },
      { name: 'dietType', type: 'select', label: 'Diet Type', options: [
        { value: 'balanced', label: 'Balanced (40/30/30)' },
        { value: 'lowCarb', label: 'Low Carb (50/25/25)' },
        { value: 'highCarb', label: 'High Carb (55/30/15)' },
        { value: 'keto', label: 'Keto (5/65/30)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const tdee = parseFloat(inputs.tdee)
      const dietType = inputs.dietType

      let carbs = 0, protein = 0, fat = 0

      if (dietType === 'balanced') {
        carbs = tdee * 0.4 / 4
        protein = tdee * 0.3 / 4
        fat = tdee * 0.3 / 9
      } else if (dietType === 'lowCarb') {
        carbs = tdee * 0.25 / 4
        protein = tdee * 0.5 / 4
        fat = tdee * 0.25 / 9
      } else if (dietType === 'highCarb') {
        carbs = tdee * 0.55 / 4
        protein = tdee * 0.3 / 4
        fat = tdee * 0.15 / 9
      } else if (dietType === 'keto') {
        carbs = tdee * 0.05 / 4
        protein = tdee * 0.3 / 4
        fat = tdee * 0.65 / 9
      }

      return {
        outputs: [
          { label: 'Carbs', value: carbs.toFixed(1), unit: 'grams' },
          { label: 'Protein', value: protein.toFixed(1), unit: 'grams' },
          { label: 'Fat', value: fat.toFixed(1), unit: 'grams' },
        ],
        tips: [
          'Choose whole foods over processed',
          'Track your macros consistently',
          'Adjust based on results and goals',
        ],
      }
    },
  },

  idealWeight: {
    inputs: [
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
      { name: 'gender', type: 'select', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const height = parseFloat(inputs.height)
      const heightInches = height / 2.54

      let idealMin = 0, idealMax = 0

      if (inputs.gender === 'male') {
        idealMin = 50 + 2.3 * (heightInches - 60)
        idealMax = 60 + 2.3 * (heightInches - 60)
      } else {
        idealMin = 45.5 + 2.3 * (heightInches - 60)
        idealMax = 55.5 + 2.3 * (heightInches - 60)
      }

      const idealMinKg = idealMin * 0.453592
      const idealMaxKg = idealMax * 0.453592

      return {
        outputs: [
          { label: 'Ideal Weight Range', value: `${idealMinKg.toFixed(1)} - ${idealMaxKg.toFixed(1)}`, unit: 'kg' },
          { label: 'Midpoint', value: ((idealMinKg + idealMaxKg) / 2).toFixed(1), unit: 'kg' },
        ],
        tips: [
          'This is an estimate based on the Devine formula',
          'Individual ideal weight varies based on muscle mass',
          'Consult a healthcare provider for personalized advice',
        ],
      }
    },
  },

  bodyFat: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
      { name: 'age', type: 'number', label: 'Age', unit: 'years', placeholder: 'e.g., 30', required: true },
      { name: 'gender', type: 'select', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }], required: true },
      { name: 'neck', type: 'number', label: 'Neck', unit: 'cm', placeholder: 'e.g., 37', required: true },
      { name: 'waist', type: 'number', label: 'Waist', unit: 'cm', placeholder: 'e.g., 80', required: true },
      { name: 'hip', type: 'number', label: 'Hip', unit: 'cm', placeholder: 'Optional for males', required: false },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height)
      const neck = parseFloat(inputs.neck)
      const waist = parseFloat(inputs.waist)
      const hip = inputs.hip ? parseFloat(inputs.hip) : 0

      let bodyFat = 0

      if (inputs.gender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
      } else {
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450
      }

      return {
        outputs: [
          { label: 'Body Fat %', value: bodyFat.toFixed(1), unit: '%' },
          { label: 'Fat Mass', value: (weight * bodyFat / 100).toFixed(1), unit: 'kg' },
          { label: 'Lean Mass', value: (weight * (100 - bodyFat) / 100).toFixed(1), unit: 'kg' },
        ],
        tips: [
          'Accurate measurements are crucial',
          'Measure at the same time each time',
          'Body fat percentage varies by age and gender',
        ],
      }
    },
  },

  sleepCalculator: {
    inputs: [
      { name: 'wakeTime', type: 'text', label: 'Wake-up time', placeholder: 'e.g., 06:30', required: true },
      { name: 'cycles', type: 'number', label: 'Sleep cycles', min: 4, max: 10, step: 0.5, placeholder: 'e.g., 6', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const [hours, minutes] = inputs.wakeTime.split(':').map(Number)
      const cycles = parseFloat(inputs.cycles)
      const sleepMinutes = cycles * 90

      const bedtimeMinutes = hours * 60 + minutes - sleepMinutes - 14
      const bedtimeHours = Math.floor(bedtimeMinutes / 60) % 24
      const bedtimeMin = bedtimeMinutes % 60

      const bedtimeFormatted = `${String(bedtimeHours).padStart(2, '0')}:${String(bedtimeMin).padStart(2, '0')}`

      return {
        outputs: [
          { label: 'Bedtime', value: bedtimeFormatted },
          { label: 'Sleep duration', value: `${Math.floor(sleepMinutes / 60)}h ${sleepMinutes % 60}m` },
        ],
        tips: [
          'Each sleep cycle is approximately 90 minutes',
          'Falling asleep takes about 14 minutes',
          'Aim for 4-6 complete sleep cycles per night',
        ],
      }
    },
  },

  heartRate: {
    inputs: [
      { name: 'age', type: 'number', label: 'Age', unit: 'years', placeholder: 'e.g., 30', required: true },
      { name: 'rhr', type: 'number', label: 'Resting Heart Rate', unit: 'bpm', placeholder: 'e.g., 60', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const age = parseFloat(inputs.age)
      const rhr = parseFloat(inputs.rhr)
      const maxHr = 220 - age

      const zones = [
        { name: 'Moderate', percent: 0.5, color: 'Green' },
        { name: 'Vigorous', percent: 0.7, color: 'Yellow' },
        { name: 'Maximum', percent: 0.85, color: 'Orange' },
        { name: 'Peak', percent: 1.0, color: 'Red' },
      ]

      return {
        outputs: [
          { label: 'Max Heart Rate', value: maxHr.toFixed(0), unit: 'bpm' },
          { label: 'Resting Heart Rate', value: rhr.toFixed(0), unit: 'bpm' },
          { label: 'Heart Rate Reserve', value: (maxHr - rhr).toFixed(0), unit: 'bpm' },
        ],
        details: zones.map(zone => ({
          title: `${zone.name} Intensity (${zone.percent * 100}%)`,
          content: `${(rhr + (maxHr - rhr) * zone.percent * 0.5).toFixed(0)} - ${(rhr + (maxHr - rhr) * zone.percent).toFixed(0)} bpm`,
        })),
        tips: [
          'Lower resting heart rate indicates better fitness',
          'Train in different heart rate zones for optimal results',
          'Consistency in measuring RHR is important',
        ],
      }
    },
  },

  bloodPressure: {
    inputs: [
      { name: 'systolic', type: 'number', label: 'Systolic', unit: 'mmHg', placeholder: 'e.g., 120', required: true },
      { name: 'diastolic', type: 'number', label: 'Diastolic', unit: 'mmHg', placeholder: 'e.g., 80', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const systolic = parseFloat(inputs.systolic)
      const diastolic = parseFloat(inputs.diastolic)

      let category = ''
      if (systolic < 120 && diastolic < 80) {
        category = 'Normal'
      } else if (systolic < 130 && diastolic < 80) {
        category = 'Elevated'
      } else if (systolic < 140 && diastolic < 90) {
        category = 'High Blood Pressure Stage 1'
      } else if (systolic >= 140 || diastolic >= 90) {
        category = 'High Blood Pressure Stage 2'
      }

      return {
        outputs: [
          { label: 'Blood Pressure', value: `${systolic}/${diastolic}`, unit: 'mmHg' },
          { label: 'Category', value: category },
        ],
        tips: [
          'Measure blood pressure in a relaxed state',
          'Regular monitoring is important',
          'Consult a doctor if readings are consistently high',
        ],
      }
    },
  },

  diabetesRisk: {
    inputs: [
      { name: 'weight', type: 'number', label: 'Weight', unit: 'kg', placeholder: 'e.g., 70', required: true },
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
      { name: 'age', type: 'number', label: 'Age', unit: 'years', placeholder: 'e.g., 30', required: true },
      { name: 'family', type: 'select', label: 'Family History', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const weight = parseFloat(inputs.weight)
      const height = parseFloat(inputs.height) / 100
      const age = parseFloat(inputs.age)
      const bmi = weight / (height * height)

      let riskScore = 0
      if (bmi > 25) riskScore += 20
      if (bmi > 30) riskScore += 20
      if (age > 45) riskScore += 15
      if (inputs.family === 'yes') riskScore += 15

      let risk = 'Low'
      if (riskScore > 50) risk = 'High'
      else if (riskScore > 25) risk = 'Moderate'

      return {
        outputs: [
          { label: 'Risk Score', value: riskScore.toFixed(0), unit: '/100' },
          { label: 'Risk Level', value: risk },
        ],
        tips: [
          'Maintain a healthy weight',
          'Exercise regularly',
          'Get regular health screenings',
          'Consult a healthcare provider for personalized advice',
        ],
      }
    },
  },

  workoutTimer: {
    inputs: [
      { name: 'exercise', type: 'text', label: 'Exercise name', placeholder: 'e.g., Pushups', required: true },
      { name: 'duration', type: 'number', label: 'Duration', unit: 'minutes', placeholder: 'e.g., 30', required: true },
      { name: 'sets', type: 'number', label: 'Number of sets', placeholder: 'e.g., 3', required: true },
      { name: 'restBetween', type: 'number', label: 'Rest between sets', unit: 'seconds', placeholder: 'e.g., 60', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const duration = parseFloat(inputs.duration)
      const sets = parseFloat(inputs.sets)
      const restBetween = parseFloat(inputs.restBetween)

      const totalRest = restBetween * (sets - 1)
      const workoutTime = duration + totalRest / 60
      const totalCalories = duration * 5

      return {
        outputs: [
          { label: 'Total Workout Time', value: workoutTime.toFixed(1), unit: 'minutes' },
          { label: 'Rest Time', value: totalRest.toFixed(0), unit: 'seconds' },
          { label: 'Estimated Calories', value: totalCalories.toFixed(0), unit: 'kcal' },
        ],
        tips: [
          'Proper rest between sets aids recovery',
          'Hydrate during your workout',
          'Warm up before starting',
        ],
      }
    },
  },

  intermittentFasting: {
    inputs: [
      { name: 'fasterType', type: 'select', label: 'Fasting Type', options: [
        { value: '16:8', label: '16:8 (16h fast, 8h eat)' },
        { value: '5:2', label: '5:2 (5 days normal, 2 days low cal)' },
        { value: 'custom', label: 'Custom' },
      ], required: true },
      { name: 'breakfastTime', type: 'text', label: 'Breakfast time', placeholder: 'e.g., 12:00', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const [hours, minutes] = inputs.breakfastTime.split(':').map(Number)
      const fasterType = inputs.fasterType

      let fastEnd = ''
      if (fasterType === '16:8') {
        const fastEndMinutes = hours * 60 + minutes + 960
        const fastEndHours = Math.floor(fastEndMinutes / 60) % 24
        const fastEndMin = fastEndMinutes % 60
        fastEnd = `${String(fastEndHours).padStart(2, '0')}:${String(fastEndMin).padStart(2, '0')}`
      }

      return {
        outputs: [
          { label: 'Fasting Type', value: fasterType },
          { label: 'Breakfast Time', value: inputs.breakfastTime },
          ...(fastEnd ? [{ label: 'Fasting Ends', value: fastEnd }] : []),
        ],
        tips: [
          'Start with shorter fasting periods',
          'Stay hydrated during fasting',
          'Break fast with light meals first',
          'Consult a doctor before starting',
        ],
      }
    },
  },

  runningPace: {
    inputs: [
      { name: 'distance', type: 'number', label: 'Distance', unit: 'km', placeholder: 'e.g., 5', required: true },
      { name: 'hours', type: 'number', label: 'Hours', placeholder: 'e.g., 0', required: true, min: 0, max: 24 },
      { name: 'minutes', type: 'number', label: 'Minutes', placeholder: 'e.g., 30', required: true, min: 0, max: 59 },
      { name: 'seconds', type: 'number', label: 'Seconds', placeholder: 'e.g., 0', required: true, min: 0, max: 59 },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const distance = parseFloat(inputs.distance)
      const totalSeconds = (parseFloat(inputs.hours) * 3600) + (parseFloat(inputs.minutes) * 60) + parseFloat(inputs.seconds)
      const pacePerKm = totalSeconds / distance

      const paceMinutes = Math.floor(pacePerKm / 60)
      const paceSeconds = Math.round(pacePerKm % 60)

      const speed = (distance / totalSeconds) * 3600

      return {
        outputs: [
          { label: 'Pace', value: `${paceMinutes}:${String(paceSeconds).padStart(2, '0')}`, unit: 'min/km' },
          { label: 'Speed', value: speed.toFixed(2), unit: 'km/h' },
          { label: 'Distance', value: distance.toFixed(2), unit: 'km' },
        ],
        tips: [
          'Pace helps track running performance',
          'Consistent training improves pace',
          'Gradually increase distance to avoid injury',
        ],
      }
    },
  },

  pregnancyDueDate: {
    inputs: [
      { name: 'lastPeriod', type: 'text', label: 'Last period date', placeholder: 'YYYY-MM-DD', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const lastPeriod = new Date(inputs.lastPeriod)
      const dueDate = new Date(lastPeriod.getTime() + 280 * 24 * 60 * 60 * 1000)
      const today = new Date()
      const weeksPregnant = Math.floor((today.getTime() - lastPeriod.getTime()) / (7 * 24 * 60 * 60 * 1000))

      return {
        outputs: [
          { label: 'Due Date', value: dueDate.toLocaleDateString() },
          { label: 'Weeks Pregnant', value: weeksPregnant.toString(), unit: 'weeks' },
          { label: 'Days until due', value: Math.ceil((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)).toString() },
        ],
        tips: [
          'Due date is an estimate, not exact',
          'Most babies are born within 2 weeks of due date',
          'Follow prenatal care appointments',
        ],
      }
    },
  },

  ovulation: {
    inputs: [
      { name: 'cycleLength', type: 'number', label: 'Cycle length', unit: 'days', placeholder: 'e.g., 28', required: true },
      { name: 'lastPeriod', type: 'text', label: 'Last period date', placeholder: 'YYYY-MM-DD', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const cycleLength = parseFloat(inputs.cycleLength)
      const lastPeriod = new Date(inputs.lastPeriod)
      const ovulationDate = new Date(lastPeriod.getTime() + (cycleLength - 14) * 24 * 60 * 60 * 1000)
      const fertilityStart = new Date(ovulationDate.getTime() - 5 * 24 * 60 * 60 * 1000)
      const fertilityEnd = new Date(ovulationDate.getTime() + 24 * 60 * 60 * 1000)

      return {
        outputs: [
          { label: 'Ovulation Date', value: ovulationDate.toLocaleDateString() },
          { label: 'Fertility Window Starts', value: fertilityStart.toLocaleDateString() },
          { label: 'Fertility Window Ends', value: fertilityEnd.toLocaleDateString() },
        ],
        tips: [
          'Ovulation typically occurs 14 days before next period',
          'Fertility window is 5 days before to 1 day after ovulation',
          'This is an estimate; actual ovulation may vary',
        ],
      }
    },
  },

  stepCounter: {
    inputs: [
      { name: 'steps', type: 'number', label: 'Number of steps', placeholder: 'e.g., 10000', required: true },
      { name: 'height', type: 'number', label: 'Your height', unit: 'cm', placeholder: 'e.g., 175', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const steps = parseFloat(inputs.steps)
      const height = parseFloat(inputs.height)

      const strideLength = height * 0.415 / 100
      const distance = steps * strideLength
      const calories = steps * 0.04

      return {
        outputs: [
          { label: 'Distance', value: distance.toFixed(2), unit: 'km' },
          { label: 'Estimated Calories', value: calories.toFixed(0), unit: 'kcal' },
          { label: 'Steps', value: steps.toFixed(0) },
        ],
        tips: [
          'Aim for 10,000 steps per day',
          'Stride length varies by height and gait',
          'Regular walking improves health',
        ],
      }
    },
  },

  healthyWeightRange: {
    inputs: [
      { name: 'height', type: 'number', label: 'Height', unit: 'cm', placeholder: 'e.g., 175', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const height = parseFloat(inputs.height) / 100

      const minWeight = 18.5 * height * height
      const maxWeight = 24.9 * height * height

      return {
        outputs: [
          { label: 'Healthy Weight Range', value: `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)}`, unit: 'kg' },
          { label: 'Underweight', value: `< ${minWeight.toFixed(1)}`, unit: 'kg' },
          { label: 'Overweight', value: `> ${maxWeight.toFixed(1)}`, unit: 'kg' },
        ],
        tips: [
          'Based on BMI 18.5-24.9',
          'Healthy weight varies by body composition',
          'Consult a healthcare provider for personalized advice',
        ],
      }
    },
  },
}
