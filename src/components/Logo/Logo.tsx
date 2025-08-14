// Components
import Link from 'next/link';
import Image from 'next/image';
import logo from "./assets/logo.webp";

// Styles
import styles from './styles/Logo.module.scss';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Logo = () => {
  return (
    <Link
      href="/"
    >
      <Image
        priority
        src={logo}
        className={styles.logo__image}
        alt="alt"
        width="147"
        height="56"
      />
    </Link>
  );
};

export default Logo;