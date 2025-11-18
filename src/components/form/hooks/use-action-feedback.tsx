import { useEffect, useEffectEvent } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void;
  onError?: (args: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {

  const handleFeedback = useEffectEvent((state: ActionState, options: UseActionFeedbackOptions) => {
    if (state.status === "SUCCESS") {
      options.onSuccess?.({ actionState: state });
    } else if (state.status === "ERROR") {
      options.onError?.({ actionState: state });
    }
  });

  useEffect(() => {
    if (!actionState) return
    handleFeedback(actionState, options);
  }, [actionState]);
};

export { useActionFeedback };
