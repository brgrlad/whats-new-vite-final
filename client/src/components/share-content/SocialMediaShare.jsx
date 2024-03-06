import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import PropTypes from "prop-types";

import "./SocialMediaShare.css";

export default function SocialMediaShare({ url }) {
  return (
    <div className="shareButtons">
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={100} round className="social_icon" />
      </WhatsappShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon size={32} round className="social_icon" />
      </TelegramShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round className="social_icon" />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round className="social_icon" />
      </LinkedinShareButton>

      <EmailShareButton url={url}>
        <EmailIcon size={32} round className="social_icon" />
      </EmailShareButton>
    </div>
  );
}

SocialMediaShare.propTypes = {
  url: PropTypes.string.isRequired,
};
