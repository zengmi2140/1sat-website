import { notFound } from "next/navigation";
import { getAllEpisodes } from "@/lib/episodes";
import SharedLayout from "@/components/shared-layout";
import EpisodeDetail from "@/components/episode-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const episodes = getAllEpisodes();
  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) {
    return {
      title: "Episode Not Found | 亿聪哲史",
    };
  }

  return {
    title: `${episode.id}: ${episode.title} | 亿聪哲史`,
    description: episode.summary,
  };
}

export async function generateStaticParams() {
  const episodes = getAllEpisodes();
  return episodes.map((episode) => ({
    id: episode.id,
  }));
}

export default async function EpisodePage({ params }: PageProps) {
  const { id } = await params;
  const episodes = getAllEpisodes();
  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) {
    notFound();
  }

  return (
    <SharedLayout>
      <EpisodeDetail episode={episode} />
    </SharedLayout>
  );
}
