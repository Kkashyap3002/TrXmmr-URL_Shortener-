import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { CopyPlusIcon, Download, LinkIcon, Trash2 } from "lucide-react";

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const CustomLink = () => {
  // const downloadImage = () => {
  //   const imageUrl = url?.qr;
  //   const fileName = url?.title;

  //   const anchor = document.createElement("a");
  //   anchor.href = imageUrl;
  //   anchor.download = fileName;
  //   document.body.appendChild(anchor);

  //   anchor.click();

  //   document.body.removeChild(anchor);
  // };
  // const downloadImage = () => {
  //   const imageUrl = url?.qr; // The URL of the image
  //   const fileName = url?.title || "download"; // The file name

  //   // Create a new blank tab
  //   const newTab = window.open("", "_blank");
  //   if (newTab) {
  //     // Write the HTML to the new tab
  //     newTab.document.write(`
  //     <html>
  //       <head>
  //         <title>Download Image</title>
  //       </head>
  //       <body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
  //         <img src="${imageUrl}" alt="${fileName}" style="max-width: 90%; max-height: 90%;" />
  //         <a href="${imageUrl}" download="${fileName}" style="position: absolute; bottom: 20px; text-decoration: none; color: white; background: #36d7b7; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Download Image</a>
  //       </body>
  //     </html>
  //   `);
  //     // Close the document to finish loading the content
  //     newTab.document.close();
  //   }
  // };

  const downloadImage = () => {
    const imageUrl = url?.qr; // The URL of the image
    const fileName = url?.title || "qr_project"; // Default filename for download

    // Create a new blank tab
    const newTab = window.open("", "_blank");
    if (newTab) {
     
      newTab.document.write(`
      <html>
        <head>
          <title > Download Image</title>
        </head>
        <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
          <img src="${imageUrl}" alt="${fileName}" style="max-width: 90%; max-height: 90%;" />
          <div style="margin-top: 20px;">
            <
            <a href="${imageUrl}" target="_blank" style="text-decoration: none; color: white; background: #36d7b7; padding: 10px 20px; border-radius: 5px font-size: 16px margin-right: 10px;">View Image</a>
            
            
            <button id="downloadImageButton" style="text-decoration: none; color: white; background: #36d7b7; padding: 10px 20px; border-radius: 5px; font-size: 16px; border: none; cursor: pointer;">Download Locally</button>
          </div>
        </body>
        <script>
          // Handle local download on button click
          document.getElementById('downloadImageButton').addEventListener('click', function() {
            const anchor = document.createElement('a');
            anchor.href = '${imageUrl}';
            anchor.download = '${fileName}.jpeg'; 
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
          });
        </script>
      </html>
    `);
      // Close the document to finish loading the content
      newTab.document.close();
    }
  };





  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: url,
    fn,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="mt-6 px-3 flex flex-col sm:flex-row gap-8  break-words overflow-hidden text-ellipsis">
        {/* Link + QR Code Container */}
        <div className="flex flex-col gap-8 sm:w-2/5 p-4 hover:bg-transparent hover:shadow-lg hover:shadow-[#36d7b7]/30 transition-all duration-300 ease-in-out rounded-xl border border-[#36d7b7] break-words overflow-hidden text-ellipsis">
          {/* Link Section */}
          <div className="flex flex-col items-start gap-8 break-words ">
            <span className="font-serif text-6xl font-extrabold hover:underline cursor-pointer">
              {url?.title}
            </span>
            <a
              className="font-sans text-3xl sm:text-4xl dark:hover:text-[#3441ff] light:hover:text-[#36d7b7] font-extrabold hover:underline cursor-pointer overflow-hidden text-ellipsis"
              href={`https://trXmmr.in/${link}`}
              target="_blank"
              rel="noreferrer"
            >
              https://trXmmr.in/{link}
            </a>
            <a
              className="flex items-end text-sm font-extralight hover:underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
              href={url?.original_url}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="p-1" />
              {url?.original_url}
            </a>
            <span className="flex items-end text-sm font-extralight">
              {new Date(url?.created_at).toLocaleString()}
            </span>

            <div className="flex gap-2 flex-wrap justify-center mx-2 my-1">
              <Button
                title="Copy this link"
                className="border-[1.25px] border-[#36d7b7] 
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
                <CopyPlusIcon />
              </Button>

              <Button
                title="Download this link"
                className="rounded-xl border-[1.25px] border-[#36d7b7] 
              hover:border-2
              dark:border-[#36d7b7]/10 dark:hover:border-[#36d7b7] dark:hover:border-2 dark:bg-transparent dark:text-[#36d7b7] dark:hover:bg-[#36d7b7] dark:hover:text-white
              transform hover:scale-[1.152]
              transition-all duration-300 ease-in-out
              dark:shadow-md dark:hover:shadow-lg dark:hover:shadow-[#36d7b7]/50"
                variant="ghost"
                target="_blank"
                onClick={downloadImage}

              >
                <Download />
              </Button>
              <Button
                title="Delete this link"
                className="rounded-xl border-[1.25px] border-red-600 dark:hover:border-[rgba(255,0,0,0.77)]
              dark:bg-transparent
              transform hover:scale-[1.152] hover:border-[1.666px]
              transition-all duration-300 ease-in-out"
                variant="ghost"
                onClick={() => fnDelete()}
              >
                {loadingDelete ? (
                  <BeatLoader size={5} color="#FF0000" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center">
            <img
              src={url?.qr}
              alt="QR Code"
              className="max-w-[150px] sm:max-w-[200px] object-contain border border-gray-200 shadow-lg p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Stats Container */}
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold"> Stats </CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-extrabold">
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p> {stats.length} </p>
                </CardContent>
              </Card>
              <CardTitle className="text-2xl font-extrabold">Location Data</CardTitle>
              {/* {<Location stats = {stats} />} */}

              <CardTitle> Device Info</CardTitle>
               {/* {<Location stats = {stats} />} */}

            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics yet"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default CustomLink;
