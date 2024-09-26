// utils/copyToClipboard.js

export const copyToClipboard = (text) => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }

  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch((err) => {
      console.error("Failed to copy:", err);
      return false;
    });
};

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    if (successful) {
      console.log("Fallback: Copying text command was successful");
      return true;
    } else {
      console.error("Fallback: Oops, unable to copy");
      return false;
    }
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
}
