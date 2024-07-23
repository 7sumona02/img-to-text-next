'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Page: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = {
        apikey: "ZjePOM0Ez1CaEyNKBwMCdLT8HhBHnYj0"
      };

      try {
        const response = await axios.get(`https://api.apilayer.com/image_to_text/url?url=${encodeURIComponent(url)}`, {
          headers: myHeaders
        });
        
        setData(response.data.all_text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return (
    <div>
      <h1 className='text-2xl mt-10'>Image to Text Conversion</h1>
      <Input type="url" placeholder="Enter the URL ..." value={url} onChange={handleUrlChange} />
      <p>{data}</p>
    </div>
  );
};

export default Page;