import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../lib/api.js";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });
  return { isPending, signupMutation };
};
