interface Props {
  id: string;
}

export default function ChoosePaymentMethod({ id }: Props) {
  return (
    <div className="w-full px-4 xl:max-w-7xl xl:mx-auto">
      Choose Payment Method for {id}
    </div>
  );
}
