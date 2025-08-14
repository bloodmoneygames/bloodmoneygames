import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'


import styles from './styles/Shares.module.scss';

const Shares = () => {
  return (
    <div className={styles.shares}>

      <FacebookShareButton
        url={'https://github.com/next-share'}
        quote={'next-share is a social share buttons for your next React apps.'}
        hashtag={'#nextshare'}
      >
        <FacebookIcon size={40} borderRadius={5}/>
      </FacebookShareButton>

      <RedditShareButton
        url={'https://github.com/next-share'}
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <RedditIcon size={40} borderRadius={5}/>
      </RedditShareButton>

      <TelegramShareButton
        url={'https://github.com/next-share'}
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <TelegramIcon size={40} borderRadius={5}/>
      </TelegramShareButton>

      <TwitterShareButton
        url={'https://github.com/next-share'}
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <TwitterIcon size={40} borderRadius={5}/>
      </TwitterShareButton>

      <WhatsappShareButton
        url={'https://github.com/next-share'}
        title={'next-share is a social share buttons for your next React apps.'}
        separator=":: "
      >
        <WhatsappIcon size={40} borderRadius={5}/>
      </WhatsappShareButton>

    </div>
  );
};

export default Shares;
