import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
};

export const ServiceCard = ({
  title,
  image,
  imageAlt,
  link,
}: ServiceCardProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <div className="aspect-square relative">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4">
          {title}
        </h3>
        <Link
          href={link}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
        >
          <span className="sr-only">Learn more about {title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};
