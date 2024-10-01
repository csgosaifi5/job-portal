import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="textDecoration-none"
        >
          Go to Website
        </a>
        <span className="ms-1">&copy; 2023 DJF Law Firm.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
