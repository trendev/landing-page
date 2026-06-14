import type { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  /** Extra classes for the panel, e.g. `max-w-3xl max-h-[90vh]`. */
  panelClassName?: string;
  children: ReactNode;
}

/** Full-screen backdrop that closes on outside click; the panel stops propagation. */
export function Modal({ onClose, panelClassName = "", children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl w-full overflow-y-auto shadow-2xl ${panelClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
