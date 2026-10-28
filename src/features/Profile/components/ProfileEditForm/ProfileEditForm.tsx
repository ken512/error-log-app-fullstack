"use client";

import { Profile } from "@/features/Profile/types/profile.type";
import { PROFILE_FIELDS } from "@/config/profile/profileFields";
import { Button } from "@/components/Button/Button";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

type props = {
  profile: Profile;
  onCancel: () => void;
  onOpenUpdateDialog: () => void;
  isUpdating: boolean;
};

export const ProfileEditForm = ({
  onCancel,
  onOpenUpdateDialog,
  isUpdating,
  profile,
}: props) => {
  const { register } = useFormContext<Profile>();

  return (
    <div className="border-none rounded-2xl px-5 py-5 my-8 bg-[#333333] text-left">
      <div className="flex justify-center">
      <div className="w-24 h-24 text-center rounded-full border-4border-white overflow-hidden bg-amber-100 shadow-sm">
        {profile.profileIcon ? (
          <Image
            src={profile.profileIcon}
            alt={profile.userName}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-hull items-center justify-center bg-amber-900 text-white text-2xl font-bold">
            {profile.userName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      </div>
      {PROFILE_FIELDS.map((profile) => (
        <div key={profile.name} className="mx-auto w-full flex flex-col gap-3">
          <label htmlFor="label" className="font-bold my-5">
            {profile.label}
          </label>
          <input
            type={profile.type}
            placeholder={profile.placeholder}
            {...register(profile.name)}
            className="border-none px-4 py-4 rounded-2xl bg-[#222222]"
          />
        </div>
      ))}
      <div className="flex justify-center gap-10 my-5">
        <Button
          className="border border-[#ff6666] text-[#ff6666] font-bold px-3 py-3"
          disabled={isUpdating}
          onClick={onCancel}
        >
          キャンセル
        </Button>
        <Button
          className="border border-[#1e90ff] text-[#1e90ff] font-bold px-3 py-3"
          disabled={isUpdating}
          onClick={onOpenUpdateDialog}
          type="button"
        >
          {isUpdating ? "保存中..." : "保存する"}
        </Button>
      </div>
    </div>
  );
};
