import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DashboardLayout from './Components/pages/admin/dashboardLayout.jsx'
import ReviewReportPage from './Components/Header/reports.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardPage from './Components/pages/admin/dashboardPage.jsx'
import SettingsPage from './Components/Header/settings.jsx'
import AnalystDashboard from './Components/pages/analyst/analystDashboard.jsx'
import AnalystLayout from './Components/pages/analyst/analystLayout.jsx'
import CreateAlertPage from './Components/createAlert.jsx'
import DetailedDashboardLayout from './Components/pages/analyst/reportAnalysis/DetailedDashboardLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/users/admin',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'reports/:id',
        element: <ReviewReportPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
      path: '/users/analyst',
      element: <AnalystDashboard />,
      children: [
        {
          path: 'dashboard',
          element: <AnalystLayout />,
        },
        {
          path: 'detailed-report-review',
          element: <DetailedDashboardLayout />,
        },
        {
          path: 'profile',
          element: <h1>Analyst Profile</h1>,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        }
      ]
  },
  {
    path: '/users/create-alert/:id',
    element: <CreateAlertPage />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
