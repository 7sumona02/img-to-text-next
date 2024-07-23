'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import Footer from './Footer';

const Page: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleCopy = async () => {
    if (data) {
      try {
        await navigator.clipboard.writeText(data);
        alert('Text copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy text: ', error);
      }
    } else {
      alert('No text to copy!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = {
        apikey: "ZjePOM0Ez1CaEyNKBwMCdLT8HhBHnYj0"
      };

      setLoading(true);

      try {
        const response = await axios.get(`https://api.apilayer.com/image_to_text/url?url=${encodeURIComponent(url)}`, {
          headers: myHeaders
        });
        
        setData(response.data.all_text);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return (
    <div className='flex justify-center h-screen relative'>
      <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6 mt-20 text-cyan-100">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl pb-4">Image to Text</h1>
          <Input type="url" placeholder="Enter the URL ..." value={url} onChange={handleUrlChange} className="text-cyan-100 md:text-lg border-zinc-800 bg-neutral-950" />
        </div>
        <div className="mt-10 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-cyan-800 p-8 transition-colors hover:border-cyan-800/80">
            <div className="w-full max-w-md space-y-2">
              <p className="text-cyan-100">Extracted Text:</p>
              <div className="rounded-md bg-background p-4 text-sm">
              {loading ? (
                 <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <p className='text-cyan-100'>
                  {data}
                </p>
              )}
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleCopy}>
                  <CopyIcon className="h-4 w-4" />
                  <span className="sr-only">Copy Text</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0'>
        <Footer />
      </div>
    </div>
  )
}

export default Page;