"use client";

import React from "react";

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="fixed inset-0 bg-[#0B2818]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-[#16A97A]/10 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-[#0F7A52]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="success-modal-title" className="text-2xl font-bold text-[#0B2818]">
            {title}
          </h2>
          <p className="mt-3 text-[#0F7A52]">{message}</p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex justify-center rounded-xl bg-[#0F7A52] text-white px-6 py-3 font-bold hover:bg-[#0B2818] transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
