"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../../../public/avatar.png";
import Divider from "@components/Divider";
import ProfileHeader from "@components/Profile";
import UiButton from "@components/UiKit/UiButton";

export default function Header() {
  return (
    <header className="w-full h-20 flex items-center justify-between shadow-lg bg-white">
      <div className="flex justify-between gap-5 pl-5">
        <Link href="/" className="flex">
          <Image src="/logo.svg" alt="logo" width={160} height={60} />
        </Link>

        <Divider />

        <UiButton className="w-44" size="lg">
          Play
        </UiButton>
      </div>
      <div className="pr-5">
        <ProfileHeader avatar={avatar} name="Alisher Iskakov" rating={1234} />
      </div>
    </header>
  );
}
