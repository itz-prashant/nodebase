import AppSidebar from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'


const dashboardLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <SidebarProvider>
    <TooltipProvider>
        <AppSidebar />
    </TooltipProvider>
      <SidebarInset className='bg-accent/20'>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default dashboardLayout
