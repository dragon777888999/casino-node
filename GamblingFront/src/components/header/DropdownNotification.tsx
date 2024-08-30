import { useState, useEffect } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NotifyInfo } from "@/types/notifyInfo";
import Modal from "react-modal";
import { info } from "console";
import { NotifyInfoContent } from "@/types/notifyInfo";
interface Props {
  info: NotifyInfo[] | null;
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const { accessToken, userInfo } = useAppContext();
  const [notifyData, setNofityData] = useState<NotifyInfo[]>([]);
  const [seletedData, setSeletedData] = useState<NotifyInfoContent>();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const openModal = (id: number) => {
    GetNotifyContent(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const GetNotify = async () => {
    try {
      if (accessToken == "") return;
      // alert(accessToken);
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",

        headers: {
          "X-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GetUnreadNoticeList",
        }),
      });

      console.log("userinfo", userInfo.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === 0) {
        if (result.length > 0) {
          setNotifying(true);
          setNofityData(result.data);
        }
        console.log("notify", result);
        toast.success("success");
      } else {
        toast.warn("Operation failed");
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      console.log(Response);
    }
  };
  const GetNotifyContent = async (id: number) => {
    try {
      if (accessToken == "") return;
      // alert(accessToken);
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",

        headers: {
          "X-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "ReadNotice",
          id: id,
        }),
      });

      console.log("userinfocontent", userInfo.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === 0) {
        setSeletedData(result.data);
        console.log("notifycontentt", result.data);
        toast.success("success:fetch data");
      } else {
        toast.warn("Operation failed");
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      console.log(Response);
    }
  };
  useEffect(() => {
    GetNotify();
  }, [accessToken]);
  console.log("notify", notifyData);
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
              fill=""
            />
          </svg>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              {Array.isArray(notifyData) ? (
                notifyData.map((info, index) => (
                  <li>
                    <Link
                      onClick={() => {
                        openModal(info.id);
                      }}
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          {info?.title}
                        </span>{" "}
                      </p>

                      <p className="flex justify-end text-xs">
                        {info.createdAt}
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="flex justify-center">
                  No notifications available
                </p>
              )}
            </ul>
          </div>
        )}
      </li>
      <Modal
        id="modal"
        className="modal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {" "}
        <div className="wallet-adapter-modal wallet-adapter-modal-fade-in">
          <div className=" wallet-adapter-modal-container">
            {/*content*/}
            <div
              className="wallet-adapter-modal-wrapper"
              style={{ maxWidth: "fit-content" }}
            >
              {/*header*/}{" "}
              <div className="border-blueGray-200 items-start justify-between rounded-t ">
                <div className="row">
                  <button
                    className="wallet-adapter-modal-button-close"
                    style={{ right: "10px", top: "11px" }}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className="jusfity-start flex pb-3"
                style={{ minWidth: "350px" }}
              >
                <h1
                  style={{ color: "#fff", fontWeight: "700", fontSize: "20px" }}
                >
                  {seletedData?.title}
                </h1>
              </div>
              <div className="flex w-full break-words">
                <p style={{ maxWidth: "350px" }}>{seletedData?.content}</p>
              </div>
              <div className="flex w-full justify-end">
                <p>{seletedData?.createdAt}</p>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </Modal>
    </ClickOutside>
  );
};

export default DropdownNotification;
