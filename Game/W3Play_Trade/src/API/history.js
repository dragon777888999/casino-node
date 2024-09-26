import APP from "../app";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";
import state from "../../src/state";

const list_url = state.history_url;

const getList = async (query) => {
  const mode = query?.mode;
  const list_url_with_mode = `${list_url}?mode=${mode}`;

  return req({
    url: list_url_with_mode,
    method: "POST",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5MTkyNDE5NTksImlzcyI6ImN1YmVjbG91ZCJ9.qR99eoU9LwuV6GuPpksFqQ2cqNPByTAq6eeOFxSsor4",
    },
    body: query,
  });
};

export default { getList };
