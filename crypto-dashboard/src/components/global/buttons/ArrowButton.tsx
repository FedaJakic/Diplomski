import React from 'react'
import styles from './arrowButton.module.css'
import { Link } from 'react-router-dom'

const ArrowButton: React.FC = () => {
  return (
    <Link
      to="/register"
      className="d-flex align-items-center justify-content-center m-2 p-1"
      style={{ textDecoration: 'none' }}
    >
      <button className={styles.arrowButton}>
        <p className={styles.text}>Register</p>
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
    </Link>
  )
}

export default ArrowButton
