import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={140}
      height={100}
      className="cursor-pointer"
    />
  );
};
