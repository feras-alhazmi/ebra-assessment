"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import TopNavbarItems from "./TopNavbarItems";
import SmallNavbar from "./SmallNavbar";

export default function TopMenu() {
  const route = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" py-4 rounded-full mx-20 bg-white sticky top-5 z-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="text-blue  border-divider"
      >
        <NavbarContent className="justify-between">
          <NavbarBrand>
            <SmallNavbar />
            <Link
              onClick={() => {
                router.push(`/`);
              }}
            >
              <p className="text-2xl ml-2" style={{ fontFamily: "Helvetica" }}>
                3legant.
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Mobile menu items */}

        {/* Desktop navbar items */}
        <TopNavbarItems />
      </Navbar>
    </div>
  );
}

export const linksToRender = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Product",
    href: "/product",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];
