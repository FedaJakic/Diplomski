import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { tokenDecode } from '../../util/helpers/tokenHelpers'
import { User } from '../../util/pages/userProfile/types'
import { UserUrlsApi } from '../../api/user'
import Loading from '../../components/global/Loading'
import InfoModal from '../../components/global/InfoModal'
import UploadModal from '../../components/global/UploadModal'
import { useParams } from 'react-router-dom'

const AccountDetails: React.FC = () => {
  const token = localStorage.getItem('token')
  const { userId } = useParams<{ userId: string }>()
  const [userProfile, setUserProfile] = useState<User>({
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    date_of_birth: '',
    profile_picture: '',
    role_id: '',
    created: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAlert, setAlert] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  const fetchUserProfile = async () => {
    try {
      if (userId && token) {
        const userInformation = await UserUrlsApi.getUserAccountDetails({
          userId,
        })

        setUserProfile(userInformation)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [token])

  const updateUserProfile = async () => {
    try {
      if (token && userProfile) {
        const decodedToken = tokenDecode(token)
        const updatedUserInformation = await UserUrlsApi.updateUserAccount({
          userId: decodedToken.id,
          username: userProfile.username,
          name: userProfile.first_name,
          surname: userProfile.last_name,
          date_of_birth: userProfile.date_of_birth,
        })

        if (updatedUserInformation.success) {
          setUserProfile(updatedUserInformation.data)
          setShowModal(true)
        } else {
          setAlert(true)
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value || '',
    }))
  }

  const handleUpload = async (file: File | null) => {
    if (token && file) {
      try {
        const formData = new FormData()
        formData.append('profile_picture', file)
        formData.append('userId', String(userProfile.id))
        formData.append('username', userProfile.username)

        const data = await UserUrlsApi.updateProfilePicture(formData)

        if (data.success) {
          setUserProfile((prevProfile) => ({
            ...prevProfile,
            profile_picture: data.profilePicturePath,
          }))
        } else {
          console.error('Failed to upload the profile picture')
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error)
      }
    }
  }

  const handleCloseModal = async () => {
    fetchUserProfile()
    setShowModal(false)
  }

  if (isLoading) return <Loading />
  else
    return (
      <div className="container-xl px-4 mt-4">
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={
                    userProfile.profile_picture ||
                    'http://bootdey.com/img/Content/avatar/avatar1.png'
                  }
                  alt=""
                />
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload new image
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={userProfile.username || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        name="first_name"
                        value={userProfile.first_name || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        name="last_name"
                        value={userProfile.last_name || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={userProfile.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="date"
                        name="date_of_birth"
                        placeholder="Enter your birthday"
                        value={
                          userProfile.date_of_birth
                            ? new Date(userProfile.date_of_birth)
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    onClick={updateUserProfile}
                  >
                    Save changes
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <InfoModal
          show={showModal}
          onHide={handleCloseModal}
          title="Success"
          body="Your profile has been successfully updated."
        />
        <UploadModal
          title="Upload Profile Picture"
          show={showUploadModal}
          onHide={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      </div>
    )
}

export default AccountDetails
