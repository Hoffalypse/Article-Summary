/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { copy, linkIcon, loader, tick } from "../assets";
// import { useLazyGetSummaryQuery } from "../services/article";
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  // const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [copied, setCopied] = useState("");
  const [paragraph, setParagraph] = useState(1);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: { url: article.url, length: paragraph },
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };
    setLoading(true);
    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    axios
      .request(options)
      .then(function (response) {
        if (response.data.summary) {
          const newArticle = { ...article, summary: response.data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];

          // update state and local storage
          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
        setLoading(false);
      })
      .catch(function (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  };

  const handleParaChange = (e) => {
    const {  value } = e.target;
    setParagraph(value)
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
         
            <img
              src={linkIcon}
              alt="link icon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              placeholder="Enter a URL"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className="url_input peer"
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-grey-700"
            >
              Summarize
            </button>
          
        </form>
        <div className="flex justify-center">
        <label>Summary Paragraphs: &nbsp; &nbsp;</label>
        <select id="cars" name="cars" className="w-12 rounded shadow-lg border-gray-200" onChange={handleParaChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        </div>
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="w-[40%] h-[40%] onject-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium, text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {loading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen :/
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article
                <span className="blue_gradient"> Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
