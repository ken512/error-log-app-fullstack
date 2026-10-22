"use client";

import { ProfileView } from "./ProfileIcons/ProfileIcons";
import { ProfileEditForm } from "./ProfileEditForm/ProfileEditForm";
import Link from "next/link";
import { Profile } from "@/features/Profile/types/profile.type";
import { UserProfileResponse } from "@/types/api-response";
import { UpdateUserProfile } from "@/types/api-response";
import { useGetFetcher } from "@/hooks/useFetch";
import { profileModeAtom } from "@/stores/profileActionsAtoms";
import { useAtom} from "jotai";
import { usePut } from "@/hooks/useFetch";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const UserProfile = () => {
  const [mode, setMode] = useAtom(profileModeAtom);
  const queryClient = useQueryClient();

  const methods = useForm<Profile>({
    defaultValues: {
      userName: "",
      profileIcon: "",
      xUrl: "",
      instagramUrl: "",
      threadsUrl: "",
      githubUrl: "",
    },
  });

  const { data: userProfile, error } = useGetFetcher<UserProfileResponse>(
    ["user"],
    `/public/profile`,
  );
  const { reset } = methods;

  useEffect(() => {
    if (!userProfile) return;
    const profile = userProfile.user;

    reset({
      userName: profile.userName ?? "",
      profileIcon: profile.profileIcon ?? "",
      xUrl: profile.xUrl ?? "",
      instagramUrl: profile.instagramUrl ?? "",
      threadsUrl: profile.threadsUrl ?? "",
      githubUrl: profile.githubUrl ?? "",
    });
  }, [userProfile, reset]);

  const { mutate: upDateProfile, isPending: isUpdating } = usePut<
    Profile,
    UpdateUserProfile
  >(`/admin/profile`);

  if (error) {
    return <p className="text-red-500">データ取得に失敗しました。</p>;
  }

  if (!userProfile) {
    return <p>データがありません。</p>;
  }

  const handleStartEdit = () => {
    setMode("Edit");
  };

  const handleCancel = () => {
    methods.reset();
    setMode("View");
  };

  const handleSave = (profileValue: Profile) => {
    upDateProfile(profileValue, {
      onSuccess: (response) => {
        toast.success(response.message);
        setMode("View");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: () => {
        toast.error("プロフィールの更新に失敗しました。");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSave)}>
        <div className="mx-auto flex max-w-[800px] flex-col gap-10">
          <Link href="/errorLogList">
            <span className="text-xl text-[#1e90ff] ">← 一覧に戻る</span>
          </Link>
          {mode === "View" ? (
            <ProfileView
              profile={userProfile.user}
              onEditClick={handleStartEdit}
            />
          ) : (
            <ProfileEditForm onCancel={handleCancel} isUpdating={isUpdating}/>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
