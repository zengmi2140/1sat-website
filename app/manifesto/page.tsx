import SharedLayout from "@/components/shared-layout";
import ManifestoView from "@/components/manifesto-view";

export const metadata = {
  title: "Manifesto | 亿聪哲史",
  description: "亿聪哲史的宣言与理念",
};

export default function ManifestoPage() {
  return (
    <SharedLayout>
      <ManifestoView />
    </SharedLayout>
  );
}
