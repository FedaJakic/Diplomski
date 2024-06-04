import React from 'react'
import {
  FaGlobe,
  FaFileAlt,
  FaTwitter,
  FaReddit,
  FaTelegram,
  FaDiscord,
  FaMedium,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaTwitch,
  FaSpotify,
  FaWeixin,
  FaSoundcloud,
} from 'react-icons/fa'

interface SocialLinksProps {
  links: { [key: string]: string | null }
}

const linkIcons: { [key: string]: React.ReactElement } = {
  website: <FaGlobe />,
  whitepaper: <FaFileAlt />,
  twitter: <FaTwitter />,
  reddit: <FaReddit />,
  telegram: <FaTelegram />,
  discord: <FaDiscord />,
  medium: <FaMedium />,
  instagram: <FaInstagram />,
  tiktok: <FaTiktok />,
  youtube: <FaYoutube />,
  linkedin: <FaLinkedin />,
  twitch: <FaTwitch />,
  spotify: <FaSpotify />,
  wechat: <FaWeixin />,
  soundcloud: <FaSoundcloud />,
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h5>Social Links</h5>
      {Object.entries(links).map(
        ([key, value]) =>
          value && (
            <div className="m-3" key={key} style={{ fontSize: '2rem' }}>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="m-2"
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                {linkIcons[key]}
              </a>
            </div>
          )
      )}
    </div>
  )
}

export default SocialLinks
