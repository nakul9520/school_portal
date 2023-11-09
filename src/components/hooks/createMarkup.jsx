import DOMPurify from "dompurify";

const createMarkup = (value) => {
  return {
    __html: DOMPurify.sanitize(value, { SAFE_FOR_TEMPLATES: true }),
  };
};
export default createMarkup;
