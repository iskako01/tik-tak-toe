import Avatar from "@components/Avatar";
import Icon from "@components/Icon";
import { StaticImageData } from "next/image";

interface PlayerPropsInterface {
  avatar: string | StaticImageData;
  name: string;
  rating: number;
  symbol: string;
}

export default function PlayerInfo({
  avatar,
  name,
  rating,
  symbol,
}: PlayerPropsInterface) {
  return (
    <div className="relative w-44">
      <div className="flex items-center gap-3 max-w-52 w-full">
        <Avatar name={name} src={avatar} />

        <div className="flex items-center gap-3 text-teal-600 overflow-hidden">
          <div className="flex flex-col text-start truncate ">
            <span>{name}</span>
            <div className="text-slate-400 text-xs">
              <span>Rating: </span>
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>

      <span className="w-5 h-5 rounded-full shadow flex justify-center items-center absolute -left-1 top-0 bg-white">
        <Icon iconName={symbol} />
      </span>
    </div>
  );
}
