"use client";

import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker, ImperativeHandleFromDatePicker } from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { fromCent } from "@/utils/currency";
import { Ticket } from "@prisma/client";

type TicketUpsertFormFieldsProps = {
  ticket?: Ticket;
  title?: string;
  content?: string;
  deadline?: string;
  bounty?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  datePickerImperativeHandleRef: React.RefObject<ImperativeHandleFromDatePicker>;
};

const TicketUpsertFormFields = memo(
  ({
    ticket,
    title,
    content,
    deadline,
    bounty,
    fieldErrors,
    datePickerImperativeHandleRef,
  }: TicketUpsertFormFieldsProps) => {
    return (
      <>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={title ?? ticket?.title}
        />
        <FieldError error={fieldErrors?.["title"]?.[0]} />
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={content ?? ticket?.content}
        />
        <FieldError error={fieldErrors?.["content"]?.[0]} />
        <div className="flex gap-x-2 mb-1">
          <div className="w-1/2">
            <Label htmlFor="deadline">Deadline</Label>
            <DatePicker
              id="deadline"
              name="deadline"
              imperativeHandlerRef={datePickerImperativeHandleRef}
              defaultValue={deadline ?? ticket?.deadline}
            />
            <FieldError error={fieldErrors?.["deadline"]?.[0]} />
          </div>
          <div className="w-1/2">
            <Label htmlFor="bounty">Bounty ($)</Label>
            <Input
              id="bounty"
              name="bounty"
              type="number"
              step=".01"
              defaultValue={bounty ?? (ticket?.bounty ? fromCent(ticket.bounty) : "")}
            />
            <FieldError error={fieldErrors?.["bounty"]?.[0]} />
          </div>
        </div>
      </>
    );
  },
);

TicketUpsertFormFields.displayName = "TicketUpsertFormFields";

export { TicketUpsertFormFields };
