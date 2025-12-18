import { getAllEpisodes } from "@/lib/episodes"
import { getAllGuests } from "@/lib/guests"
import ClientPage from "@/components/client-page"

export default async function Page() {
  const episodes = await getAllEpisodes()
  const guests = await getAllGuests()

  return <ClientPage episodes={episodes} guests={guests} />
}
