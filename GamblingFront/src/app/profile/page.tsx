"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import TimeZoneSelector from "./timeZoneSelector";
import { useAppContext } from "@/hooks/AppContext";
import { Switch } from "@nextui-org/react";
import { timeZonesData } from "@/anchor/global";
import { backendUrl } from "@/anchor/global";

const Profile = () => {
  const { userInfo, setUserInfo, walletAddress, loginStep, accessToken, siteInfo } = useAppContext();
  const [nickName, setNickName] = useState(userInfo.nickName);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [showNickNameEditModal, setShowNickNameEditModal] = useState(false);
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (loginStep < 3)
      return router.push("/");
  }, []);

  const openNickNameEditModal = () => {
    setShowNickNameEditModal(true);
  };

  const closeNickNameEditModal = () => {
    setShowNickNameEditModal(false);
  };
  const onVisit = ()=>{
    window.open(siteInfo.treasuryWalletAddressUrl);
  };

  const openAvatarEditModal = () => {
    setShowAvatarEditModal(true);
  };

  const closeAvatarEditModal = () => {
    setShowAvatarEditModal(false);
  };

  const [timeZone, setTimeZone] = useState("UTC -07:00");
  const [isCurrentZone, setIsCurrentZone] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(e.target.value);
  };

  const handleToggle = () => {
    setIsCurrentZone(!isCurrentZone);
  };
  const updateNickName = async () => {
    const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": accessToken,
      },
      body: JSON.stringify({
        method: "UpdateNickName",
        nickName: nickName
      }),
    });
    const result = await response.json();
    if (result.status != 0) {
      toast.error(result.msg);
      return;
    }
    setUserInfo({
      ...userInfo,
      nickName: nickName,
    });
    toast.success(
      `Success`,
    );
  }
  const updateAvatar = async () => {
    if (!selectedFile) {
      setErrorMessage('No file selected');
      return;
    }

    setUploading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const result = await response.json();
      setAvatarUrl(result.filePath); // Assuming your API returns the uploaded file's path
      alert('Avatar uploaded successfully!');
    } catch (error) {
      toast.error('Error uploading avatar');
    } finally {
      setUploading(false);
      toast.success(
        `Success`,
      );
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      },
    );
  };
  let avatarImgUrl = "/default/images/custom/user-Img.png";
  return (
    <>
      <div className="mx-auto ">
        {/* <div className="overflow-hidden rounded-sm border border-stroke  dark:border-strokedark dark:bg-boxdark"> */}
        <div className="profile-card">
          <div className="card-title">
            <div className="card-title-inner">
              <span>Profile</span>
            </div>
          </div>
          <div className="card-content">
            <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Nickname</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">{userInfo.nickName}</div>
                </div>
                <div className="card-detail-row-content-right">
                  <button
                    className="card-detail-row-content-right-inner"
                    onClick={openNickNameEditModal}
                  >
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Avatar</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">
                    {" "}
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={32}
                      height={32}
                      src={avatarImgUrl}
                      alt="Logo"
                      priority
                    />
                  </div>
                </div>
                <div className="card-detail-row-content-right">
                  <button
                    className="card-detail-row-content-right-inner"
                    onClick={openAvatarEditModal}
                  >
                    <i
                      className="fa-sharp fa-solid fa-copy"
                      style={{
                        height: "12px",
                        marginRight: "5px",
                        width: "12px",
                      }}
                    ></i>
                     <i className="fa-regular fa-copy" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

            </div> */}
            <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Wallet</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">
                    <p>{walletAddress}</p>
                  </div>
                </div>
                <div className="card-detail-row-content-right">
                  <button
                    className="card-detail-row-content-right-inner"
                    onClick={handleCopy}
                  >
                    {/* <i
                      className="fa-sharp fa-solid fa-copy"
                      style={{
                        height: "12px",
                        marginRight: "5px",
                        width: "12px",
                      }}
                    ></i> */}
                    {/* <i className="fa-regular fa-copy" /> */}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Treasury Wallet</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">
                    <p>{siteInfo.treasuryWalletAddress}</p>
                  </div>
                </div>
                <div className="card-detail-row-content-right">
                  <button
                    className="card-detail-row-content-right-inner"
                    onClick={onVisit}
                  >
                    {/* <i
                      className="fa-sharp fa-solid fa-copy"
                      style={{
                        height: "12px",
                        marginRight: "5px",
                        width: "12px",
                      }}
                    ></i> */}
                    <span>Visit</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Email</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">khk</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="profile-card">
          <div className="card-title">
            <div className="card-title-inner">
              <span>Regional Settings</span>
            </div>
          </div>
          <div className="card-content">
            <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Time Zone</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">
                    <div
                      className="timezone-selector sm:gap-5"
                      style={{
                        borderRadius: "5px",
                      }}
                    >
                      <div>
                        <label>{timeZone}</label>
                      </div>

                      {!isHidden && (
                        <div className="select-wrapper">
                          <select
                            value={timeZone}
                            onChange={handleTimeZoneChange}
                            disabled={isCurrentZone}
                          >
                            {timeZonesData.map((tz) => (
                              <option key={tz} value={tz}>
                                {tz}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="gap-2">
                        <Switch
                          size="sm"
                          isSelected={isSelected}
                          onValueChange={() => {
                            setIsSelected(!isSelected);
                            handleToggle();
                            setIsHidden(true);
                          }}
                        >
                          <label style={{ color: "#89899f" }}>
                            Current Time Zone
                          </label>
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-detail-row-content-right">
                  <button
                    className="card-detail-row-content-right-inner"
                    onClick={() => setIsHidden(!isHidden)}
                  >
                    <span>{isHidden ? `Edit` : `Cancel`}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <div className="card-title">
            <div className="card-title-inner">
              <span>Link Account</span>
            </div>
          </div>
          <div className="card-content">
            <div className="card-detail-row">
              <div className="card-detail-row-title">
                <span>Telegram</span>
              </div>
              <div className="card-detail-row-content">
                <div className="card-detail-row-content-left">
                  <div className="card-detail-row-content-left-inner">khk</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Modal
        id="modal"
        className="modal"
        isOpen={showNickNameEditModal}
        onRequestClose={closeNickNameEditModal}
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
              {/* <div className="border-blueGray-200 items-start justify-between rounded-t ">
                <div className="row">
                  <button
                    className="wallet-adapter-modal-button-close"
                    style={{ right: "10px", top: "11px" }}
                    onClick={() => {
                      updateNickName();
                      closeModal();
                    }}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
              </div> */}
              <div
                className="jusfity-start flex pb-8"
                style={{ minWidth: "350px" }}
              >
                <h1
                  style={{ color: "#fff", fontWeight: "700", fontSize: "20px" }}
                >
                  Change Nickname
                </h1>
              </div>
              <div className="flex w-full justify-start">
                <input
                  className="w-full rounded  bg-gray py-3 pl-7.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  style={{ background: "rgb(28 36 52)", color: "white" }}
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder=""
                  defaultValue=""
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full">
                <button
                  className="card-detail-row-content-right-inner h-5 w-full"
                  style={{
                    height: "40px",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "50px",
                  }}
                  onClick={() => {
                    updateNickName();
                    closeNickNameEditModal();
                  }}
                >
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </Modal>
      <Modal
        id="modal"
        className="modal"
        isOpen={showAvatarEditModal}
        onRequestClose={closeAvatarEditModal}
        contentLabel="Avatar Modal"
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
              {/* <div className="border-blueGray-200 items-start justify-between rounded-t ">
                <div className="row">
                  <button
                    className="wallet-adapter-modal-button-close"
                    style={{ right: "10px", top: "11px" }}
                    onClick={() => {
                      updateNickName();
                      closeModal();
                    }}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
              </div> */}
              <div
                className="jusfity-start flex pb-8"
                style={{ minWidth: "350px" }}
              >
                <h1
                  style={{ color: "#fff", fontWeight: "700", fontSize: "20px" }}
                >
                  Change Avatar
                </h1>
              </div>
              <div className="flex w-full justify-start">
                <input
                  className="w-full rounded  bg-gray py-3 pl-7.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  style={{ background: "rgb(28 36 52)", color: "white" }}
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder=""
                  defaultValue=""
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full">
                <button
                  className="card-detail-row-content-right-inner h-5 w-full"
                  style={{
                    height: "40px",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "50px",
                  }}
                  onClick={() => {
                    updateAvatar();
                    closeAvatarEditModal();
                  }}
                >
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </Modal>

      {/* </div> */}
    </>
  );
};

export default Profile;
