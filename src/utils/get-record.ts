import { API_BASE_URL, token } from '../consts';
const getRecord = async (recordId: string, partnershipId: string) => {
    const res = await fetch(`${API_BASE_URL}/getRecord?record=${recordId}&partnership_id=${partnershipId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
            'Content-Transfer-Encoding': 'binary',
            'Content-Disposition': 'filename="record.mp3"',
            'Authorization': token
        },
        mode: 'cors',
    });
    const data = await res.json();
    return data;
};

export default getRecord;