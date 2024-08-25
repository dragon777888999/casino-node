import Image from "next/image";

export default function ProviderPannel() {
    return (<div className="mt-10">
        <div className="sub-title ">
            <Image
                src="/images/icon/provider.png"
                alt="Project Thumbnail"
                width={28}
                height={28}
            />
            <span className="ml-3">Provider</span>
        </div>
        {/* <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5"></div> */}

        <div className="games-block ">
            <div className="games-block-item ">
                <div className="custom-procard mt-2 p-1 ">
                    <a>
                        <Image
                            src="/images/provider/spribe.svg" // Path relative to the public directory
                            alt="Logo"
                            width={80} // Adjust width
                            height={80} // Adjust height
                        />
                    </a>
                </div>
            </div>
            <div className="games-block-item ">
                <div className="custom-procard mt-2 p-1 ">
                    <a>
                        <Image
                            src="/images/provider/croco.svg" // Path relative to the public directory
                            alt="Logo"
                            width={80} // Adjust width
                            height={80} // Adjust height
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
}