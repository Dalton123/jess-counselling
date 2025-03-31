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
    <div className="group relative overflow-hidden rounded-4xl after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-gradient-to-t after:from-teal-500 after:to-teal-300 after:opacity-0 after:transition-all after:duration-500 after:ease-in-out after:hover:scale-105 hover:after:opacity-30">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-1 p-8">
        <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
          {title}
        </h3>
        <Link
          href={link}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 hover:bg-white/30"
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
