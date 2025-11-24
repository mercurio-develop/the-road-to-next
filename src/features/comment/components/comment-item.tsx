import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent, CardFooter,
} from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/app/paths";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { Prisma} from ".prisma/client";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{ include: { user: {select:{username:true}} } }>;
  isDetail?: boolean;
};

const CommentItem = async ({ comment, isDetail }: CommentItemProps) => {

  const { user } = await getAuth()
  const isCommentOwner = isOwner(user,comment)

  // const detailButton = (
  //   <Button asChild variant="outline" size="icon">
  //     <Link prefetch href={ticketPath(comment.id)}>
  //       <LucideSquareArrowOutUpRight className="h-4 w-4" />
  //     </Link>
  //   </Button>
  // );
  //
  // const editButton = isCommentOwner && (
  //   <Button asChild variant="outline" size="icon">
  //     <Link prefetch href={ticketEditPath(comment.id)}>
  //       <LucidePencil />
  //     </Link>
  //   </Button>
  // );
  //
  // const moreMenu =isCommentOwner &&  (
  //   <CommentMoreMenu
  //     ticket={comment}
  //     trigger={
  //       <Button size="icon" variant="outline">
  //         <LucideMoreVertical className="h-4 w-4" />
  //       </Button>
  //     }
  //   />
  // );
  console.log(comment)
  return (
    <div
      className={"w-full flex gap-x-1 max-w-[580px]"}
    >
      <Card key={comment.id} className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <Avatar>
              <AvatarFallback>{comment.user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="ml-1 text-lg">{comment.user.username}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="ml-6" >
          <p
            className="bg-input p-5 border-2 rounded-2xl"
          >
            {comment.content}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground ml-auto">Created - {format(comment.createdAt, "yyyy-MM-dd")}</p>
        </CardFooter>
      </Card>
      {/*<div className="flex flex-col gap-y-1">*/}
      {/*  {isDetail ? (*/}
      {/*    <>*/}
      {/*      {editButton}*/}
      {/*      {moreMenu}*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <>*/}
      {/*      {detailButton}*/}
      {/*      {editButton}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export { CommentItem };
