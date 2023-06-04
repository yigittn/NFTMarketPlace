import React, { useState, useEffect } from "react";
import { safeMint } from "../EthersFunc";
const Moralis = require("moralis").default;

const index = () => {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [useMint, setUseMint] = useState(false);
  const apiKey = process.env.NEXT_APP_MORALIS_API_KEY;

  const handleChgange = (e) => {
    e.preventDefault();
    Moralis.start({
      apiKey: apiKey,
    });
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        const base64 = reader.result;
        const uploadArray = [
          {
            path: "nftimage.png",
            content: base64,
          },
        ];
        try {
          const response = await Moralis.EvmApi.ipfs.uploadFolder({
            abi: uploadArray,
          });
          setNftImage(response.result[0].path);
          setUseMint(true);
        } catch (error) {
          console.log("error :" + error);
        }
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadArray = [
      {
        path: "yigittn.json",
        content: {
          name: nftName,
          description: nftDescription,
          image: nftImage,
        },
      },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });
    let uri = response.result[0].path;
    const lastResponse = await safeMint(uri);
    console.log(lastResponse);
  };

  return (
    <div className=" h-screen  flex justify-center items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Let's mint your NFT
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-white">
            Mint your NFT and show it to the world.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border border-gray-800 border-opacity-80"
          >
            <p className="text-center text-white text-lg font-medium">
              Write your NFT details
            </p>

            <div>
              <div className="relative">
                <input
                  onChange={(e) => setNftName(e.target.value)}
                  className="w-full rounded-lg border-gray-600 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  onChange={(e) => setNftDescription(e.target.value)}
                  className="w-full rounded-lg border-gray-600 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Description"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  onChange={handleChgange}
                  type="file"
                  className="w-full rounded-lg border-gray-600 p-4 pe-12 text-sm shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white ${
                useMint ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!useMint}
            >
              Mint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
