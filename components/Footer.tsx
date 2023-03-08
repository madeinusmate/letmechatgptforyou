import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div className="flex space-x-4 pb-4 sm:pb-0">
        Made with ❤️ by
        <a
          href="https://twitter.com/madeinusmate"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          {" "}
          @madeinusmate.
        </a>
      </div>
    </footer>
  );
}
