import Image from "next/image";

const Footer = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <div className="mx-auto block max-w-screen-2xl">
      <div className="flex justify-center">
        <Image
          width={170}
          height={60}
          src={"/images/logo/logo.svg"}
          alt="Logo"
          priority
        />
      </div>

      <div className="footer-container">
        <div className="mt-10 block">
          <div className="mt-10 flex justify-center">
            <p className="" style={{ fontSize: "30px" }}>
              Join our Community
            </p>
          </div>

          <div className="my-10 flex gap-4">
            <a
              className="telegram"
              href="https://t.me/bcgamewin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/telegram.png"}
                alt="telegram"
                priority
              />
            </a>
            <a
              className="github"
              href="https://github.com/bcgame-project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/github.png"}
                alt="github"
                priority
              />
            </a>
            <a
              className="twitter"
              href="https://twitter.com/BCGameOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/twitter.png"}
                alt="twitter"
                priority
              />
            </a>
            <a
              className="facebook"
              href="https://www.facebook.com/bcgameofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/facebook.png"}
                alt="facebook"
                priority
              />
            </a>
            <a
              className="discord"
              href="https://discord.gg/xqUMQesZQq"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/discord.png"}
                alt="discord"
                priority
              />
            </a>
            <a
              className="bitcoin"
              href="https://bitcointalk.org/index.php?topic=5088875.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/bitcoin.png"}
                alt="bitcoin"
                priority
              />
            </a>
            <a
              className="instagram"
              href="https://instagram.com/bcgamecom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/instagram.png"}
                alt="instagram"
                priority
              />
            </a>
            <a
              className="reddit"
              href="https://www.reddit.com/r/bcgamecom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/reddit.png"}
                alt="reddit"
                priority
              />
            </a>
            <a
              className="global-tele"
              href="/telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={60}
                height={60}
                src={"/images/join/global-tele.png"}
                alt="global-tele"
                priority
              />
            </a>
          </div>
        </div>
        <p className="flex justify-center">{`© 2024 . All rights reserved.`}</p>
      </div>
    </div>
  );
};
export default Footer;
