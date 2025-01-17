import CreateLink from "@/components/create-link";
import Error from "@/components/error";
import LinkCard from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
// import useFetch from '@/hooks/use-fetch';
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, [user]);

  useEffect(() => {
    if (urls?.length) fnClicks();
    fnUrls();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-5 flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Card
          className="border-[#36d7b7] border-1 rounded-xl
  
  hover:bg-[#36d7b7]/5
  transform hover:scale-[1.02]
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg hover:shadow-[#36d7b7]/30
  cursor-pointer "
        >
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card
          className="border-[#36d7b7] border-1 rounded-xl
  
  hover:bg-[#36d7b7]/5
  transform hover:scale-[103%]
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg hover:shadow-[#36d7b7]/30
  cursor-pointer "
        >
          <CardHeader>
            <CardTitle>Total Click</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links </h1>
        <CreateLink/>
        
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          className="text-black border-2 border-[#36d7b7] rounded-xl
    focus:ring-2 focus:ring-[#36d7b7]/50 focus:border-[#36d7b7]
    hover:border-[#36d7b7]/70
    transform hover:scale-[1.02]
    transition-all duration-300 ease-in-out
    shadow-sm hover:shadow-md hover:shadow-[#36d7b7]/30
    placeholder:text-gray-400 placeholder:hover:text-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="text-gray-600 dark:text-white absolute top-2 right-2 p-1"></Filter>
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
