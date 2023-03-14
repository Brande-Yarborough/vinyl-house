// const handleAlbumDetail = async (album) => {
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": Cookies.get("csrftoken"),
//     },
//   };
//   const response = await fetch(`/api_v1/user/albums/${album.id}/`, options);
//   if (!response.ok) {
//     throw new Error("Network response not ok");
//   }

//   const data = await response.json();
//   console.log({ data });
// };
