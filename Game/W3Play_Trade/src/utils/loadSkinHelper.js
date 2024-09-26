// src/utils/loadSkinHelper.js

const loadSkin = (skin_index) => {
  switch (skin_index) {
    case 2:
      return Promise.all([import("../styles/skin_2/global_skin.2.scss")]);
    case 3:
      return Promise.all([import("../styles/skin_3/global_skin.3.scss")]);
    case 4:
      return Promise.all([import("../styles/skin_4/global_skin.4.scss")]);
    case 5:
      return Promise.all([import("../styles/skin_5/global_skin.5.scss")]);
    case 6:
      return Promise.all([import("../styles/skin_6/global_skin.6.scss")]);
    default:
      return;
  }
};

export default loadSkin;
