import CabRegisterForm from "@/sections/auth/register/cab/cab-register-form";

interface Props {
  params: { id: string };
}

export default function CabRegisterPage({ params: { id } }: Props) {
  return <CabRegisterForm id={id} />;
}
