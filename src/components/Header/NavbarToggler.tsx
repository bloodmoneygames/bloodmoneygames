'use client';

import { useRouter } from 'next/navigation';
import styles from './styles/NavbarToggler.module.scss';
import {TNavbarProviderState, useNavbarContext} from "@/utils/hooks/NavbarProvider";

const NavbarToggler = () => {
  const router = useRouter();
  let { isNavOpen, setIsNavOpen }: TNavbarProviderState = useNavbarContext();

  return (
    <button
      className={styles.navbarToggler}
      onClick={() => {
        setIsNavOpen(!isNavOpen)
      }}
      data-active={isNavOpen}
    >
      <span className="sr-only">Toggle menu</span>
      {isNavOpen ? (
        <svg className="icon" width="24px" height="24px">
          <use href="#icon-close"></use>
        </svg>
      ) : (
        <svg className="icon" width="24px" height="24px">
          <use href="#icon-menu"></use>
        </svg>
      )}

    </button>
  );
};

export default NavbarToggler;
