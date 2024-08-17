import Link from "next/link";

export default function LoginButton() {
  return (
    <ul className="flex items-center gap-2 2xsm:gap-4">
      <li>
        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-3 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <p>Log in</p>
        </Link>
      </li>
      <li>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-3 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <p> Register</p>
        </Link>
      </li>
    </ul>
  );
}
