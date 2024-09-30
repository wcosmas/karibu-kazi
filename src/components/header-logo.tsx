import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Image
      src="/indeed.png"
      alt="Logo"
      width={140}
      height={100}
      className="cursor-pointer"
    />
  );
};
