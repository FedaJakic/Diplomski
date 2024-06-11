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
import { Container, Row, Col } from 'react-bootstrap'

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
    <Container className="text-center mt-4">
      <h5>Social Links</h5>
      <Row className="justify-content-center">
        {Object.entries(links).map(
          ([key, value]) =>
            value && (
              <Col
                xs={6}
                md={4}
                lg={2}
                className="mb-3 d-flex justify-content-center"
                key={key}
              >
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block"
                  style={{ fontSize: '2rem' }}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  {linkIcons[key]}
                </a>
              </Col>
            )
        )}
      </Row>
    </Container>
  )
}

export default SocialLinks
