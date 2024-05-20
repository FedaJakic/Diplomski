import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BLOCK_HASH_TARGET,
  BLOCK_HEIGHT_REGEX,
} from '../../util/helpers/helpers'
import { BlockUrlsApi } from '../../api/block'

const Header = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (searchValue.substring(0, 10) === BLOCK_HASH_TARGET) {
      BlockUrlsApi.getBlockHeightByHash({ hash: searchValue })
        .then((res) => {
          navigate(`/block/${res.height}`)
        })
        .catch((err) => console.log(err))
    } else if (searchValue.match(BLOCK_HEIGHT_REGEX)) {
      navigate(`/block/${searchValue}`)
    } else if (searchValue.length > 7) {
      navigate(`/transaction/${searchValue}`)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Block Explorer</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="text-decoration-none" to={'/'}>
                <a className="nav-link">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-decoration-none" to={'/wallet'}>
                <a className="nav-link">
                  Wallet
                  <span className="visually-hidden">(current)</span>
                </a>
              </Link>
            </li>
          </ul>
          <form className="d-flex w-50">
            <input
              className="form-control me-sm-2 w-40"
              type="search"
              placeholder="Paste Transaction, block or block hash"
              value={searchValue}
              onChange={handleChange}
            />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
export default Header
