'use client'
import {ClerkProvider} from '@clerk/nextjs'
import { ReactNode } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'
import { ThemeProvider } from './theme-provider'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
        >
            <Authenticated >
                {children}
            </Authenticated>   
            < Unauthenticated>
                <SignInButton/>
                <SignUpButton/>

                
            </Unauthenticated> 
            <AuthLoading>
                Loading...
            </AuthLoading>
            
                
        </ThemeProvider>
      
    </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}