/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import { Copy, Delete, Download } from 'lucide-react';

const LinkCard = ({url,fetchUrls}) => {

  return (
    <div
      className="border-[#36d7b7] border-1 
  flex-wrap items-center
  hover:bg-[#36d7b7]/5
  transform hover:scale-[103%]
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg hover:shadow-[#36d7b7]/30
  cursor-pointer flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-2xl"
    >
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
        <img
          src={url.qr}
          className="h-32 w-32 object-cover ring ring-cyan-400 rounded-2xl self-center md:self-start"
          alt="qr code"
        />

        <Link
          to={`/link/${url.id}`}
          className="flex flex-col flex-1 text-center md:text-left"
        >
          <span className="text-3xl font-bold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <span className="text-blue-600 text-xl font-bold hover:underline cursor-pointer">
            https://trXmmr.in/
            {url?.custom_url ? url?.custom_url : url?.short_url}
          </span>
          <span className="flex items-center justify-center md:justify-start gap-1 hover:underline cursor-pointer">
            {url?.original_url}
          </span>
          <span className="flex items-end justify-center md:justify-start font-extralight text-sm flex-1">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </Link>
        <div className="flex gap-2">
          <Button
            title="Copy this link"
            className=" border-2 border-[#36d7b7] 
      dark:bg-transparent dark:text-[#36d7b7] dark:hover:bg-[#36d7b7] dark:hover:text-white
      transform hover:scale-[1.02]
      transition-all duration-300 ease-in-out
      dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-[#36d7b7]/50 rounded-xl"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://trXmmr.in/${url?.short_url}`
              );
            }}
          >
            <Copy></Copy>
          </Button>
          <Button
            title="Download this link"
            className="rounded-xl border-2 border-[#36d7b7] 
      
      dark:border-1 dark:border-[#36d7b7]/10 dark:hover:border-[#36d7b7]  dark:hover:border-2 dark:bg-transparent dark:text-[#36d7b7] dark:hover:bg-[#36d7b7] dark:hover:text-white
      transform hover:scale-[1.02]
      transition-all duration-300 ease-in-out
      dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-[#36d7b7]/50"
            variant="ghost"
          >
            <Download></Download>
          </Button>
          <Button
            title="Delete this link"
            className="rounded-xl border-2 border-red-500 
      dark:bg-transparent dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white
      transform hover:scale-[1.02]
      transition-all duration-300 ease-in-out
      dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-red-500/50"
            variant="ghost"
          >
            <Delete></Delete>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard