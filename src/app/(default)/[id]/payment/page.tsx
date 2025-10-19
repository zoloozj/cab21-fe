import ChoosePaymentMethod from "@/sections/payment/choose-payment-method";

interface Props {
  params: {
    id: string;
  };
}

export default function PaymentPage({ params: { id } }: Props) {
  return <ChoosePaymentMethod driverId={id} />;
}
