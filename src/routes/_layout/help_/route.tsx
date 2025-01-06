import { createFileRoute, Outlet } from '@tanstack/react-router'
import NavBar from './-NavBar'

export const Route = createFileRoute('/_layout/help_')({
  component: HelpPage,
})

function HelpPage() {
  return (
    <div className="flex flex-col overflow-y-hidden h-full">
      <NavBar />
      <div className="h-full overflow-y-auto p-3">
        <Outlet />
      </div>
    </div>
  )
}
