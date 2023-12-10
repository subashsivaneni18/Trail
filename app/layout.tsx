import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { usersInConversation } from '@/lib/usersInConversation';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Used To Chat',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  
  return (
    <html lang="en">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
