// Root page that redirects to the main dashboard

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
