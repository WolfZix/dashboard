import { ArrowLeft, ArrowRight } from "lucide-react";

type UsersPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number;
};

export default function UsersPagination({
  page,
  setPage,
  pages,
}: UsersPaginationProps) {
  return (
    <div className="usersPagination">
      <button
        className="flex justify-center items-center"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
      >
        <ArrowLeft />
      </button>

      {Array.from({
        length: pages,
      }).map((_, index) => (
        <button
          key={index}
          onClick={() => setPage(index)}
          className={page === index ? "activePage" : ""}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="flex justify-center items-center"
        onClick={() => setPage((prev) => Math.min(prev + 1, pages - 1))}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
