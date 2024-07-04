import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const dispatch = useDispatch();

  const [loading, isLoading] = useState(true);

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");

      if (!currentUser) return;

      const userResponse = await axiosInstance.get("/users/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          email: userResponse.data.email,
          id: userResponse.data.id,
          role: userResponse.data.role,
        },
      });
    } catch (error) {
      console.log("🚀 ~ hydrateAuth ~ error:", error);
    } finally {
      isLoading(false);
    }
  };
  useEffect(() => {
    hydrateAuth();
  });

  return {
    loading,
  };
};
