import { Outlet } from "react-router-dom"
import Header from "../../components/admin/layout/header"
import SideBar from "../../components/admin/layout/side-bar"

const AdminPage = () => {
  return (
    <div className="grid grid-cols-12 w-full">
      <SideBar />
      <div className='bg-slate-50 col-span-10'>
        <Header />
        <div className="bg-gray-100 h-[calc(100vh-64px)]">
          <div className=" flex h-full items-start justify-center py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage