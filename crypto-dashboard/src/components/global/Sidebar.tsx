import React from 'react'
import styles from './sidebar.module.css'
import SidebarMenuButtons from './buttons/sidebarMenuButtons'
import {
  faMagnifyingGlass,
  faChartLine,
  faNewspaper,
  faMoneyBillTransfer,
} from '@fortawesome/free-solid-svg-icons'
import { faBitcoin, faHive } from '@fortawesome/free-brands-svg-icons'
import { PagesURLs } from '../../util/env'
import LoginAndRegister from '../login/LoginAndRegister'
import { isTokenExist } from '../../util/helpers/tokenHelpers'
import UserAndSignOut from '../login/UserAndSignOut'

function Sidebar() {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarScroll}>
        <div className="d-flex flex-column justify-content-center alignt-items-center">
          <SidebarMenuButtons
            text={'Crypto search'}
            linkTo={PagesURLs.CryptoSearch}
            fontAwesomeIcon={faMagnifyingGlass}
          />
          <SidebarMenuButtons
            text={'News and analysis'}
            linkTo={PagesURLs.NewsAndAnalysis}
            fontAwesomeIcon={faNewspaper}
          />
          <SidebarMenuButtons
            text={'Conversion'}
            linkTo={PagesURLs.Conversion}
            fontAwesomeIcon={faMoneyBillTransfer}
          />
          <SidebarMenuButtons
            text={'Bitcoin'}
            linkTo={PagesURLs.Bitcoin}
            fontAwesomeIcon={faBitcoin}
          />
          <SidebarMenuButtons
            text={'Bitcoin blockchain'}
            linkTo={PagesURLs.BitcoinBlockchain}
            fontAwesomeIcon={faHive}
          />
        </div>
      </div>
      {isTokenExist() ? <UserAndSignOut /> : <LoginAndRegister />}
    </div>
  )
}

export default Sidebar
