import { API_BASE_URL } from '../consts/index';
import { token } from '../consts';

export const getListRequest = async (dateStart: string, dateEnd: string, inOut: string, offset?: number) => {
  const res = await fetch(`${API_BASE_URL}/getList?date_start=${dateStart}&date_end=${dateEnd}${inOut ? '&in_out='+inOut : ''}&offset=${offset ? offset : 0}`, {method: "POST", headers: {"Authorization": token}});
  const data = await res.json();
  return data;
}