"use client";
import React, { useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';

export default function CalendlyEmbed({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRoot(document.body);
    }
  }, []);
  
  if (!root) return null;
  
  return (
    <PopupModal 
      url="https://calendly.com/pixenindia/free-consultation" 
      rootElement={root} 
      open={isOpen} 
      onModalClose={onClose} 
    />
  );
}
