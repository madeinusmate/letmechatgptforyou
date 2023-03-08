import { useEffect, useState } from "react";
import { Text } from "@vercel/examples-ui";
import { Button } from "./Button";
import { type ChatGPTMessage, LoadingChatLine } from "./ChatLine";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

const chatGPTRequestsRef = collection(db, "ChatGPTRequests");

export function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareId, setShareId] = useState<String>();

  // Save ChatGPT Response to Firestore
  const saveToFirestore = async (request: string, response: string) => {
    try {
      const docRef = await addDoc(chatGPTRequestsRef, {
        userRequest: request,
        agentResponse: response,
      });

      setShareId(docRef.id);
      setLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    setShareId("");
    const newMessage = [{ role: "user", content: message } as ChatGPTMessage];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessage,
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;
    }

    saveToFirestore(message, lastMessage);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `https://letmeChatGPTforyou.com/share/${shareId}`
    );
    toast.success("Link Copied to Clipboard");
  };

  const ShareLink = () => (
    <>
      <div className="rounded-2xl border-zinc-100 flex justify-between items-center mt-4  lg:border py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-gray-500 ml-2"
        >
          <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
          <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
        </svg>
        <a
          href={`https://www.letmechatgptforyou.com/share/${shareId}`}
          target="_blank"
          rel="noreferrer"
        >
          <input
            className="w-full ml-2 outline-none bg-transparent cursor-pointer"
            type="text"
            placeholder="link"
            value={`https://www.letmechatgptforyou.com/share/${shareId}`}
          />
        </a>
        <Button
          className="mx-4 flex-none"
          onClick={() => copyLinkToClipboard()}
        >
          Copy
        </Button>
      </div>
    </>
  );

  return (
    <div>
      <div className="rounded-2xl border-zinc-100 flex flex-col items-center lg:border lg:p-6">
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a request to ask ChatGPT
        </span>

        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
      {loading && <LoadingChatLine />}
      {shareId && <ShareLink />}

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-6 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
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
    </Button>
  </div>
);
