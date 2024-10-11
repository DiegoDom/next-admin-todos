"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  icon: JSX.Element;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl
        hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
        ${pathName === path ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
