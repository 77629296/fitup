"use client";

import { Drawer as VaulDrawer } from "vaul";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";

interface BottomSheetProps {
  isOpen: boolean;
  onCloseAction: () => void; // Renommé pour correspondre à l'usage
  title: string;
  children: React.ReactNode;
  phoneContainerId?: string; // Garde l'ID pour trouver le conteneur du portail
  className?: string; // Ajout pour plus de flexibilité de style
  contentClassName?: string; // Ajout pour le style du contenu interne
  // Ajoute d'autres props de vaul si nécessaire (e.g., snapPoints, dismissible)
}

export function BottomSheetVaul({
  isOpen,
  onCloseAction,
  title,
  children,
  phoneContainerId = "phone-preview-container", // Default ID
  className,
  contentClassName,
}: BottomSheetProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Trouve le conteneur du portail quand le composant est monté ou l'ID change
  useEffect(() => {
    const container = document.getElementById(phoneContainerId);
    setPortalContainer(container);
  }, [phoneContainerId]);

  // Gère le changement d'état ouvert/fermé
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCloseAction();
    }
    // Vaul gère l'état interne 'open', on déclenche seulement la fermeture via la prop
  };

  // Ne rend rien côté serveur ou si le conteneur du portail n'est pas trouvé
  if (!portalContainer) {
    return null;
  }

  return (
    <VaulDrawer.Root
      container={portalContainer}
      onOpenChange={handleOpenChange}
      // direction="bottom" // est la direction par défaut
      // dismissible={true} // est vrai par défaut
      open={isOpen}
    >
      <VaulDrawer.Portal container={portalContainer}>
        {/* Overlay assombri */}
        <VaulDrawer.Overlay className="fixed inset-0 z-[9998] bg-black/40" />

        {/* Contenu du tiroir */}
        <VaulDrawer.Content
          className={cn(
            "bg-background fixed bottom-0 left-0 right-0 z-[9999] mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-white outline-none", // Utilise bg-background de shadcn/tailwind
            className, // Permet de surcharger le style externe
          )}
        >
          {/* Barre de préhension (optionnel mais bon pour l'UX mobile) */}
          {/* <div className="mx-auto mt-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-slate-300" /> */}

          {/* En-tête */}
          <VaulDrawer.Title className="sticky top-0 z-10 flex items-center justify-between rounded-t-[10px] border-b bg-gray-300/50 px-4 py-3">
            <span className="text-foreground font-medium">{title}</span>
            <VaulDrawer.Close asChild>
              <Button aria-label="Fermer" className="[&>svg]:size-[20px]" size="large" type="button" variant="ghost">
                <X className="h-7 w-7" />
              </Button>
            </VaulDrawer.Close>
          </VaulDrawer.Title>

          {/* Contenu scrollable */}
          <div
            className={cn(
              "flex-1 overflow-auto bg-[--page-bg] p-4", // Ajout de padding par défaut
              contentClassName, // Permet de surcharger le style interne
            )}
          >
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
