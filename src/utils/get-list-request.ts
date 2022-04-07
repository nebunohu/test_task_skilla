import { API_BASE_URL } from '../consts/index';
import { token } from '../consts';

export const getListRequest = async (dateStart: string, dateEnd: string, inOut: string) => {
  const res = await fetch(`${API_BASE_URL}/getList?date_start=${dateStart}&date_end=${dateEnd}&in_out=${inOut}`, {method: "POST", headers: {"Authorization": token}});
  const data = await res.json();
  return data;
}