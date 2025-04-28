'use client'

import { usePathname } from "next/navigation";

import UserButton from "@/features/auth/components/user-button";

import MobileSidebar from "./mobile-sidebar";

const pathNameMap = {
  'default': {
    title: "Home",
    description: "Monitor all of your projects and tasks here"
  },
  "tasks" : {
    title: "My tasks",
    description: "View all your tasks here"
  },
  "projects" : {
    title: "My Project",
    description: "View tasks of your project here"
  },
}


const Navbar = () => {
  const pathname = usePathname()

  const pathnameParts = pathname.split("/")

  const pathnameKey = pathnameParts[3] as keyof typeof pathNameMap

  const {description, title} = pathNameMap[pathnameKey] ?? pathNameMap.default
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
