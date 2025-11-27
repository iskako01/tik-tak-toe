import { StaticImageData } from "next/image";
import Avatar from "@components/Avatar";
import Icon from "@components/Icon";

interface ProfilePropsInterface {
  avatar: string | StaticImageData;
  name: string;
  rating: number;
}

export default function HeaderProfile({
  avatar,
  name,
  rating,
}: ProfilePropsInterface) {
  return (
    <div className="flex items-center gap-3 max-w-52 w-full">
      <Avatar name={name} src={avatar} />

      <button className="flex items-center gap-3 text-teal-600 transition-colors hover:text-teal-500">
        <div className="flex flex-col text-start">
          <span>{name}</span>
          <div className="text-slate-400 text-xs">
            <span>Rating: </span>
            <span>{rating}</span>
          </div>
        </div>

        <Icon iconName="down-arrow" height={18} width={18} />
      </button>
    </div>
  );
}
