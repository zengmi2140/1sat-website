import { getAllGuests } from "@/lib/guests";
import SharedLayout from "@/components/shared-layout";
import NodesView from "@/components/nodes-view";

export const metadata = {
  title: "Nodes | 亿聪哲史",
  description: "主持人和嘉宾信息",
};

export default async function NodesPage() {
  const guests = await getAllGuests();

  return (
    <SharedLayout>
      <NodesView guests={guests} />
    </SharedLayout>
  );
}
