'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DashboardData } from '../../../types'
import Dashboard from './dashboard'
import { User, getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getDashboardData } from '@/api/dashboard'

export default function Page() {
  const [user] = useAuthState(getAuth())

  const [adminUser, setAdminUser] = useState(false)

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    if (user) {
      fetchDashboardData(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function fetchDashboardData(u: User) {
    try {
      const res = await getDashboardData(u)

      switch (res.status) {
        case 200:
          setAdminUser(res.headers['studio'] === '0')

          setDashboardData(res.body)

          break
        case 401:
          alert(`You are not authorized to access this page.`)
          break
        default:
          alert(`An error occured while fetching dashboard data.`)
          break
      }
    } catch (error) {
      console.error(error)
      alert(`An error occured while fetching dashboard data.`)
    }
  }

  return (
    <>
      {dashboardData ? (
        <Dashboard
          data={dashboardData}
          adminUser={adminUser}
          invalidateData={() => fetchDashboardData(user as User)}
        />
      ) : (
        <p className="text-xl font-semibold my-5">Loading dashboard...</p>
      )}
    </>
  )
}
