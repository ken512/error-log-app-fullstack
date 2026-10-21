"use client";

import { Profile } from "@/types/profile.type";
import { PROFILE_FIELDS } from "@/config/profile/profileFields";
import { Button } from "@/components/Button/Button";
import { useFormContext } from "react-hook-form";

type props = {
  onCancel: () => void;
  isUpdating: boolean;
};

export const ProfileEditForm = ({ onCancel, isUpdating }: props) => {
  const { register } = useFormContext<Profile>();

  return (
    <>
      {PROFILE_FIELDS.map((profile) => (
        <>
          <label htmlFor="profile.label">{profile.label}</label>
          <input
            type={profile.type}
            placeholder={profile.placeholder}
            {...register(profile.name)}
          />
          <div className="flex gap-16"></div>
        </>
      ))}
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
      >
        {isUpdating ? "保存中..." : "保存する"}
      </Button>
    </>
  );
};
