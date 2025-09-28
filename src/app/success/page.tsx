// src/app/success/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const participantCode = searchParams.get("code") || "XXXX";

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body { 
            background: white !important; 
            color: black !important;
            font-size: 12px !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .min-h-screen {
            min-height: auto !important;
            background: white !important;
            padding: 0 !important;
          }
          
          .panel-on-grid {
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .print-section {
            display: block !important;
            background: white !important;
            color: black !important;
            border: 2px solid #000 !important;
            margin: 0 !important;
            padding: 20px !important;
            page-break-inside: avoid;
            width: 100% !important;
            max-width: none !important;
          }
          
          .print-section h2 {
            color: #dc2626 !important;
            border-bottom: 2px solid #dc2626 !important;
            padding-bottom: 10px !important;
            font-size: 18px !important;
            margin-bottom: 20px !important;
          }
          
          .print-section h3 {
            color: #dc2626 !important;
            font-size: 14px !important;
            margin-bottom: 10px !important;
          }
          
          .print-section h4 {
            color: #2563eb !important;
            font-size: 12px !important;
            margin-bottom: 8px !important;
          }
          
          .print-section .text-red-400 {
            color: #dc2626 !important;
            font-weight: bold !important;
          }
          
          .print-section .text-green-400 {
            color: #16a34a !important;
            font-weight: bold !important;
          }
          
          .print-section .text-gray-300 {
            color: #374151 !important;
          }
          
          .print-section .text-white {
            color: #000 !important;
            font-weight: 500 !important;
          }
          
          .print-section .bg-red-900\/20 {
            background: #fef2f2 !important;
            border: 1px solid #dc2626 !important;
            padding: 15px !important;
            margin: 10px 0 !important;
          }
          
          .print-section .bg-blue-900\/20 {
            background: #eff6ff !important;
            border: 1px solid #2563eb !important;
            padding: 15px !important;
            margin: 10px 0 !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          /* Hide all buttons and navigation elements in print */
          button, .cyber-button, a[href] {
            display: none !important;
          }
          
          /* Hide the button container */
          .flex.flex-col.sm\\:flex-row.gap-3.justify-center.mb-4.no-print {
            display: none !important;
          }
          
          /* Hide any elements with no-print class */
          .no-print {
            display: none !important;
          }
          
          .grid {
            display: block !important;
          }
          
          .grid > div {
            margin-bottom: 15px !important;
            display: block !important;
          }
          
          .flex {
            display: block !important;
          }
          
          .flex > * {
            margin-bottom: 5px !important;
          }
          
          /* Hide main content in print */
          .min-h-screen {
            display: none !important;
          }
          
          /* Show only print section in print */
          .print-section {
            display: block !important;
            margin: 0 !important;
            padding: 20px !important;
            width: 100% !important;
            max-width: none !important;
            background: white !important;
            color: black !important;
            border: 2px solid #000 !important;
            position: static !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
      {/* Print-friendly section - visible on screen and in print */}
      <div className="print-section bg-gray-900 p-6 rounded-lg border border-gray-700 text-left mb-6 block">
          <h2 className="text-xl font-bold text-red-500 mb-4 text-center border-b border-red-500 pb-2">BYTE BATTLE - PARTICIPANT VERIFICATION</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Event Name:</span>
                <span className="text-white font-semibold">Byte Battle Programming Contest</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Participant Code:</span>
                <span className="text-red-400 font-bold text-lg">{participantCode}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Registration Date:</span>
                <span className="text-white">{new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Status:</span>
                <span className="text-green-400 font-semibold">REGISTERED & PAID</span>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Event Date:</span>
                <span className="text-white font-semibold">TBA (To Be Announced)</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Venue:</span>
                <span className="text-white">Your College Campus</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Duration:</span>
                <span className="text-white">3 Hours</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Registration Fee:</span>
                <span className="text-green-400 font-semibold">PAID</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded">
            <h3 className="text-red-400 font-semibold mb-3 text-center">IMPORTANT INSTRUCTIONS FOR EVENT DAY</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-xs text-gray-300 space-y-2">
                <li>• <strong>Present this code</strong> at the event venue for verification</li>
                <li>• <strong>Arrive 30 minutes early</strong> for check-in process</li>
                <li>• <strong>Bring valid ID</strong> (College ID/Aadhar Card)</li>
                <li>• <strong>This code is unique</strong> to your registration</li>
                <li>• <strong>Keep this document safe</strong> until the event</li>
              </ul>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>• <strong>No entry without</strong> valid participant code</li>
                <li>• <strong>Contact organizers</strong> if you lose this code</li>
                <li>• <strong>Bring your own laptop</strong> and charger</li>
                <li>• <strong>Internet will be provided</strong> at the venue</li>
                <li>• <strong>Follow all event rules</strong> and guidelines</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-blue-900/20 border border-blue-700 rounded">
            <h4 className="text-blue-400 font-semibold mb-2 text-center">EVENT RULES & GUIDELINES</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Individual participation only - no team events</li>
              <li>• Use only the programming language you registered for</li>
              <li>• No external help or internet browsing during contest</li>
              <li>• Submit solutions within the time limit</li>
              <li>• Winners will be announced after evaluation</li>
            </ul>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-2">
              <strong>This is an official Byte Battle registration document</strong>
            </p>
            <p className="text-xs text-gray-500">
              Generated on {new Date().toLocaleString('en-IN')} | 
              For queries contact: bytebattle@yourcollege.edu
            </p>
          </div>
        </div>

      <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full panel-on-grid rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-red-900/30 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4">
          You&apos;re registered 🎉
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
          Thanks for registering for Byte Battle! Your participant code is:
        </p>

        <div className="text-3xl sm:text-4xl font-extrabold text-red-500 mb-6">
          {participantCode}
        </div>

        <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
          Keep this code safe. It will be used to verify your participation during the event.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4 no-print">
          <button
            onClick={handlePrint}
            className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg bg-red-700 hover:bg-red-600 transition text-white text-sm sm:text-base font-medium"
          >
            Print / Save PDF
          </button>

          <Link
            href="/"
            className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-red-700 text-red-200 hover:bg-red-900 transition text-sm sm:text-base font-medium"
          >
            Back to Home
          </Link>

          <Link
            href="/register"
            className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-red-700 text-red-200 hover:bg-red-900 transition text-sm sm:text-base font-medium"
          >
            Register Another
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 no-print">
          You can use this page to print or save your registration details. The participant code is unique and required for event verification.
        </p>
      </div>
    </div>
    </>
  );
}
