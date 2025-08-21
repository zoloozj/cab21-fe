import Header from "@/components/layout/header";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
}
