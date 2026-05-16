import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#ffffff',
      color: '#000'
    }}>
      <h1 style={{fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem'}}>404</h1>
      <p style={{fontSize: '1.5rem', marginBottom: '2rem', color: '#666'}}>Page not found</p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#217.2 91.2% 59.8%)',
          color: 'white',
          borderRadius: '0.5rem',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}
      >
        Go Home
      </Link>
    </div>
  )
}
