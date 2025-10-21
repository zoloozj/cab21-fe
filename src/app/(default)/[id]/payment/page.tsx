import ChoosePaymentMethod from "@/sections/payment/choose-payment-method";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  return <ChoosePaymentMethod id={id} />;
}
