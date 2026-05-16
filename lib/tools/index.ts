import { Tool, ToolCategory } from '@/types/tool'
import { healthToolCalculations } from '@/lib/calculations/health'
import { financeToolCalculations } from '@/lib/calculations/finance'
import { converterToolCalculations } from '@/lib/calculations/converter'
import { seoToolCalculations } from '@/lib/calculations/seo'
import { developerToolCalculations } from '@/lib/calculations/developer'

const createTool = (
  id: string,
  name: string,
  category: 'health' | 'finance' | 'converter' | 'seo' | 'developer',
  description: string,
  shortDescription: string,
  calculation: any,
  icon: string = '🛠️'
): Tool => ({
  id,
  name,
  slug: id,
  category,
  description,
  shortDescription,
  keywords: [name, category],
  icon,
  featured: false,
  inputs: calculation.inputs || [],
  calculate: calculation.calculate,
  relatedTools: [],
  faqs: [
    { q: 'How accurate is this calculator?', a: 'This calculator provides estimates based on standard formulas. For precise medical or financial advice, consult a professional.' },
    { q: 'Is my data stored?', a: 'No. All calculations are performed locally in your browser. Your data is not stored or sent to our servers.' },
    { q: 'Can I use this offline?', a: 'Yes, once loaded, this tool works completely offline.' },
  ],
})

export const tools: Tool[] = [
  // Health Tools
  createTool('bmi-calculator', 'BMI Calculator', 'health', 'Calculate your Body Mass Index to assess if you are at a healthy weight for your height.', 'Calculate BMI instantly', healthToolCalculations.bmi, '⚖️'),
  createTool('calorie-calculator', 'Calorie Calculator', 'health', 'Calculate daily calorie needs based on your weight, height, age, and activity level.', 'Find your daily calorie needs', healthToolCalculations.calories, '🔥'),
  createTool('bmr-calculator', 'BMR Calculator', 'health', 'Calculate your Basal Metabolic Rate - calories burned at rest.', 'Calculate BMR', healthToolCalculations.bmr, '⚡'),
  createTool('tdee-calculator', 'TDEE Calculator', 'health', 'Calculate Total Daily Energy Expenditure for weight management.', 'Find your TDEE', healthToolCalculations.tdee, '📊'),
  createTool('water-intake-calculator', 'Water Intake Calculator', 'health', 'Calculate daily water intake based on your body weight.', 'Calculate water intake', healthToolCalculations.waterIntake, '💧'),
  createTool('protein-intake-calculator', 'Protein Calculator', 'health', 'Calculate daily protein requirements for your fitness goals.', 'Calculate protein needs', healthToolCalculations.proteinIntake, '🍗'),
  createTool('macro-calculator', 'Macro Calculator', 'health', 'Calculate macronutrient distribution (carbs, protein, fat).', 'Calculate macros', healthToolCalculations.macroCalculator, '🥗'),
  createTool('ideal-weight-calculator', 'Ideal Weight Calculator', 'health', 'Determine your ideal weight range based on height and gender.', 'Find ideal weight range', healthToolCalculations.idealWeight, '👤'),
  createTool('body-fat-calculator', 'Body Fat Calculator', 'health', 'Calculate body fat percentage using body measurements.', 'Calculate body fat %', healthToolCalculations.bodyFat, '📏'),
  createTool('pregnancy-due-date', 'Pregnancy Due Date Calculator', 'health', 'Calculate expected due date based on last menstrual period.', 'Calculate due date', healthToolCalculations.pregnancyDueDate, '👶'),
  createTool('ovulation-calculator', 'Ovulation Calculator', 'health', 'Calculate ovulation and fertility window.', 'Calculate ovulation', healthToolCalculations.ovulation, '🔄'),
  createTool('sleep-calculator', 'Sleep Calculator', 'health', 'Calculate optimal bedtime based on sleep cycles.', 'Calculate bedtime', healthToolCalculations.sleepCalculator, '😴'),
  createTool('heart-rate-calculator', 'Heart Rate Calculator', 'health', 'Calculate target heart rate zones for exercise.', 'Calculate heart rate zones', healthToolCalculations.heartRate, '❤️'),
  createTool('blood-pressure-tracker', 'Blood Pressure Checker', 'health', 'Check and categorize blood pressure readings.', 'Check BP', healthToolCalculations.bloodPressure, '🩺'),
  createTool('diabetes-risk-calculator', 'Diabetes Risk Calculator', 'health', 'Assess your risk of developing diabetes.', 'Check diabetes risk', healthToolCalculations.diabetesRisk, '⚠️'),
  createTool('workout-timer', 'Workout Timer', 'health', 'Calculate total workout time including rest periods.', 'Plan your workout', healthToolCalculations.workoutTimer, '⏱️'),
  createTool('intermittent-fasting-calculator', 'Intermittent Fasting Timer', 'health', 'Calculate fasting and eating windows.', 'Plan your fast', healthToolCalculations.intermittentFasting, '🕐'),
  createTool('running-pace-calculator', 'Running Pace Calculator', 'health', 'Calculate running pace and speed.', 'Calculate pace', healthToolCalculations.runningPace, '🏃'),
  createTool('step-counter-calculator', 'Step Counter', 'health', 'Calculate distance and calories from steps.', 'Calculate steps', healthToolCalculations.stepCounter, '👟'),
  createTool('healthy-weight-range', 'Healthy Weight Range', 'health', 'Find your healthy weight range based on height.', 'Find weight range', healthToolCalculations.healthyWeightRange, '✅'),

  // Finance Tools
  createTool('emi-calculator', 'EMI Calculator', 'finance', 'Calculate monthly EMI for loans with amortization schedule.', 'Calculate EMI', financeToolCalculations.emi, '💳'),
  createTool('loan-calculator', 'Loan Calculator', 'finance', 'Calculate monthly payments and total interest for loans.', 'Calculate loan payments', financeToolCalculations.loan, '🏦'),
  createTool('mortgage-calculator', 'Mortgage Calculator', 'finance', 'Calculate mortgage payments and total interest.', 'Calculate mortgage', financeToolCalculations.mortgage, '🏠'),
  createTool('sip-calculator', 'SIP Calculator', 'finance', 'Calculate future value of systematic investment plan.', 'Calculate SIP returns', financeToolCalculations.sip, '📈'),
  createTool('compound-interest-calculator', 'Compound Interest Calculator', 'finance', 'Calculate compound interest with various frequencies.', 'Calculate compound interest', financeToolCalculations.compoundInterest, '📊'),
  createTool('tax-calculator', 'Salary Tax Calculator', 'finance', 'Calculate income tax based on salary.', 'Calculate tax', financeToolCalculations.taxCalculator, '💰'),
  createTool('freelance-rate-calculator', 'Freelance Rate Calculator', 'finance', 'Calculate annual income based on hourly rate.', 'Calculate annual income', financeToolCalculations.freelanceRate, '💼'),
  createTool('profit-margin-calculator', 'Profit Margin Calculator', 'finance', 'Calculate profit margin and markup percentage.', 'Calculate margin', financeToolCalculations.profitMargin, '📉'),
  createTool('currency-converter', 'Currency Converter', 'finance', 'Convert between different currencies.', 'Convert currency', financeToolCalculations.currencyConverter, '💵'),
  createTool('crypto-profit-calculator', 'Crypto Profit Calculator', 'finance', 'Calculate crypto trading profit and loss.', 'Calculate crypto profit', financeToolCalculations.cryptoProfit, '🪙'),

  // Converter Tools
  createTool('age-calculator', 'Age Calculator', 'converter', 'Calculate age in years, months, days, and hours.', 'Calculate exact age', converterToolCalculations.ageCalculator, '🎂'),
  createTool('date-difference-calculator', 'Date Difference Calculator', 'converter', 'Calculate difference between two dates.', 'Calculate date difference', converterToolCalculations.dateDifference, '📅'),
  createTool('cm-to-feet-converter', 'CM to Feet Converter', 'converter', 'Convert centimeters to feet and inches.', 'Convert CM to feet', converterToolCalculations.cmToFeet, '📏'),
  createTool('kg-to-pounds-converter', 'KG to Pounds Converter', 'converter', 'Convert kilograms to pounds and ounces.', 'Convert KG to lbs', converterToolCalculations.kgToPounds, '⚖️'),
  createTool('temperature-converter', 'Temperature Converter', 'converter', 'Convert between Celsius, Fahrenheit, and Kelvin.', 'Convert temperature', converterToolCalculations.temperatureConverter, '🌡️'),
  createTool('timezone-converter', 'Time Zone Converter', 'converter', 'Convert time between different time zones.', 'Convert time zones', converterToolCalculations.timeZoneConverter, '🌍'),
  createTool('image-compressor', 'Image Compressor', 'converter', 'Calculate image file size after compression.', 'Compress images', converterToolCalculations.imageCompressor, '🖼️'),
  createTool('pdf-compressor', 'PDF Compressor', 'converter', 'Calculate PDF file size after compression.', 'Compress PDF', converterToolCalculations.pdfCompressor, '📄'),
  createTool('jpg-to-png-converter', 'JPG to PNG Converter', 'converter', 'Convert JPG images to PNG format.', 'Convert JPG to PNG', converterToolCalculations.jpgToPng, '🎨'),
  createTool('png-to-jpg-converter', 'PNG to JPG Converter', 'converter', 'Convert PNG images to JPG format.', 'Convert PNG to JPG', converterToolCalculations.pngToJpg, '🎨'),

  // SEO Tools
  createTool('meta-tag-generator', 'Meta Tag Generator', 'seo', 'Generate meta tags for SEO optimization.', 'Generate meta tags', seoToolCalculations.metaTagGenerator, '🏷️'),
  createTool('slug-generator', 'Slug Generator', 'seo', 'Generate URL-friendly slugs from text.', 'Generate slug', seoToolCalculations.slugGenerator, '🔗'),
  createTool('word-counter', 'Word Counter', 'seo', 'Count words, characters, and reading time.', 'Count words', seoToolCalculations.wordCounter, '📝'),
  createTool('character-counter', 'Character Counter', 'seo', 'Count characters including spaces.', 'Count characters', seoToolCalculations.characterCounter, '🔤'),
  createTool('robots-txt-generator', 'Robots.txt Generator', 'seo', 'Generate robots.txt file for your website.', 'Generate robots.txt', seoToolCalculations.robotstxtGenerator, '🤖'),
  createTool('sitemap-generator', 'XML Sitemap Generator', 'seo', 'Generate XML sitemap for search engines.', 'Generate sitemap', seoToolCalculations.xmlSitemapGenerator, '🗺️'),
  createTool('keyword-density-checker', 'Keyword Density Checker', 'seo', 'Check keyword density in your content.', 'Check keyword density', seoToolCalculations.keywordDensity, '🔍'),
  createTool('seo-title-analyzer', 'SEO Title Analyzer', 'seo', 'Analyze and score your page title for SEO.', 'Analyze title', seoToolCalculations.seoTitleAnalyzer, '📊'),
  createTool('opengraph-generator', 'Open Graph Generator', 'seo', 'Generate Open Graph meta tags.', 'Generate OG tags', seoToolCalculations.openGraphGenerator, '📱'),
  createTool('readability-checker', 'Readability Checker', 'seo', 'Check content readability and grade level.', 'Check readability', seoToolCalculations.readabilityChecker, '📖'),

  // Developer Tools
  createTool('json-formatter', 'JSON Formatter', 'developer', 'Format and validate JSON code.', 'Format JSON', developerToolCalculations.jsonFormatter, '{}'),
  createTool('sql-formatter', 'SQL Formatter', 'developer', 'Format SQL queries for readability.', 'Format SQL', developerToolCalculations.sqlFormatter, '🔲'),
  createTool('html-minifier', 'HTML Minifier', 'developer', 'Minify HTML code to reduce file size.', 'Minify HTML', developerToolCalculations.htmlMinifier, '📄'),
  createTool('css-minifier', 'CSS Minifier', 'developer', 'Minify CSS code to reduce file size.', 'Minify CSS', developerToolCalculations.cssMinifier, '🎨'),
  createTool('js-minifier', 'JavaScript Minifier', 'developer', 'Minify JavaScript code to reduce file size.', 'Minify JS', developerToolCalculations.jsMinifier, '⚙️'),
  createTool('base64-encoder', 'Base64 Encoder', 'developer', 'Encode text to Base64 format.', 'Encode to Base64', developerToolCalculations.base64Encoder, '🔐'),
  createTool('base64-decoder', 'Base64 Decoder', 'developer', 'Decode Base64 text to plain text.', 'Decode Base64', developerToolCalculations.base64Decoder, '🔓'),
  createTool('regex-tester', 'Regex Tester', 'developer', 'Test and validate regular expressions.', 'Test regex', developerToolCalculations.regexTester, '🔍'),
  createTool('uuid-generator', 'UUID Generator', 'developer', 'Generate unique Universal Identifiers.', 'Generate UUID', developerToolCalculations.uuidGenerator, '🆔'),
  createTool('password-generator', 'Password Generator', 'developer', 'Generate secure random passwords.', 'Generate password', developerToolCalculations.passwordGenerator, '🔑'),
  createTool('qr-code-generator', 'QR Code Generator', 'developer', 'Generate QR codes from text or URLs.', 'Generate QR code', developerToolCalculations.qrCodeGenerator, '📲'),
  createTool('url-encoder', 'URL Encoder', 'developer', 'Encode text for use in URLs.', 'Encode for URL', developerToolCalculations.urlEncoder, '🔗'),
  createTool('url-decoder', 'URL Decoder', 'developer', 'Decode URL-encoded text.', 'Decode URL text', developerToolCalculations.urlDecoder, '🔓'),
  createTool('hex-color-generator', 'Hex Color Generator', 'developer', 'Convert between hex, RGB, and decimal color formats.', 'Convert colors', developerToolCalculations.hexColorGenerator, '🎨'),
]

export const categories: Array<{ id: string; name: string; slug: string; icon: string; count: number }> = [
  { id: 'health', name: 'Health', slug: 'health', icon: '❤️', count: 20 },
  { id: 'finance', name: 'Finance', slug: 'finance', icon: '💰', count: 10 },
  { id: 'converter', name: 'Converters', slug: 'converter', icon: '🔄', count: 10 },
  { id: 'seo', name: 'SEO', slug: 'seo', icon: '🔍', count: 10 },
  { id: 'developer', name: 'Developer', slug: 'developer', icon: '👨‍💻', count: 14 },
]

export function getTool(id: string): Tool | undefined {
  return tools.find(t => t.id === id)
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category)
}

export function getCategory(slug: string) {
  return categories.find(c => c.slug === slug)
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.keywords.some(k => k.toLowerCase().includes(q))
  )
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured).slice(0, 6)
}
