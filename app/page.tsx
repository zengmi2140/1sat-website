import { getAllEpisodes } from "@/lib/episodes";
import HomePage from "@/components/home-page";

export default async function Page() {
  const episodes = await getAllEpisodes();

  return <HomePage episodes={episodes} />;
}
