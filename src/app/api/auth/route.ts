import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

// Mock user database for demonstration
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'Demo User'
  }
]

// Mock session storage
const sessions: Record<string, { userId: number, expiresAt: Date }> = {}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Find user
    const user = users.find(u => u.email === email)
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Create session
    const sessionId = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now
    
    sessions[sessionId] = {
      userId: user.id,
      expiresAt
    }
    
    // Set session cookie
    cookies().set({
      name: 'session_id',
      value: sessionId,
      httpOnly: true,
      path: '/',
      expires: expiresAt,
      secure: process.env.NODE_ENV === 'production'
    })
    
    // Return user info (excluding password)
    const { password: _, ...userInfo } = user
    
    return NextResponse.json({
      message: 'Login successful',
      user: userInfo
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Logout - clear session
  const sessionId = cookies().get('session_id')?.value
  
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId]
  }
  
  cookies().delete('session_id')
  
  return NextResponse.json({ message: 'Logout successful' })
}

// Helper function to get current user (would be used by other API routes)
export function getCurrentUser(request: NextRequest) {
  const sessionId = request.cookies.get('session_id')?.value
  
  if (!sessionId || !sessions[sessionId]) {
    return null
  }
  
  const session = sessions[sessionId]
  
  // Check if session is expired
  if (new Date() > session.expiresAt) {
    delete sessions[sessionId]
    return null
  }
  
  const user = users.find(u => u.id === session.userId)
  if (!user) return null
  
  const { password: _, ...userInfo } = user
  return userInfo
}
