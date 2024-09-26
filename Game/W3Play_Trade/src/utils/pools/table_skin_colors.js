import getHostname from "../getHostname";
import common_table_skin_colors from "./labels/tableSkinColors/commonTableSkins";
import common_sharker_table_skin_colors from "./labels/tableSkinColors/sharkerTableSkins";

// table_skin_colors setter
const table_skin_colors = (() => {
    const hostname = getHostname();
   
    switch (hostname) {
        // case 'prod-latest-cryptofights.playblock.io':
        //     return common_sharker_table_skin_colors;

        // case 'sharker.com':
        //     return common_sharker_table_skin_colors;
            
        default:
            return common_table_skin_colors;
    }
})();

export default table_skin_colors;