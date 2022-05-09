import apiClient from "./apiClient";
import generateToken from "./generateToken";
import { v4 as uuidv4 } from "uuid";
const paytoVPA = async (id, amount) => {
  const token = generateToken();
  const beneficiary = await apiClient.get(`/getBeneficiary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (beneficiary.status == "ERROR")
    return { ok: 0, message: beneficiary.message };
  else {
    const transferId = uuidv4();
    try {
      const authToken = generateToken();
      const cashfreeResponse = await apiClient.post(
        "/requestTransfer",
        {
          beneId: id,
          amount: amount,
          transferId: transferId,
          transferMode: "upi",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (cashfreeResponse.status == "SUCCESS") {
        return { ok: 1, message: cashfreeResponse.message };
      } else {
        return { ok: 0, message: cashfreeResponse.message };
      }
    } catch (error) {
      return { ok: 0, message: error };
    }
  }
};

export default paytoVPA;