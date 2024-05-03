import Image from "next/image";

interface ChatMessageProps {
  key: string;
  name: string;
  imageUrl: string;
  message: string;
  role: string;
}

const ChatMessage = ({ name, imageUrl, message, role }: ChatMessageProps) => {
  return role === "user" ? (
    <div className="flex gap-2">
      <div className="flex flex-col justify-start">
        <div className="relative h-[40px] w-[40px]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full self-center"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-2 mr-10">
        <div className="whitespace-normal">{message}</div>
      </div>
    </div>
  ) : (
    <div className="flex gap-2 ">
      <div className="bg-white rounded-xl shadow-sm p-2 ml-10 ">
        <div className="whitespace-pre-wrap ">{message}</div>
      </div>
      <div className="flex flex-col justify-start">
        <div className="relative h-[40px] w-[40px]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full self-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
