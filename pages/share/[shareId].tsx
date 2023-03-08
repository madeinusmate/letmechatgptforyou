import React, { useEffect } from "react";
import Avatar from "boring-avatars";
import { Button } from "../../components/Button";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Typed from "react-typed";
import Head from "next/head";

const ChatGPT = () => {
  const router = useRouter();
  let { shareId } = router.query;

  const [firestoreDocument, setFirestoreDocument] = useState({
    userRequest: "",
    agentResponse: "",
  });

  const fetchDocument = async () => {
    if (shareId) {
      const docRef = doc(db, "ChatGPTRequests", shareId.toString());
      const data = await (await getDoc(docRef)).data();
      if (data) {
        const userRequest = data.userRequest.toString();
        const agentResponse = data.agentResponse.toString();
        setFirestoreDocument({
          userRequest,
          agentResponse,
        });
      }
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [shareId]);

  const [requestTyped, setRequestTyped] = useState(false);
  const [requestDisplayed, setRequestDisplayed] = useState(false);
  const [responseDisplayed, setResponseDisplayed] = useState(false);
  const [bannerDisplayed, setBannerDisplayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRequestTyped(true);
      setRequestDisplayed(true);
    }, 3000);
    setTimeout(() => {
      setResponseDisplayed(true);
    }, 6000);
    setTimeout(() => {
      setBannerDisplayed(true);
    }, 9000);
  }, [shareId]);

  const InputMessage = () => (
    <div className="mt-6 flex clear-both ">
      <p
        aria-label="chat input"
        className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      >
        {!requestTyped && (
          <Typed strings={[firestoreDocument.userRequest]} typeSpeed={10} />
        )}
      </p>

      <Button type="submit" className="ml-4 flex-none">
        <a href="https://chat.openai.com/">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4 mr-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </a>
      </Button>
    </div>
  );

  return (
    <>
      <Head>
        <title>Let Me ChatGPT For You</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="next-head-count" content="3" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content="Let Me ChatGPT For You is for all those people that find it more convenient to bother you with their questions than to ask ChatGPT for themselves. 😜"
        />
        <meta property="og:title" content="Let Me ChefGPT For You" />

        <meta
          property="og:description"
          content="Let Me ChatGPT For You is for all those people that find it more convenient to bother you with their questions than to ask ChatGPT for themselves. 😜"
        />
        <meta property="og:url" content="https://www.letmechatgptforyou.com" />
      </Head>
      <div className=" bg-zinc-700 flex justify-center h-screen">
        <div className="sm:w-1/2 ">
          <div className="flex flex-row align-middle py-8 justify-center text-white text-2xl font-bold lg:text-4xl">
            <svg
              data-name="OpenAI Logo"
              width="36px"
              height="36px"
              viewBox="140 140 520 520"
            >
              <defs>
                <linearGradient id="linear" x1="100%" y1="22%" x2="0%" y2="78%">
                  <stop offset="0%" stop-color="rgb(131,211,231)"></stop>
                  <stop offset="2%" stop-color="rgb(127,203,229)"></stop>
                  <stop offset="25%" stop-color="rgb(86,115,217)"></stop>
                  <stop offset="49%" stop-color="rgb(105,80,190)"></stop>
                  <stop offset="98%" stop-color="rgb(197,59,119)"></stop>
                  <stop offset="100%" stop-color="rgb(197,59,119)"></stop>
                </linearGradient>
              </defs>
              <path
                id="logo"
                d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
                fill="#fff"
              ></path>
            </svg>
            <p className="ml-3">Let Me ChatGPT For You</p>
          </div>
          {requestDisplayed && (
            <div className="flex flex-col items-start py-12  ">
              {/* user request */}

              <div className="flex flex-col justify-left mx-8 ">
                <Avatar
                  size={30}
                  name="User"
                  variant="beam"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
                <div>
                  <h2 className="text-md font-bold text-white">User</h2>
                  <p className="text-white text-md">
                    {firestoreDocument.userRequest}
                  </p>
                </div>
              </div>
            </div>
          )}
          {responseDisplayed && (
            <div className="flex flex-col items-start py-12  bg-zinc-600 ">
              {/* user request */}

              <div className="flex flex-col justify-left mx-8 ">
                <div
                  className="relative h-[30px] w-[30px] p-1 mr-4 mb-2 text-white flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgb(16, 163, 127)" }}
                >
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1.5"
                    className="h-6 w-6"
                  >
                    <path
                      d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-md font-bold text-white">ChatGPT</h2>
                  <Typed
                    className="text-white text-md"
                    strings={[firestoreDocument.agentResponse]}
                    typeSpeed={10}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 sm:w-1/2  items-center mx-8 mb-8 sm:mx-0 ">
            {bannerDisplayed && (
              <div className="text-center py-4 lg:px-4">
                <div
                  className="p-2 bg-emerald-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex"
                  role="alert"
                >
                  <a
                    href="https://chat.openai.com/"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {`😜 It wasn't that hard? Try ChatGPT now!`}
                    </span>
                  </a>
                  <svg
                    className="fill-current opacity-75 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                  </svg>
                </div>
              </div>
            )}
            <InputMessage />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGPT;
