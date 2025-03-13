import path from "path";

const getCurrDir = () => {
  return decodeURIComponent(
    path.dirname(
      path
        .dirname(new URL(import.meta.url).pathname)
        .replace(/^\/([a-zA-Z]):/, "$1:")
    )
  );
};

export default getCurrDir;
