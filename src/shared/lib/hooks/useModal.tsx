"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay: number;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay - Задержка анимации закрытия (в мс)
 * @param isOpen - Флаг открытия модалки
 * @param onClose - Колбэк при закрытии
 */
export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    if (!onClose) return;

    setIsClosing(true);
    clearTimer(); // Очищаем предыдущий таймер

    timerRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, animationDelay);
  }, [animationDelay, onClose, clearTimer]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimer();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown, clearTimer]);

  // Добавляем очистку таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    isClosing,
    isMounted,
    close,
  };
}
