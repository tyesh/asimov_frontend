import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilMoney,
  cilLockUnlocked,
  cilDescription
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Modulos',
  },
  {
    component: CNavGroup,
    name: 'Manejo de sesión',
    to: '/session-test',
    icon: <CIcon icon={cilLockUnlocked} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inicio de sesión',
        to: '/session-test/login',
      }
    ]
  },
  {
    component: CNavItem,
    name: 'Ventas (UVM)',
    to: '/uvm-test',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Comprobantes',
    to: '/voucher-test',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Nota crédito (Factura)',
        to: '/session-test/create-note-credit-invoice',
      },
      {
        component: CNavItem,
        name: 'Imprimir Nota',
        to: '/session-test/print-voucher',
      }
    ]
  },
]

export default _nav
