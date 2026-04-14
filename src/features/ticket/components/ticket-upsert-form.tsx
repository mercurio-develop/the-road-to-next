"use client";
import { Ticket } from "@prisma/client";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState, useRef, useCallback } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import {
  ImperativeHandleFromDatePicker,
} from "@/components/date-picker";
import { TicketUpsertFormFields } from "@/features/ticket/components/ticket-upsert-form-fields";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerImperativeHandleRef = useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = useCallback(() => {
    datePickerImperativeHandleRef.current?.reset();
  }, []);

  const title = actionState.payload?.get("title") as string | undefined;
  const content = actionState.payload?.get("content") as string | undefined;
  const deadline = actionState.payload?.get("deadline") as string | undefined;
  const bounty = actionState.payload?.get("bounty") as string | undefined;

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <TicketUpsertFormFields
        ticket={ticket}
        title={title}
        content={content}
        deadline={deadline}
        bounty={bounty}
        fieldErrors={actionState.fieldErrors}
        datePickerImperativeHandleRef={datePickerImperativeHandleRef}
      />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
