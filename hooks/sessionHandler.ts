// hooks/sessionHandler.ts
"use client"; // Mark as a Client Component
import { useEffect, useState } from "react";

export function useSessionHandler() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Control popup visibility

  useEffect(() => {
    // Clear sessionStorage when redirected to the login page
    const handleSessionExpiry = () => {
      if (window.location.pathname === "/login") {
        sessionStorage.clear();
        setSessionExpired(true);
      }
    };

    handleSessionExpiry();

    // Set a warning timer (1 minute before session expires)
    const warningTimer = setTimeout(() => {
      setShowWarning(true); // Show the popup
    }, 240000); // 4 minutes (300,000 ms - 60,000 ms)

    // Set a timer to clear sessionStorage after 5 minutes (300,000 ms)
    const sessionTimer = setTimeout(() => {
      sessionStorage.clear();
      setSessionExpired(true);
      window.location.href = "/login"; // Redirect to login page
    }, 300000);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(warningTimer);
      clearTimeout(sessionTimer);
    };
  }, []);

  return { sessionExpired, showWarning, setShowWarning };
}
