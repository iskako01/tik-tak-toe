"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import avatar from "../../../public/avatar.png";
import Divider from "@components/Divider";
import UiButton from "@components/UiKit/UiButton";
import HeaderProfile from "./Profile";
import GameSettingsModal from "@components/Modals/GameSettings";
import { useGameStore } from "store/gameStore";

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const initGameState = useGameStore((state) => state.initGameState);
  const playersCount = useGameStore((state) => state.playersCount);

  function handlePlay() {
    initGameState(playersCount, 10000, Date.now());
  }

  return (
    <>
      <header className="w-full h-20 flex items-center justify-between shadow-lg bg-white">
        <div className="flex justify-between gap-5 pl-5">
          <Link href="/" className="flex">
            <Image src="/logo.svg" alt="logo" width={160} height={60} />
          </Link>

          <Divider />

          <UiButton className="w-44" size="lg" handleClick={handlePlay}>
            Play
          </UiButton>

          <UiButton
            variant="outline"
            size="md"
            handleClick={() => setSettingsOpen(true)}
          >
            Game Settings
          </UiButton>
        </div>
        <div className="pr-5">
          <HeaderProfile avatar={avatar} name="Alisher Iskakov" rating={1234} />
        </div>
      </header>

      <GameSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
