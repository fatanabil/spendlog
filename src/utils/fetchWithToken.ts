import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";
import { API_BASE_URL } from "./constant";

const refreshToken = async (): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/refresh-token`,
      {},
      { withCredentials: true },
    );

    const newAccessToken = res.data.data.accessToken;
    useAuthStore.getState().setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    useAuthStore.getState().logout();
    return null;
  }
};

export const fetchWithToken = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const { accessToken } = useAuthStore.getState();

  try {
    const res = await axios({
      ...config,
      baseURL: API_BASE_URL,
      headers: {
        ...config.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.warn("Access token is expired, refreshing ...");

        const newAccessToken = await refreshToken();
        if (!newAccessToken) {
          throw error;
        }

        return fetchWithToken({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }

      throw error;
    }
    throw error;
  }
};
