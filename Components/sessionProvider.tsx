// components/SessionProvider.tsx
'use client'; // Mark as a Client Component
import { useSessionHandler } from '../hooks/sessionHandler';
import SessionWarningModal from './sessionWarningModal';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const { showWarning, setShowWarning } = useSessionHandler(); // Use the hook

  return (
    <>
      {children}
      <SessionWarningModal
        showWarning={showWarning}
        setShowWarning={setShowWarning}
      />
    </>
  );
}