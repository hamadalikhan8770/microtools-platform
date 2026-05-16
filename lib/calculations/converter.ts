import { ToolResult, ToolInput } from '@/types/tool'

export const converterToolCalculations = {
  ageCalculator: {
    inputs: [
      { name: 'birthDate', type: 'text', label: 'Birth Date', placeholder: 'YYYY-MM-DD', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const birthDate = new Date(inputs.birthDate)
      const today = new Date()

      let years = today.getFullYear() - birthDate.getFullYear()
      let months = today.getMonth() - birthDate.getMonth()
      let days = today.getDate() - birthDate.getDate()

      if (days < 0) {
        months--
        days += 30
      }
      if (months < 0) {
        years--
        months += 12
      }

      const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60))

      return {
        outputs: [
          { label: 'Age', value: `${years} years, ${months} months, ${days} days` },
          { label: 'Total Days', value: totalDays.toString() },
          { label: 'Total Hours', value: totalHours.toString() },
        ],
        tips: [
          'Birthdate format: YYYY-MM-DD',
          'Age calculations are accurate to the day',
        ],
      }
    },
  },

  dateDifference: {
    inputs: [
      { name: 'startDate', type: 'text', label: 'Start Date', placeholder: 'YYYY-MM-DD', required: true },
      { name: 'endDate', type: 'text', label: 'End Date', placeholder: 'YYYY-MM-DD', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const start = new Date(inputs.startDate)
      const end = new Date(inputs.endDate)

      const diffTime = Math.abs(end.getTime() - start.getTime())
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const months = Math.floor(days / 30.44)
      const years = Math.floor(days / 365.25)
      const hours = Math.floor(diffTime / (1000 * 60 * 60))

      return {
        outputs: [
          { label: 'Days', value: days.toString() },
          { label: 'Weeks', value: weeks.toString() },
          { label: 'Months', value: months.toString() },
          { label: 'Years', value: years.toString() },
          { label: 'Hours', value: hours.toString() },
        ],
      }
    },
  },

  cmToFeet: {
    inputs: [
      { name: 'cm', type: 'number', label: 'Centimeters', unit: 'cm', placeholder: 'e.g., 175', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const cm = parseFloat(inputs.cm)
      const inches = cm / 2.54
      const feet = Math.floor(inches / 12)
      const remainingInches = inches % 12

      return {
        outputs: [
          { label: 'Feet', value: feet.toString() },
          { label: 'Inches', value: remainingInches.toFixed(2) },
          { label: 'Total Inches', value: inches.toFixed(2) },
          { label: "Height (5'11\")", value: `${feet}'${remainingInches.toFixed(0)}"` },
        ],
      }
    },
  },

  kgToPounds: {
    inputs: [
      { name: 'kg', type: 'number', label: 'Kilograms', unit: 'kg', placeholder: 'e.g., 70', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const kg = parseFloat(inputs.kg)
      const pounds = kg * 2.20462
      const stones = kg * 0.157473

      return {
        outputs: [
          { label: 'Pounds', value: pounds.toFixed(2), unit: 'lbs' },
          { label: 'Stones', value: stones.toFixed(2), unit: 'st' },
          { label: 'Ounces', value: (pounds * 16).toFixed(2), unit: 'oz' },
        ],
      }
    },
  },

  temperatureConverter: {
    inputs: [
      { name: 'value', type: 'number', label: 'Temperature', placeholder: 'e.g., 25', required: true },
      { name: 'unit', type: 'select', label: 'From', options: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const value = parseFloat(inputs.value)
      let celsius = 0

      if (inputs.unit === 'celsius') {
        celsius = value
      } else if (inputs.unit === 'fahrenheit') {
        celsius = (value - 32) * 5 / 9
      } else if (inputs.unit === 'kelvin') {
        celsius = value - 273.15
      }

      const fahrenheit = (celsius * 9 / 5) + 32
      const kelvin = celsius + 273.15

      return {
        outputs: [
          { label: 'Celsius', value: celsius.toFixed(2), unit: '°C' },
          { label: 'Fahrenheit', value: fahrenheit.toFixed(2), unit: '°F' },
          { label: 'Kelvin', value: kelvin.toFixed(2), unit: 'K' },
        ],
      }
    },
  },

  timeZoneConverter: {
    inputs: [
      { name: 'time', type: 'text', label: 'Time', placeholder: 'HH:MM', required: true },
      { name: 'fromZone', type: 'select', label: 'From Zone', options: [
        { value: 'GMT', label: 'GMT' },
        { value: 'EST', label: 'EST (UTC-5)' },
        { value: 'CST', label: 'CST (UTC-6)' },
        { value: 'IST', label: 'IST (UTC+5:30)' },
        { value: 'JST', label: 'JST (UTC+9)' },
      ], required: true },
      { name: 'toZone', type: 'select', label: 'To Zone', options: [
        { value: 'GMT', label: 'GMT' },
        { value: 'EST', label: 'EST (UTC-5)' },
        { value: 'CST', label: 'CST (UTC-6)' },
        { value: 'IST', label: 'IST (UTC+5:30)' },
        { value: 'JST', label: 'JST (UTC+9)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const [hours, minutes] = inputs.time.split(':').map(Number)
      const zones: Record<string, number> = {
        GMT: 0,
        EST: -5,
        CST: -6,
        IST: 5.5,
        JST: 9,
      }

      const offset = zones[inputs.toZone] - zones[inputs.fromZone]
      let newHours = (hours + offset + 24) % 24
      const newMinutes = minutes

      return {
        outputs: [
          { label: 'Original Time', value: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}` },
          { label: 'Converted Time', value: `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}` },
          { label: 'Time Difference', value: `${offset > 0 ? '+' : ''}${offset} hours` },
        ],
      }
    },
  },

  imageCompressor: {
    inputs: [
      { name: 'originalSize', type: 'number', label: 'Original Size', unit: 'KB', placeholder: 'e.g., 2048', required: true },
      { name: 'compression', type: 'select', label: 'Compression Level', options: [
        { value: '0.3', label: 'High (30% size)' },
        { value: '0.5', label: 'Medium (50% size)' },
        { value: '0.7', label: 'Low (70% size)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const originalSize = parseFloat(inputs.originalSize)
      const ratio = parseFloat(inputs.compression)
      const compressedSize = originalSize * ratio
      const saved = originalSize - compressedSize

      return {
        outputs: [
          { label: 'Original Size', value: originalSize.toFixed(2), unit: 'KB' },
          { label: 'Compressed Size', value: compressedSize.toFixed(2), unit: 'KB' },
          { label: 'Space Saved', value: saved.toFixed(2), unit: 'KB' },
          { label: 'Reduction %', value: ((saved / originalSize) * 100).toFixed(1), unit: '%' },
        ],
        tips: [
          'Higher compression may affect quality',
          'Test quality before final compression',
          'Use online tools for actual compression',
        ],
      }
    },
  },

  pdfCompressor: {
    inputs: [
      { name: 'originalSize', type: 'number', label: 'Original Size', unit: 'MB', placeholder: 'e.g., 5', required: true },
      { name: 'quality', type: 'select', label: 'Quality Level', options: [
        { value: '0.4', label: 'High Compression (40% size)' },
        { value: '0.6', label: 'Medium Compression (60% size)' },
        { value: '0.8', label: 'Low Compression (80% size)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const originalSize = parseFloat(inputs.originalSize)
      const ratio = parseFloat(inputs.quality)
      const compressedSize = originalSize * ratio
      const saved = originalSize - compressedSize

      return {
        outputs: [
          { label: 'Original Size', value: originalSize.toFixed(2), unit: 'MB' },
          { label: 'Compressed Size', value: compressedSize.toFixed(2), unit: 'MB' },
          { label: 'Space Saved', value: saved.toFixed(2), unit: 'MB' },
          { label: 'Reduction %', value: ((saved / originalSize) * 100).toFixed(1), unit: '%' },
        ],
      }
    },
  },

  jpgToPng: {
    inputs: [
      { name: 'filename', type: 'text', label: 'Filename', placeholder: 'e.g., image.jpg', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const filename = inputs.filename
      const newFilename = filename.replace(/\.(jpg|jpeg)$/i, '.png')

      return {
        outputs: [
          { label: 'Original', value: filename },
          { label: 'Converted to', value: newFilename },
          { label: 'Format', value: 'PNG (Lossless)' },
        ],
        tips: [
          'PNG supports transparency',
          'PNG files are generally larger than JPG',
          'Use online converters for actual conversion',
        ],
      }
    },
  },

  pngToJpg: {
    inputs: [
      { name: 'filename', type: 'text', label: 'Filename', placeholder: 'e.g., image.png', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const filename = inputs.filename
      const newFilename = filename.replace(/\.png$/i, '.jpg')

      return {
        outputs: [
          { label: 'Original', value: filename },
          { label: 'Converted to', value: newFilename },
          { label: 'Format', value: 'JPG (Lossy)' },
        ],
        tips: [
          'JPG is smaller but loses quality',
          'JPG does not support transparency',
          'Use online converters for actual conversion',
        ],
      }
    },
  },
}
