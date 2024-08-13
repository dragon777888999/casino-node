import Image from "next/image";

const Footer = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <div className="mx-auto block max-w-screen-2xl">
      <div className="flex justify-center">
        <Image
          width={176}
          height={32}
          src={"/images/logo/logo.svg"}
          alt="Logo"
          priority
        />
      </div>

      <div className="footer-container">
        <div className="flex ">
          <a href="">
            <img src="/images/project/discord.png" alt="Discord" />
          </a>
          <a href="">
            <img src="/images/project/fg.png" alt="Twitter" />
          </a>
          <a href="">
            <img src="/images/project/twitter.png" alt="Twitter" />
          </a>
        </div>
        <p className="flex justify-center">{`© 2024 . All rights reserved.`}</p>
      </div>
    </div>
  );
};
export default Footer;
