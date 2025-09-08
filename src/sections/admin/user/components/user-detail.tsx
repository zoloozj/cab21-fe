import { UserDetail } from "@/sections/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RideInfo } from "@/sections/filter-ride/components/ride-card";
import { useCallback, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  user: UserDetail;
  cab?: boolean;
  inactive?: boolean;
}

export default function UserDetailPage({ cab, user, inactive }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: any) => {
      const res = await axios.put("/api/req", body);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error("Алдаа гарлаа та дахин оролдоно уу!");
    },
  });
  const handleDeactive = useCallback(async () => {
    mutation.mutate({ serviceUrl: `api/user/${user.id}/deactivate` });
  }, [user]);
  const handleReactive = useCallback(async () => {
    mutation.mutate({ serviceUrl: `api/user/${user.id}/reactivate` });
  }, [user]);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">Дэлгэрэнгүй</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.last_name} {user.first_name}
          </DialogTitle>
          {/* <DialogDescription> */}
          <RideInfo label="Гар утас" value={user.phone} />
          <RideInfo label="Мэйл хаяг" value={user.email} />
          <RideInfo label="Регистрийн дугаар" value={user.registry_number} />
          <RideInfo label="Системд нэгдсэн огноо" value={user.created_at} />
          {cab && (
            <>
              <h3 className="text-lg leading-none font-semibold">
                Автомашины мэдээлэл
              </h3>
              <RideInfo label="Төрөл" value={user.cab_model} />
              <RideInfo label="Улсын дугаар" value={user.cab_plate} />
              <RideInfo
                label="Суудлын багтаамж"
                value={user.cab_passenger_seat}
              />
            </>
          )}
          {/* </DialogDescription> */}
        </DialogHeader>
        {!inactive ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeactive}
            disabled={mutation.isPending}
          >
            Хэрэглэгчийн бүртгэлийг идэвхгүй болгох
          </Button>
        ) : (
          <Button type="button" variant="secondary" onClick={handleReactive}>
            Хэрэглэгчийн бүртгэлийг сэргээх
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
