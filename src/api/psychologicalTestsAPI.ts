import axios from 'axios';
import { decodeBase64 } from '../helper/helper';
import { IGetTestsResponse } from '../typings/types';
import { DecodedDataType } from '../libs/psychology/build/main/types/types';
import { API_TESTS } from '../constants/constants';

export function getDecodedTestData(
  testList: IGetTestsResponse[]
): DecodedDataType {
  const neededTest: IGetTestsResponse = testList.filter(
    (test) => test.type === 0
  )[0];
  const decodedData = decodeBase64(neededTest.value);
  return JSON.parse(decodedData);
}

export async function saveTestResult(dataToSave): Promise<any> {
  try {
    const response = await axios.post(API_TESTS, { data: dataToSave });
    if (response?.data?.data?.attributes) {
      return response.data.data.attributes;
    }
  } catch (err) {
    console.error(err);
  }
}
export function saveTestResultToFile(dataToSave): any {
  axios
    .post('save-data', dataToSave)
    .then((r) => console.log('success'))
    .catch((err) => console.error(err));
}

export async function getAllTestResults(): Promise<any> {
  try {
    const response = await axios(`${API_TESTS}?pagination[pageSize]=50&sort=createdAt:DESC`);
    if (response?.data) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
}
