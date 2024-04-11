import { initialPageLoad } from "@/utils/initialPageLoad";

export default async function Home() {
  await initialPageLoad();

  return <div>Home page</div>;
}
