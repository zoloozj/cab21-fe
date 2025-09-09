import Image from "next/image";
import ToggleLoginRegisterBtn from "./components/toggle-login-register-btn";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <section className="h-full flex flex-col items-center justify-center -mt-28">
        <Image
          src="/assets/logo.png"
          width={250}
          height={200}
          alt="Аваад явъя"
          className="md:w-60"
        />
        {children}
        <ToggleLoginRegisterBtn />
      </section>
    </div>
  );
}
