import React from 'react'
import styles from './sidebarMenuButtons.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface Props {
  text: string
  linkTo: string
  fontAwesomeIcon: IconDefinition
}

const SidebarMenuButtons: React.FC<Props> = ({
  text,
  linkTo,
  fontAwesomeIcon,
}) => {
  return (
    <Link
      to={linkTo}
      className={`${styles.btn} my-2 p-3`}
      style={{ textDecoration: 'none', width: '95%' }}
    >
      <span className={styles.icon}>
        <FontAwesomeIcon icon={fontAwesomeIcon} />
      </span>
      <span className={styles.text}>{text}</span>
    </Link>
  )
}

export default SidebarMenuButtons
