import Link from 'next/link';

export interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

/**
 * Presentational card used on the services overview page. Each card
 * summarizes a service and links to its dedicated page.
 */
export default function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="rounded-xl bg-gray-800/60 backdrop-blur p-6 shadow-lg transition hover:bg-gray-800/80">
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
      <Link
        href={href}
        className="inline-block text-primary-light font-medium hover:underline"
        prefetch={false}
      >
        Learn more →
      </Link>
    </div>
  );
}