"use client"
import React, { useEffect, useState } from 'react'

const Template = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [isAIAvailable, setIsAIAvailable] = useState(true);

    useEffect(() => {
      // Check if AI API is available
      const checkAIAvailability = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasAISupport = 'ai' in window && 'languageDetector' in (window as any).ai;
        setIsAIAvailable(hasAISupport);
      };
  
      checkAIAvailability();
    }, []);
  
  return (
    <div>{!isAIAvailable ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md text-white">
          <h2 className="text-xl font-bold mb-4">AI Features Not Available</h2>
          <p className="mb-4">
            This application requires Chrome browser with AI features enabled.
            Please ensure you&apos;re using the latest version of Chrome.
          </p>
        </div>
      </div>
    ) : null}{children}</div>
  )
}

export default Template