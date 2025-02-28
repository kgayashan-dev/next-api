"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; // Import for detecting current route

export function useSessionHandler() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const isLoggedOutRef = useRef(false);
  const lastActivityRef = useRef(Date.now());
  const pathname = usePathname(); // Get the current route

  // Constants for timing (in milliseconds)
  const INACTIVITY_WARNING_TIME = 5000; // 5 seconds for testing (use 240000 for 4 minutes in production)
  const SESSION_EXPIRY_TIME = 6000; // 6 seconds for testing (use 300000 for 5 minutes in production)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = () => {
      return (
        sessionStorage.getItem("auth-token") !== null ||
        localStorage.getItem("auth-token") !== null ||
        pathname.includes("/dashboard")
      );
    };

    // **Skip session tracking on home (`/`) or login page**
    if (!isAuthenticated() || pathname === "/" || pathname === "/login") {
      return; // Exit early to prevent timers
    }

    let warningTimer: NodeJS.Timeout;
    let sessionTimer: NodeJS.Timeout;

    // Function to clear session and redirect to login
    const handleSessionExpiry = () => {
      if (isLoggedOutRef.current) return; // Prevent multiple redirects

      sessionStorage.clear();
      localStorage.removeItem("auth-token");
      setSessionExpired(true);
      isLoggedOutRef.current = true;
      window.location.href = "/login";
    };

    // Function to reset timers
    const resetTimers = () => {
      clearTimeout(warningTimer);
      clearTimeout(sessionTimer);

      warningTimer = setTimeout(() => {
        if (pathname !== "/") setShowWarning(true); // **Only show warning if NOT on home page**
      }, INACTIVITY_WARNING_TIME);

      sessionTimer = setTimeout(() => {
        handleSessionExpiry();
      }, SESSION_EXPIRY_TIME);
    };

    // Update last activity timestamp and reset timers
    const updateActivity = () => {
      lastActivityRef.current = Date.now();

      if (showWarning) {
        setShowWarning(false);
      }

      resetTimers();
    };

    // Add event listeners to detect user activity
    const activityEvents = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    // Initialize timers
    resetTimers();

    // Cleanup event listeners and timers on unmount
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });

      clearTimeout(warningTimer);
      clearTimeout(sessionTimer);
    };
  }, [pathname, showWarning]); // **Include pathname in dependencies**

  // Function to handle logout
  const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem("auth-token");
    isLoggedOutRef.current = true;
    setSessionExpired(true);
    window.location.href = "/login";
  };

  // Function to extend session (for the Extend Session button)
  const extendSession = () => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);

    // Optional: Make an API call to extend the server-side session
    // fetch('/api/session/extend', { method: 'POST', credentials: 'include' });
  };

  return { sessionExpired, showWarning, setShowWarning, logout, extendSession };
}
