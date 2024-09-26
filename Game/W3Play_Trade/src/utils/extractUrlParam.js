// extract passed query param from url
export default function extractRppParam(url, param) {
    try {
        const urlObj = new URL(url);
        const rppParam = urlObj.searchParams.get(param);

        return rppParam;

    } catch (error) {
        console.error('err URL:', error);
        return null;
    }
};