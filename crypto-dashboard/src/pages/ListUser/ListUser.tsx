import React, { useEffect, useState } from 'react'
import './listUser.moudle.css'
import { User } from '../../util/pages/userProfile/types'
import { UserUrlsApi } from '../../api/user'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Role } from '../../util/env'
import Loading from '../../components/global/Loading'

const ListUser = () => {
  const [users, setUsers] = useState<User[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchAllUsers = async () => {
    try {
      const allUsers = await UserUrlsApi.getAllUsers()
      if (allUsers.success) {
        setUsers(allUsers.data)
      }
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const deleteUser = async (userId: string) => {
    try {
      const deletedRows = await UserUrlsApi.deleteUser({ userId })

      if (deletedRows.success) {
        fetchAllUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <Loading />
  else
    return (
      <>
        <div className="container bootstrap snippets bootdey mt-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-box no-header clearfix">
                <div className="main-box-body clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th>
                            <span>User</span>
                          </th>
                          <th>
                            <span>Created</span>
                          </th>
                          <th className="text-center">
                            <span>Status</span>
                          </th>
                          <th>
                            <span>Email</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  src="https://bootdey.com/img/Content/user_1.jpg"
                                  alt=""
                                />
                                <span className="text-primary user-link">
                                  {user.first_name} {user.last_name}
                                </span>
                                <span className="user-subhead">
                                  {String(user.role_id) === Role.Member
                                    ? 'Member'
                                    : 'Admin'}
                                </span>
                              </td>
                              <td>
                                {new Date(user.created).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  }
                                )}
                              </td>
                              <td className="text-center">
                                <span className="label label-default">
                                  active
                                </span>
                              </td>
                              <td>
                                <span className="text-primary text-decoration-none">
                                  {user.email}
                                </span>
                              </td>
                              <td style={{ width: '20%' }}>
                                <Button variant="primary" className="mx-1">
                                  <Link
                                    className="fa-stack"
                                    to={`/account-details/${user.id}`}
                                  >
                                    <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </Link>
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => deleteUser(String(user.id))}
                                  className="mx-1"
                                >
                                  <span className="fa-stack">
                                    <i className="fa fa-trash fa-stack-1x fa-inverse"></i>
                                  </span>
                                </Button>
                                <Button variant="success" className="mx-1">
                                  <Link
                                    className="fa-stack"
                                    to={`/send-message/${user.id}`}
                                  >
                                    <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                                  </Link>
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default ListUser
