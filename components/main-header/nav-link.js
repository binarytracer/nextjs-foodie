"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

function getActiveClass(pathname, target) {
  return pathname.startsWith(target)
    ? `${classes.link} ${classes.active}`
    : classes.link;
}

export function NavLink(props) {
  const { href, children } = props;
  const path = usePathname();

  return (
    <Link href={href} className={getActiveClass(path, href)}>
      {children}
    </Link>
  );
}
