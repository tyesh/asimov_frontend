import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="localhost:3001" target="_blank" rel="noopener noreferrer">
          Asimov
        </a>
        <span className="ms-1">&copy; 2022 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Pruebas automatizadas para</span>
        <a href="https://testing.lincolnsoft.com.py" target="_blank" rel="noopener noreferrer">
          Lincolnsoft
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
