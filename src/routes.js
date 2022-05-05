import React from 'react';
import CreateCreditNoteWithInvoice from './views/receipts/CreateCreditNoteWithInvoice';
import PrintNote from './views/receipts/PrintNote.js';
import Login from './views/session/Login';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/session-test', name: 'Manejo de sesión', element: Dashboard },
    { path: '/session-test/login', name: 'Inicio de sesión', element: Login },
    { path: '/uvm-test', name: 'Ventas (UVM)', element: Dashboard },
    { path: '/voucher-test', name: 'Comprobantes', element: Dashboard },
    { path: '/session-test/create-note-credit-invoice', name: 'Comprobantes', element: CreateCreditNoteWithInvoice },
    { path: '/session-test/print-voucher', name: 'Comprobantes', element: PrintNote },
  ];
  
  export default routes;
  