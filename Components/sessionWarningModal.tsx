"use client";

interface SessionWarningModalProps {
  showWarning: boolean;
  setShowWarning: (show: boolean) => void;
}

export default function SessionWarningModal({
  showWarning,
  setShowWarning,
}: SessionWarningModalProps) {
  const handleExtendSession = () => {
    // Reset the session timer (e.g., make an API call to refresh the session)
    // For now, just hide the modal
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">Session Expiry Warning</h2>
        <p className="mb-4">
          Your session is about to expire in 1 minute. Do you want to extend it?
        </p>
        <div className="flex space-x-3 justify-center">
          <button
            onClick={handleExtendSession}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Extend Session
          </button>
        </div>
      </div>
    </div>
  );
}
