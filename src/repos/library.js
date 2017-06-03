import parsePodcast from "node-podcast-parser";
import { compact } from "lodash";
import testfeed from "./testfeed.xml";

const feeds = [
  testfeed
  // "https://www.relay.fm/cortex/feed",
  // "http://cipyd.libsyn.com/rss",
  // "http://npr.org/rss/podcast.php?id=510309",
  // "http://feeds.feedburner.com/TheGreatestGeneration",
  // "http://maximumfun.org/feeds/poprocket.xml"
];

const parse = xml => {
  return new Promise((res, rej) => parsePodcast(xml, (err, d) => res(d)));
};

const fetchCast = url => fetch(url).then(res => res.text());

export const getPodcasts = () => {
  const promises = feeds.map(url => fetchCast(url).then(xml => parse(xml)));
  return Promise.all(promises).then(x => compact(x));
};
