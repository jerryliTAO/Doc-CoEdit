import router from "@/router";
interface result {
  status: string;
  msg?: string;
  data?: string;
}
export const unauthenticate = (result: result, t: Function) => {
  // remove token and userId in localStorage
  localStorage.clear();
  alert(t("singInExpired"));
  router.replace("/");
};
