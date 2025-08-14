// Components
import Link from 'next/link';
import Image from 'next/image';

// Styles
import styles from './styles/Livecounter.module.scss';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Livecounter = () => {
  return (
    <div className={styles.livecounter}>
      <Link
        href="https://www.liveinternet.ru/click"
        target={'_blank'}
      >
        <Image
          id={'licnt91E6'}
          priority
          src={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7'}
          className={styles.logo__image}
          alt="alt"
          width="31"
          height="31"
        />
      </Link>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function(d,s){d.getElementById("licnt91E6").src="https://counter.yadro.ru/hit?t45.18;r"+escape(d.referrer)+((typeof(s)=="undefined")?"":";s"+s.width+"*"+s.height+"*"+(s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(d.URL)+";h"+escape(d.title.substring(0,150))+";"+Math.random()})(document,screen)
            `,
        }}
      />
    </div>
  );
};

export default Livecounter;
