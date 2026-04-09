"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Membership } from "@prisma/client";
import { updateMembershipRole } from "@/features/membership/actions/update-membership-role";
import { MembershipRole } from "@prisma/client";
import { BasicUser } from "@/features/membership/components/membership-item";

type UpdateMembershipRoleButtonProps = {
  trigger: React.ReactNode;
  membership: Membership & { User: BasicUser };
};

const UpdateMembershipRoleButton = ({
  membership,
  trigger,
}: UpdateMembershipRoleButtonProps) => {
  const router = useRouter();

  const handleUpdateMembershipRole = async (role: string) => {
    const promise = updateMembershipRole(
      membership.organizationId,
      membership.userId,
      role as MembershipRole,
    );
    toast.promise(promise, {
      loading: "Updating membership role...",
    });
    const result = await promise;
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Role</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={membership.membershipRole}
            onValueChange={handleUpdateMembershipRole}
          >
            <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="MEMBER">Member</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UpdateMembershipRoleButton };
