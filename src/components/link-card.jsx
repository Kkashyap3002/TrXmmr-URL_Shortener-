/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CopyPlusIcon, Download, Trash2, Trash2Icon } from "lucide-react";
import { deleteUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);

        anchor.click();
        
        document.body.removeChild(anchor);
        
    };

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div
      className="border-[#36d7b7] border-2
  flex-wrap items-center
  hover:bg-[#36d7b7]/5
  transform hover:scale-[103%]
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg hover:shadow-[#36d7b7]/30
  cursor-pointer flex flex-col md:flex-row gap-5 p-4 bg-gray-900 rounded-2xl"
    >
      <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-4">
        <img title="qr code"
          src={url.qr}
          className="h-32 w-32 object-cover ring ring-cyan-400 rounded-2xl self-center md:self-start"
          alt="qr code"
        />

        <Link
          to={`/link/${url.id}`}
          className="flex flex-col flex-1 text-center md:text-left"
        >
          <span title="Title of the link" className=" text-3xl font-bold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <span title="shortened url" className="text-blue-600 text-xl font-bold hover:underline cursor-pointer">
            https://trXmmr.in/
            {url?.custom_url ? url?.custom_url : url?.short_url}
          </span>
          <span title ="original url" className="flex items-center justify-center md:justify-start gap-1 hover:underline cursor-pointer">
            {url?.original_url}
          </span>
          <span title="created at" className="flex items-end justify-center md:justify-start font-extralight text-sm flex-1">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mx-2 my-1">
        <Button
          title="Copy this link"
          className=" border-[1.25px] border-[#36d7b7] 
      dark:bg-transparent dark:text-[#36d7b7] dark:hover:bg-[#36d7b7] dark:hover:text-white
      transform hover:scale-[1.152] hover:border-2
      transition-all duration-300 ease-in-out
      dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-[#36d7b7]/50 rounded-xl"
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://trXmmr.in/${url?.short_url}`
            );
          }}
        >
          <CopyPlusIcon></CopyPlusIcon>
        </Button>
        <Button
          title="Download this QR code"
          className="rounded-xl border-[1.25px] border-[#36d7b7] 
      hover:border-2
       dark:border-[#36d7b7]/10 dark:hover:border-[#36d7b7]  dark:hover:border-2 dark:bg-transparent dark:text-[#36d7b7] dark:hover:bg-[#36d7b7] dark:hover:text-white
      transform hover:scale-[1.152]
      transition-all duration-300 ease-in-out
      dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-[#36d7b7]/50"
          variant="ghost"
          onClick={downloadImage}
        >
          <Download></Download>
        </Button>
        <Button
          title="Delete this link"
          className="rounded-xl border-[1.25px] border-red-600 dark:hover:border-[rgba(255,0,0,0.77)]
      dark:bg-transparent
      transform hover:scale-[1.152] hover:border-[1.666px]
      transition-all duration-300 ease-in-out"
          variant="ghost"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
         { loadingDelete ? <BeatLoader size={5} color="#FF0000"/> :<Trash2/>}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
