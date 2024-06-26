import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button } from 'react-bootstrap'
import SignOutButton from '../global/buttons/signoutButton'
import styles from './userAndSignOut.module.css'
import { tokenDecode } from '../../util/helpers/tokenHelpers'
import { UserUrlsApi } from '../../api/user'
import { MessageUrlsApi } from '../../api/message'

const UserAndSignOut = () => {
  const token = localStorage.getItem('token')
  const [username, setUsername] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [unseenMessagesCount, setUnseenMessagesCount] = useState<number>(0)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (token) {
          const decodedToken = tokenDecode(token)
          const userInformation = await UserUrlsApi.getUserAccountDetails({
            userId: decodedToken.id,
          })

          setUsername(userInformation.username)
          setRole(userInformation.role_id)
          setUserId(String(userInformation.id))

          // Fetch unseen messages count
          const { unseenCount } = await MessageUrlsApi.getUnseenMessagesCount(
            decodedToken.id
          )
          setUnseenMessagesCount(unseenCount)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserProfile()
  }, [token])

  return (
    <div>
      <hr style={{ margin: '20px 0' }} />
      <Link
        to={`/account-details/${userId}`}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className={styles.cardClient}>
          <div className={styles.userPicture}>
            <svg
              className={styles.svg}
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
            </svg>
          </div>
          <p className={styles.nameClient}>{username}</p>
          <p>{parseInt(role) === 1 ? 'Member' : 'Admin'}</p>
        </div>
      </Link>
      <Link
        to={`/messages`}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Button variant="info" className="position-relative my-4">
          Messages
          {unseenMessagesCount > 0 && (
            <Badge
              bg="danger"
              className="position-absolute top-0 start-100 translate-middle"
            >
              {unseenMessagesCount}
            </Badge>
          )}
        </Button>
      </Link>
      <SignOutButton />
    </div>
  )
}

export default UserAndSignOut
