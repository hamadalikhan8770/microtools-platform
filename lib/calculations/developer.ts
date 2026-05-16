import { ToolResult, ToolInput } from '@/types/tool'

export const developerToolCalculations = {
  jsonFormatter: {
    inputs: [
      { name: 'json', type: 'text', label: 'JSON', placeholder: '{"key":"value"}', required: true },
      { name: 'indent', type: 'number', label: 'Indent spaces', placeholder: '2', min: 0, max: 8, required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      try {
        const parsed = JSON.parse(inputs.json)
        const formatted = JSON.stringify(parsed, null, parseInt(inputs.indent) || 2)
        return {
          outputs: [
            { label: 'Status', value: 'Valid JSON' },
          ],
          details: [
            {
              title: 'Formatted JSON',
              content: formatted,
            },
          ],
        }
      } catch (e) {
        return {
          outputs: [
            { label: 'Status', value: 'Invalid JSON' },
            { label: 'Error', value: String(e) },
          ],
        }
      }
    },
  },

  sqlFormatter: {
    inputs: [
      { name: 'sql', type: 'text', label: 'SQL', placeholder: 'SELECT * FROM users;', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const sql = inputs.sql.toUpperCase()
      const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'LEFT JOIN', 'INSERT', 'UPDATE', 'DELETE']
      let formatted = inputs.sql

      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi')
        formatted = formatted.replace(regex, `\n${kw}`)
      })

      return {
        outputs: [
          { label: 'Query Type', value: sql.includes('SELECT') ? 'SELECT' : sql.includes('INSERT') ? 'INSERT' : sql.includes('UPDATE') ? 'UPDATE' : 'Other' },
          { label: 'Character Count', value: inputs.sql.length.toString() },
        ],
        details: [
          {
            title: 'Formatted SQL',
            content: formatted,
          },
        ],
      }
    },
  },

  htmlMinifier: {
    inputs: [
      { name: 'html', type: 'text', label: 'HTML', placeholder: '<div> <p>Hello</p> </div>', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const minified = inputs.html
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim()

      const originalSize = inputs.html.length
      const minifiedSize = minified.length
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)

      return {
        outputs: [
          { label: 'Original Size', value: originalSize.toString(), unit: 'bytes' },
          { label: 'Minified Size', value: minifiedSize.toString(), unit: 'bytes' },
          { label: 'Reduction', value: reduction, unit: '%' },
        ],
        details: [
          {
            title: 'Minified HTML',
            content: minified,
          },
        ],
      }
    },
  },

  cssMinifier: {
    inputs: [
      { name: 'css', type: 'text', label: 'CSS', placeholder: 'body { margin: 0; }', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const minified = inputs.css
        .replace(/\/\*.*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim()

      const originalSize = inputs.css.length
      const minifiedSize = minified.length
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)

      return {
        outputs: [
          { label: 'Original Size', value: originalSize.toString(), unit: 'bytes' },
          { label: 'Minified Size', value: minifiedSize.toString(), unit: 'bytes' },
          { label: 'Reduction', value: reduction, unit: '%' },
        ],
        details: [
          {
            title: 'Minified CSS',
            content: minified,
          },
        ],
      }
    },
  },

  jsMinifier: {
    inputs: [
      { name: 'js', type: 'text', label: 'JavaScript', placeholder: 'const x = 10; console.log(x);', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const minified = inputs.js
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*.*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}()[\];:,=+-/*])\s*/g, '$1')
        .trim()

      const originalSize = inputs.js.length
      const minifiedSize = minified.length
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)

      return {
        outputs: [
          { label: 'Original Size', value: originalSize.toString(), unit: 'bytes' },
          { label: 'Minified Size', value: minifiedSize.toString(), unit: 'bytes' },
          { label: 'Reduction', value: reduction, unit: '%' },
        ],
        details: [
          {
            title: 'Minified JS',
            content: minified.substring(0, 500) + (minified.length > 500 ? '...' : ''),
          },
        ],
      }
    },
  },

  base64Encoder: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text', placeholder: 'e.g., Hello World', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      try {
        const encoded = typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(inputs.text))) : ''
        return {
          outputs: [
            { label: 'Encoded', value: encoded },
            { label: 'Length', value: encoded.length.toString(), unit: 'characters' },
          ],
          tips: [
            'Base64 encoding is not encryption',
            'Use for data transmission',
            'Not suitable for sensitive data',
          ],
        }
      } catch (e) {
        return {
          outputs: [
            { label: 'Error', value: 'Encoding failed' },
          ],
        }
      }
    },
  },

  base64Decoder: {
    inputs: [
      { name: 'encoded', type: 'text', label: 'Base64 Text', placeholder: 'e.g., SGVsbG8gV29ybGQ=', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      try {
        const decoded = typeof window !== 'undefined' ? decodeURIComponent(escape(atob(inputs.encoded))) : ''
        return {
          outputs: [
            { label: 'Decoded', value: decoded },
            { label: 'Length', value: decoded.length.toString(), unit: 'characters' },
          ],
        }
      } catch (e) {
        return {
          outputs: [
            { label: 'Error', value: 'Invalid Base64 string' },
          ],
        }
      }
    },
  },

  regexTester: {
    inputs: [
      { name: 'pattern', type: 'text', label: 'Regex Pattern', placeholder: 'e.g., /\\d+/', required: true },
      { name: 'text', type: 'text', label: 'Test Text', placeholder: 'Text to test', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      try {
        const regex = new RegExp(inputs.pattern)
        const matches = inputs.text.match(regex)
        const globalMatches = inputs.text.match(new RegExp(inputs.pattern, 'g'))

        return {
          outputs: [
            { label: 'Pattern', value: inputs.pattern },
            { label: 'Matches Found', value: globalMatches ? globalMatches.length.toString() : '0' },
            { label: 'First Match', value: matches ? matches[0] : 'None' },
          ],
        }
      } catch (e) {
        return {
          outputs: [
            { label: 'Error', value: 'Invalid regex pattern' },
          ],
        }
      }
    },
  },

  uuidGenerator: {
    inputs: [
      { name: 'version', type: 'select', label: 'UUID Version', options: [
        { value: 'v4', label: 'Version 4 (Random)' },
      ], required: true },
      { name: 'count', type: 'number', label: 'Generate count', placeholder: '1', min: 1, max: 10, required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const count = Math.min(parseInt(inputs.count) || 1, 10)
      const uuids = []

      for (let i = 0; i < count; i++) {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
        uuids.push(uuid)
      }

      return {
        outputs: [
          { label: 'Generated UUIDs', value: uuids.join('\n') },
        ],
        tips: [
          'UUID v4 uses random values',
          'Useful for generating unique IDs',
          'Guaranteed uniqueness across systems',
        ],
      }
    },
  },

  passwordGenerator: {
    inputs: [
      { name: 'length', type: 'number', label: 'Password Length', placeholder: '16', min: 8, max: 128, required: true },
      { name: 'uppercase', type: 'text', label: 'Include Uppercase', placeholder: 'yes/no', required: true },
      { name: 'numbers', type: 'text', label: 'Include Numbers', placeholder: 'yes/no', required: true },
      { name: 'symbols', type: 'text', label: 'Include Symbols', placeholder: 'yes/no', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      let chars = 'abcdefghijklmnopqrstuvwxyz'
      if (inputs.uppercase.toLowerCase() === 'yes') chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (inputs.numbers.toLowerCase() === 'yes') chars += '0123456789'
      if (inputs.symbols.toLowerCase() === 'yes') chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

      let password = ''
      const length = Math.min(parseInt(inputs.length) || 16, 128)

      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      return {
        outputs: [
          { label: 'Generated Password', value: password },
          { label: 'Length', value: password.length.toString(), unit: 'characters' },
        ],
        tips: [
          'Use strong passwords with mix of characters',
          'Avoid dictionary words',
          'Store passwords securely',
        ],
      }
    },
  },

  qrCodeGenerator: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text or URL', placeholder: 'e.g., https://example.com', required: true },
      { name: 'size', type: 'select', label: 'QR Code Size', options: [
        { value: '200', label: 'Small (200x200)' },
        { value: '300', label: 'Medium (300x300)' },
        { value: '400', label: 'Large (400x400)' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      return {
        outputs: [
          { label: 'Text Encoded', value: inputs.text },
          { label: 'QR Code Size', value: `${inputs.size}x${inputs.size}` },
        ],
        details: [
          {
            title: 'QR Code',
            content: `[QR Code would be generated here for: ${inputs.text}]`,
          },
        ],
        tips: [
          'QR codes can encode URLs, text, and contact info',
          'Scannable by smartphones and tablets',
          'Use for marketing and product tracking',
        ],
      }
    },
  },

  urlEncoder: {
    inputs: [
      { name: 'text', type: 'text', label: 'Text to encode', placeholder: 'e.g., hello world', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const encoded = encodeURIComponent(inputs.text)
      return {
        outputs: [
          { label: 'Encoded URL', value: encoded },
          { label: 'Original Length', value: String(inputs.text.length) },
          { label: 'Encoded Length', value: String(encoded.length) },
        ],
        tips: [
          'URL encoding converts spaces to %20',
          'Special characters are encoded as %XX',
          'Use for query parameters and URLs',
        ],
      }
    },
  },

  urlDecoder: {
    inputs: [
      { name: 'encoded', type: 'text', label: 'Encoded URL', placeholder: 'e.g., hello%20world', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      try {
        const decoded = decodeURIComponent(inputs.encoded)
        return {
          outputs: [
            { label: 'Decoded Text', value: decoded },
            { label: 'Encoded Length', value: String(inputs.encoded.length) },
            { label: 'Decoded Length', value: String(decoded.length) },
          ],
        }
      } catch (e) {
        return {
          outputs: [
            { label: 'Status', value: 'Invalid URL encoding' },
            { label: 'Error', value: String(e) },
          ],
        }
      }
    },
  },

  hexColorGenerator: {
    inputs: [
      { name: 'color', type: 'text', label: 'Hex Color', placeholder: '#FF5733', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const hex = inputs.color.replace('#', '').toUpperCase()
      if (!/^[0-9A-F]{6}$/.test(hex)) {
        return {
          outputs: [
            { label: 'Status', value: 'Invalid hex color' },
          ],
        }
      }
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      return {
        outputs: [
          { label: 'Hex', value: `#${hex}` },
          { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
          { label: 'Decimal', value: parseInt(hex, 16).toString() },
        ],
        details: [
          {
            title: 'Color Preview',
            content: `Background color would be displayed as #${hex}`,
          },
        ],
      }
    },
  },
}
