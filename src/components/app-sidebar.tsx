"use client";

import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscription/hooks/use-subscription";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {hasActiveSubscription, isLoading} = useHasActiveSubscription()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="!bg-transparent">
              <Link href={"/"} prefetch>
                <Image
                  src={"/logos/logo.svg"}
                  alt="Logo"
                  width={30}
                  height={30}
                  className="flex items-center text-sm gap-2 self-center font-medium"
                />
                Nodebase
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((groups) => (
          <SidebarGroup key={groups.title}>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {groups.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className={`gap-x-4 h-10 px-4 ${pathname === item.url ? "" : "!bg-transparent"}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="gap-1">
            {!hasActiveSubscription && !isLoading &&(<SidebarMenuItem>
                <SidebarMenuButton
                    tooltip={"Upgrade to Pro"}
                    className="gap-x-4 h-10 px-4 !bg-transparent"
                    onClick={()=>{authClient.checkout({slug:'nodebase'})}}
                >
                    <StarIcon className="h-4 w-4"/>
                    <span >
                        Upgrade to Pro
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>)}
            <SidebarMenuItem>
                <SidebarMenuButton
                    tooltip={"Billing Portal"}
                    className="gap-x-4 h-10 px-4 !bg-transparent"
                    onClick={()=>{}}
                >
                    <CreditCardIcon className="h-4 w-4"/>
                    <span>
                        Billing Portal
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                    tooltip={"Sign out"}
                    className="gap-x-4 h-10 px-4 !bg-transparent"
                    onClick={()=> authClient.signOut({
                        fetchOptions:{
                            onSuccess:()=>{
                                router.push('/login')
                            }
                        }
                    })}
                >
                    <LogOutIcon className="h-4 w-4"/>
                    <span>
                        Sign out
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
