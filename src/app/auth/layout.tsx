import Image from "next/image";
import ToggleLoginRegisterBtn from "./components/toggle-login-register-btn";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <section className="h-full flex flex-col items-center justify-evenly">
        <Image
          src="/assets/logo2.svg"
          width={300}
          height={200}
          alt="Аваад явъя"
        />
        {children}
        <ToggleLoginRegisterBtn />
      </section>
    </div>
  );
}
