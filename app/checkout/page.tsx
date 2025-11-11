import CheckoutForm from './CheckoutForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CheckoutPage({ searchParams }: PageProps) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined;

  return <CheckoutForm error={error} />;
}
