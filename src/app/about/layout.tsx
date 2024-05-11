import Header from "@/components/Header";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto w-full text-zinc-200">
      <Header />
      {children}
    </div>
  );
}
