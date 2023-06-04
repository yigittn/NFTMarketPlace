import Header from "./Components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-r  from-slate-700 via-pink-900 to-black">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
