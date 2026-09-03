import Link from "next/link";
import { HeaderAuth } from "@/features/Header/HeaderAuth";

type Props = {
  open: boolean;
  id: string;
};

export const Navigation = async ({ open, id }: Props) => {


  return (
    <nav id={id} area-hidden={!open} className="w-full bg-gray-800 p-4">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="src/app/page.tsx" className="text-white text-md hover:text-gray-300 block py-2">ホーム</Link>
        </li>
        <li>
          <Link href="#" className="text-white text-md hover:text-gray-300 block py-2">ログリスト</Link>
        </li>

        <li>
          <HeaderAuth />
        </li>
      </ul>
    </nav>
  );
};
