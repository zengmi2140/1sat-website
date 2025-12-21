"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import SharedLayout from "./shared-layout";
import EpisodeList from "./episode-list";

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  category: string;
  hosts: string[] | string;
  tags: string[];
  summary: string;
  takeaways?: string[];
  content?: string;
  slug?: string;
  audioUrl?: string;
}

interface HomePageProps {
  episodes: Episode[];
}

export default function HomePage({ episodes = [] }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(episodes, {
      keys: [
        { name: "title", weight: 0.3 },
        { name: "tags", weight: 0.25 },
        { name: "content", weight: 0.25 },
        { name: "hosts", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    if (!searchTerm.trim()) {
      return episodes;
    }
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [searchTerm, fuse, episodes]);

  return (
    <SharedLayout
      showSearch={true}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchResultCount={filteredEpisodes.length}
    >
      <EpisodeList episodes={filteredEpisodes} />
    </SharedLayout>
  );
}
