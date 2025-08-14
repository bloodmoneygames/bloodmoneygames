import Link from 'next/link';

// import useSite from 'hooks/use-site';
import { postPathBySlug } from '@/utils/helpers/posts';
// import { categoryPathBySlug } from '@/utils/lib/categories';

import { getSiteoptions } from '@/utils/hooks/ServerContext';

import Container from '@/components/Container';

import styles from './styles/Footer.module.scss';
import Logo from '../Logo';
import Footmenu from './Footmenu';

const Footer = () => {
    const siteoptions = getSiteoptions();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer__inner}>
                    <Logo />
                    <Footmenu />

                    <div className="footer__copyright">
                        &copy; {new Date().getFullYear()} {siteoptions.title} {siteoptions.sweetcoreSettings.footer.copyright}
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
