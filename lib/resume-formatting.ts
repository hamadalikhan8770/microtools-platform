/**
 * Resume auto-formatting utilities
 * Handles phone numbers, dates, names, and capitalization
 */

/**
 * Format phone number to (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Format date to "Month Year" format
 * Handles formats like: 01-2020, 01/2020, 2020-01, 2020/01
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return dateStr

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Try to parse various formats
  const parts = dateStr.split(/[-\/]/).map(p => p.trim())

  if (parts.length === 2) {
    let month = ''
    let year = ''

    // Determine which part is month and which is year
    if (parseInt(parts[0]) > 12) {
      // First part is year (YYYY-MM or YYYY/MM)
      year = parts[0]
      month = parts[1]
    } else {
      // First part is month (MM-YYYY or MM/YYYY)
      month = parts[0]
      year = parts[1]
    }

    const monthNum = parseInt(month)
    const yearNum = parseInt(year)

    if (monthNum >= 1 && monthNum <= 12 && yearNum > 1900) {
      return `${months[monthNum - 1]} ${yearNum}`
    }
  }

  return dateStr
}

/**
 * Capitalize first letter of each word (title case)
 */
export function toTitleCase(str: string): string {
  if (!str) return str

  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Handle hyphenated words
      if (word.includes('-')) {
        return word.split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('-')
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/**
 * Capitalize first letter only
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Auto-format name: title case
 */
export function formatName(name: string): string {
  if (!name) return name
  return toTitleCase(name.trim())
}

/**
 * Auto-format email: lowercase and trim
 */
export function formatEmail(email: string): string {
  if (!email) return email
  return email.toLowerCase().trim()
}

/**
 * Auto-format all resume data
 */
export function formatResumeData(data: {
  fullName?: string
  email?: string
  phone?: string
  summary?: string
  experience?: string
  education?: string
  skills?: string
}) {
  return {
    fullName: data.fullName ? formatName(data.fullName) : '',
    email: data.email ? formatEmail(data.email) : '',
    phone: data.phone ? formatPhoneNumber(data.phone) : '',
    summary: data.summary ? data.summary.trim() : '',
    experience: data.experience ? data.experience.trim() : '',
    education: data.education ? data.education.trim() : '',
    skills: data.skills ? data.skills.trim() : '',
  }
}

/**
 * Validate resume data
 */
export function validateResumeData(data: {
  fullName?: string
  email?: string
  phone?: string
  summary?: string
  experience?: string
  education?: string
  skills?: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.fullName?.trim()) {
    errors.push('Full name is required')
  }

  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid')
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  }

  if (!data.summary?.trim()) {
    errors.push('Professional summary is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}
