"use client";

import { AuthModal } from "@/features/Auth";
import { useCheckAuth, useSignOut } from "@/features/Auth/model/hooks/useAuth";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AppLink } from "@/shared/ui/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { useCallback, useState } from "react";

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { mutate: onLogout } = useSignOut();
  const { data: user, isLoading } = useCheckAuth();

  const onShowModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  if (isLoading) {
    return (
      <header className="flex items-center justify-between p-4 shadow-md">
        <nav className="flex gap-4">
          <AppLink href="/favourite-fighters">Избранное</AppLink>
          <AppLink href="/">Все бойцы</AppLink>
        </nav>

        <div></div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      <nav className="flex gap-4">
        <AppLink href="/favourite-fighters">Избранное</AppLink>
        <AppLink href="/">Все бойцы</AppLink>
      </nav>

      <div>
        <ThemeSwitcher />
        {user ? (
          <Button onClick={() => onLogout()} theme={ButtonTheme.CLEAR}>
            Выйти
          </Button>
        ) : (
          <Button
            onClick={onShowModal}
            theme={ButtonTheme.CLEAR}
            aria-label="Открыть окно авторизации"
          >
            Войти
          </Button>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
    </header>
  );
};
