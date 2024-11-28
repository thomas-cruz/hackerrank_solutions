/*
 * Complete the 'avgRotorSpeed' function below.
 *
 * URL for cut and paste
 * https://jsonmock.hackerrank.com/api/iot_devices/search?status={statusQuery}&page={number}
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING statusQuery
 *  2. INTEGER parentId
 */

async function avgRotorSpeed(statusQuery, parentId) {
    const response = await axios.get(`https://jsonmock.hackerrank.com/api/iot_devices/search?status=${statusQuery}`);
    
    if (!response.data || !response.data?.data?.length) {
        return 0;
    }
    const { total_pages } = response.data;
    let totalCount = 0;
    let sum = 0;
    
    for (let i = 1; i <= total_pages; i++) {
        const res = await axios.get(`https://jsonmock.hackerrank.com/api/iot_devices/search?status=${statusQuery}&page=${i}`);
        
        if (res.data && res.data?.data?.length) {
            const data = res.data.data;
            for (let j = 0; j < data.length; j++) {
                if (data[j].parent?.id === parentId) {
                    sum += data[j].operatingParams.rotorSpeed;
                    totalCount++;
                }
            }
        }
    }

    return totalCount > 0 ? Math.floor(sum / totalCount) : 0;
}
