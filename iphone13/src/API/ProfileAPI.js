import { getCookie } from "./HandleTokens.js";
import { fetchAPIAndExecute } from "./APIFetcher.js";
/*upload profile image*/
export async function uploadProfileImage(profileImage,callback,fallback) {
  const url = `${process.env.REACT_APP_SERVER_IP}/api/v1/user/image/upload`;
  const formData = new FormData();
  
  // 이미지 URL을 Blob 객체로 변환
  const response = await fetch(profileImage);
  const blob = await response.blob();
  // Blob 객체를 FormData에 추가
  formData.append("profileImage", blob, `profile.png`);

  const headers = new Headers({
    Authorization: `Bearer ${getCookie("accessToken")}`,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  fetchAPIAndExecute(url, options, callback, fallback);
}

/*default profile image*/
export async function defaultProfileImage(callback, fallback){
  const url = `${process.env.REACT_APP_SERVER_IP}/api/v1/user/image/default`;

  const headers = new Headers({
    Authorization: `Bearer ${getCookie("accessToken")}`
  });

  const options = {
    method: 'PATCH',
    headers: headers
  };

  fetchAPIAndExecute(url, options, callback, fallback);
}