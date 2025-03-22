"use client";
import React from "react";
import { Link, Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { linksToRender } from "./TopNavbar";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Image from "next/image";
import { useCartStore } from "../store/useCartStore";

const TopNavbarItems = () => {
  const router = useRouter();

  const { cartItems } = useCartStore();
  return (
    <>
      <NavbarContent justify="center" className="md:flex hidden space-x-10">
        {linksToRender.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.href} className="text-blue">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className=" mx-2 " justify="end">
        <>
          <NavbarItem className="flex   space-x-2">
            <CiSearch className="md:block hidden" size={20} />
            <HiOutlineUserCircle className="md:block hidden" size={20} />
            <Image
              onClick={() => router.push("/cart")}
              src="/shopping.svg"
              alt="Next.js logo"
              width={20}
              height={20}
              priority
            />
            <Link href="/cart">
              <div className="h-5 w-5 text-white text-center font-bold text-sm bg-black rounded-full">
                {cartItems.length}
              </div>
            </Link>
          </NavbarItem>
        </>
      </NavbarContent>
    </>
  );
};

export default TopNavbarItems;
