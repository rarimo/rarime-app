import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <p>Main layout</p>
      <Outlet />
    </div>
  )
}

export default MainLayout
