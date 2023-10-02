"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function Home() {
  const [longLink, setlongLink] = useState("");
  const [shortLink, setshortLink] = useState("");
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);

  const makeshortLink = async (e: any) => {
    e.preventDefault();
    setshortLink('')
    axios.post('https://linkloom.netlify.app/api/shortUrl', {
      fullLink: longLink
    }).then((res) => {
      setshortLink(window.origin + "/" + res.data.result.shortLink)
    }).catch((err) => {
      alert('Something went wrong')
      console.log(err)
    });

  };

  const OpenLink = () => { }

  const copyLink = () => {
    document.execCommand(shortLink);
    navigator.clipboard.writeText(shortLink);
  }
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              LinkLoom 🔗
            </h3>
            <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Weave the Web with LinkLoom !
            </h3>

            <p className="mt-4 leading-relaxed text-white/90">
              🔗 LinkLoom - Your Gateway to Compact URLs! Seamlessly transform
              long web addresses into concise, shareable links with our
              ExpressJS and Next.js powered link shortener. Simplify your
              digital presence today! 🚀
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <span className="text-4xl">🔗</span>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to LinkLoom 🔗
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                🔗 LinkLoom - Your Gateway to Compact URLs! Seamlessly transform
                long web addresses into concise, shareable links with our
                ExpressJS and Next.js powered link shortener. Simplify your
                digital presence today! 🚀
              </p>
            </div>
            {shortLink && (
              <div className="flex flex-col md:flex-row items-center justify-between pt-10 lg:pt-0">
                <div>
                  <QRCode
                    value={shortLink}
                    bgColor={back}
                    fgColor={fore}
                    size={size}
                  />
                </div>
                <div className=" w-full md:w-2/4">
                  <div className=" flex flex-col">
                    <div className="relative">
                      <input
                        type="text"
                        value={shortLink}
                        disabled
                        onChange={(e) => setshortLink(e.target.value)}
                        className="p-2.5 w-full rounded-md border border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                      />
                      <button
                        onClick={copyLink}
                        type="submit"

                        className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                      >
                        Copy
                      </button>
                    </div>
                    <button onClick={OpenLink} className="inline-block mt-2 shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                      Open in new tab
                    </button>
                  </div>
                </div>

              </div>
            )}
            <form action="#" className="mt-8 grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Link
                </label>

                <input
                  type="text"
                  value={longLink}
                  onChange={(e) => setlongLink(e.target.value)}
                  className="p-2 w-full rounded-md border border-gray-200 bg-white text-base text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex items-center">
                <button onClick={makeshortLink} className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Make it short
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
