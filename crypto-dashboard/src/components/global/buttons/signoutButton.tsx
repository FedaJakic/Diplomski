import React from 'react'
import styles from './signOutButton.module.css'
import { removeRole, removeToken } from '../../../util/helpers/tokenHelpers'
import { PagesURLs } from '../../../util/env'

const SignOutButton: React.FC = () => {
  const handleSignOut = () => {
    removeToken()
    removeRole()
    window.location.href = PagesURLs.Login
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center m-2 p-1"
      style={{ textDecoration: 'none' }}
      onClick={handleSignOut}
    >
      <button className={styles.arrowButton}>
        <p className={styles.text}>SignOut</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.svg} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </button>
    </div>
  )
}

export default SignOutButton
