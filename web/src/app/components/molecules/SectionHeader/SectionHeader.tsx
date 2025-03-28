import { Button } from "@atoms/Button/Button";

type SectionHeaderProps = {
  label: string;
  title: string;
  styledTitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
};

export const SectionHeader = ({
  label,
  title,
  styledTitle,
  viewAllLink,
  viewAllText = "VIEW ALL",
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-12">
      <div>
        <p className="text-blue-600 mb-3 tracking-wider text-sm">
          / {label.toUpperCase()} /
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          {title}
          {styledTitle && (
            <span className="block font-serif italic font-medium mt-1">
              {styledTitle}
            </span>
          )}
        </h2>
      </div>
 
      {viewAllLink && (
        <Button
          href={viewAllLink}
        >
          {viewAllText}
        </Button>
      )}
    </div>
  );
};
