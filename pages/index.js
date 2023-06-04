import { useEffect, useState } from "react";
import { init, getTotalSupply, selectedAccount, tokenURI } from "./EthersFunc";
import axios from "axios";

export default function Home() {
  const [totalNFT, setTotalNFT] = useState(0);
  const [nfts, setNfts] = useState([]);

  const getNfts = async () => {
    try {
      const promises = [];

      for (let i = 0; i < totalNFT; i++) {
        let uri = await tokenURI(i);
        promises.push(axios.get(uri));
      }

      const responses = await Promise.all(promises);

      const nfts = responses.map((response) => {
        const data = response.data;
        return {
          name: data.name,
          description: data.description,
          image: data.image,
        };
      });

      setNfts(nfts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let handleInit = async () => {
      const totalNFT = await getTotalSupply();
      setTotalNFT(totalNFT);
    };
    handleInit();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      getNfts();
    }
  }, [selectedAccount]);

  return (
    <div className=" h-screen flex flex-wrap justify-center items-center">
      {selectedAccount ? (
        nfts.map((nft, i) => (
          <div key={i} className="m-4">
            <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <img
                className="h-80 w-[29rem] flex flex-col justify-center items-center bg-amber-500 rounded-t-xl"
                alt=""
                src={nft.image}
              />
              <div className="p-4 md:p-6">
                <span className="block mb-1 text-xs font-semibold uppercase text-amber-500">
                  {nft.name}
                </span>
                <p className="mt-3 text-white">{nft.description}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1 className="text-4xl text-white">Connect to Metamask</h1>
        </div>
      )}
    </div>
  );
}
