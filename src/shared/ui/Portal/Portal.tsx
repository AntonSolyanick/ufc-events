"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface PortalProps {
  children: React.ReactNode;
  element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { children, element } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, element || document.body);
};
