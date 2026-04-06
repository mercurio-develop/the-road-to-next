import { Organization, Membership } from "@prisma/client";

export type OrganizationWithMembers = Organization & {
  memberships: (Membership & {
    User: {
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  })[];
};

export type OrganizationListItem = Organization & {
  _count: {
    memberships: number;
  };
  membershipByUser: Membership;
};