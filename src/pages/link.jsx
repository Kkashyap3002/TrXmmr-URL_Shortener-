// NOTE: The component was originally named 'Link', but it conflicted with the 'Link' component from 'react-router-dom'.
// To resolve this, it was renamed to 'CustomLink' to prevent naming conflicts in 'App.jsx'.
import { UrlState } from '@/context';
import { getClicksForUrl, getClicksForUrls } from '@/db/apiClicks';
import { deleteUrl, getUrl} from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import React from 'react'
import { useParams } from 'react-router-dom';

const CustomLink = () => {

  const {id} = useParams();
  const {user} = UrlState();
  
  const {
    loading,
    error,
    data: url,
    fn
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats
  } = useFetch(getClicksForUrl, id);

  const {loading : loadingDelete , fn: fnDelete} = useFetch(deleteUrl, id);

  return (
    <>
    CustomLink
    </>
  )
}

export default CustomLink