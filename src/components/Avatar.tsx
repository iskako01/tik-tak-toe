import Image, { StaticImageData } from "next/image";

interface AvatarPropsInterface {
  name: string;
  src: string | StaticImageData;
}
export default function Avatar({ name, src }: AvatarPropsInterface) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-contain "
        />
      ) : (
        <div className="min-w-12 h-12 rounded-full bg-slate-300 text-2xl flex justify-center items-center">
          {firstLetter}
        </div>
      )}
    </>
  );
}
