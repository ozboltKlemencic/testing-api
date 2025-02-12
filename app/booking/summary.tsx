"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Script from "next/script"

type SummaryProps = {
  prev?: () => void
  next?: () => void
  service: string
  barber: string
  date: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

const Summary: React.FC<SummaryProps> = ({ prev, service, barber, date }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleConfirm = () => {
    setIsLoginOpen(true)
  }

  useEffect(() => {
    if (typeof window.google !== "undefined" && isLoginOpen) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      })
      window.google.accounts.id.renderButton(document.getElementById("googleSignInDiv")!, {
        theme: "outline",
        size: "large",
        width: "100%",
      })
    }
  }, [isLoginOpen])

  const handleGoogleSignIn = (response: any) => {
    // Handle the signed-in user information.
    console.log("Logged in user:", response)
    // Here you would typically send the ID token to your server
    setIsLoginOpen(false)
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Povzetek</h2>
      <p>
        <strong>Storitev:</strong> {service}
      </p>
      <p>
        <strong>Brivec:</strong> {barber}
      </p>
      <p>
        <strong>Datum:</strong> {date}
      </p>
      <div className="mt-4 space-x-4">
        <Button variant="outline" onClick={prev}>
          Nazaj
        </Button>
        <Button onClick={handleConfirm}>Potrdi</Button>
      </div>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prijava</DialogTitle>
            <DialogDescription>Prosimo, prijavite se za potrditev rezervacije.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Geslo
              </Label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
          </div>
          <Button className="w-full" onClick={() => setIsLoginOpen(false)}>
            Prijava
          </Button>
          <Separator className="my-4" />
          <div id="googleSignInDiv" className="w-full"></div>
        </DialogContent>
      </Dialog>

      <Script src="https://accounts.google.com/gsi/client" async defer />
    </div>
  )
}

export default Summary

