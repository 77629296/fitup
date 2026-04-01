// src/components/ui/phone-drawer.tsx
"use client"; // Nécessaire car utilise useState, useEffect, etc.

import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useDragControls, PanInfo } from "framer-motion";

// --- DrawerHeader Component (peut rester ici ou être importé si partagé) ---
const DrawerHeader = ({
  title,
  onClose,
  dragControls,
}: {
  title: string;
  onClose: () => void;
  dragControls: ReturnType<typeof useDragControls>;
}) => (
  <motion.div
    className="sticky top-0 z-10 flex cursor-grab items-center justify-between rounded-lg border-b bg-gray-100 px-4 py-3 active:cursor-grabbing"
    onPointerDown={(event) => dragControls.start(event)}
  >
    <span className="font-medium text-gray-700">{title}</span>
    <button
      className="cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
      onClick={onClose}
      onPointerDown={(e) => e.stopPropagation()}
      type="button"
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Fermer</span>
    </button>
  </motion.div>
);
// --- End DrawerHeader ---

interface PhoneDrawerProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  children: React.ReactNode; // Accepte n'importe quel contenu React
  phoneContainerId?: string; // Optional ID for the container
}

export function BottomSheet({
  isOpen,
  onCloseAction,
  title,
  children,
  phoneContainerId = "phone-preview-container", // Default ID
}: PhoneDrawerProps) {
  const [phoneContainer, setPhoneContainer] = useState<HTMLElement | null>(null);
  const [containerScrollTop, setContainerScrollTop] = useState(0);
  const [containerClientHeight, setContainerClientHeight] = useState(0);
  const dragControls = useDragControls();

  // Find the phone container element on mount and add scroll listener
  useEffect(() => {
    const container = document.getElementById(phoneContainerId);
    if (container) {
      setPhoneContainer(container);
      const updateScrollState = () => {
        setContainerScrollTop(container.scrollTop);
        setContainerClientHeight(container.clientHeight);
      };
      container.addEventListener("scroll", updateScrollState);
      updateScrollState(); // Initial state
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, [phoneContainerId]); // Re-run if ID changes

  // Effect to control scroll based on drawer state for BOTH container and body
  useEffect(() => {
    if (!phoneContainer) return;

    // Store original styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalContainerOverflow = phoneContainer.style.overflow;

    if (isOpen) {
      // Apply lock styles
      document.body.style.overflow = "hidden";
      phoneContainer.style.overflow = "hidden"; // Keep locking the container too
    } else {
      // Restore original styles
      document.body.style.overflow = originalBodyOverflow;
      phoneContainer.style.overflow = originalContainerOverflow;
    }

    // Cleanup function to restore original styles on unmount
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      if (phoneContainer) {
        // Check if container still exists on cleanup
        phoneContainer.style.overflow = originalContainerOverflow;
      }
    };
  }, [isOpen, phoneContainer]); // Re-run when isOpen or phoneContainer changes

  // Function to handle the end of a drag gesture
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.offset.y;
    const velocity = info.velocity.y;

    if (dragDistance > 50 || velocity > 300) {
      onCloseAction(); // Use the passed onCloseAction handler
    }
  };

  // Get current scroll/height just before potential render
  // (Helps ensure the position is correct if container scrolls while drawer is closed)
  useEffect(() => {
    if (isOpen && phoneContainer) {
      setContainerScrollTop(phoneContainer.scrollTop);
      setContainerClientHeight(phoneContainer.clientHeight);
    }
  }, [isOpen, phoneContainer]);

  // JSX for the drawer content, to be portaled
  const DrawerPortalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="absolute inset-x-0 z-[9999]"
          style={{
            top: `${containerScrollTop}px`,
            height: `${containerClientHeight}px`,
            pointerEvents: "auto",
          }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onCloseAction}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            animate={{ y: 0 }}
            className="absolute inset-x-0 bottom-0 flex h-[80%] flex-col rounded-t-[10px] bg-white outline-none"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragControls={dragControls}
            dragElastic={0.2}
            dragListener={false}
            exit={{ y: "100%" }}
            initial={{ y: "100%" }}
            onDragEnd={handleDragEnd}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <DrawerHeader dragControls={dragControls} onClose={onCloseAction} title={title} />
            {/* Render children passed as props */}
            <div className="flex-1 overflow-auto bg-[--page-bg]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render the portal only if the container exists
  return phoneContainer ? createPortal(DrawerPortalContent, phoneContainer) : null;
}
