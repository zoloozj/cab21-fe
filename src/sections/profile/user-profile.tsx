import { getCurrentUser } from "@/lib/auth";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import UserCab from "@/sections/profile/user-cab";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/sections/profile/user-info";
import EditUserModal from "./edit-user-modal";

export default async function UserProfile() {
  const user = await getCurrentUser();
  console.log(user, "USER");
  function dateString(date?: number) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  return (
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto mt-5 lg:mt-10">
      {user ? (
        <>
          <Card className="p-4">
            <div className="w-full flex gap-2 justify-between">
              <h2 className="text-lg font-semibold text-primary">
                {user.lastName?.charAt(0)}. {user.firstName}
              </h2>
              <EditUserModal userId={user.id} />
            </div>
            <Separator />
            <UserInfo label="Хэрэглэгчийн нэр" value={user.username} />
            <UserInfo label="И-Мэйл" value={user.email} />
            <UserInfo label="Төрсөн огноо" value={dateString(user.birthday)} />
            <UserInfo label="Регистрийн дугаар" value={user.registryNumber} />
            <UserInfo label="Утасны дугаар" value={user.phone} />
          </Card>
          <UserCab userId={user.id} />
        </>
      ) : (
        <Card className="text-lg text-muted-foreground p-4 text-center">
          Хэрэглэгчийн мэдээлэл олдсонгүй!
        </Card>
      )}
    </div>
  );
}
