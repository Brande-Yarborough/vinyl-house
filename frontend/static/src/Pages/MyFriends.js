// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { handleError } from "../utils/utilities";
// import { Container, Form, Button, Image, Card } from "react-bootstrap";

// function FriendList() {
//   const [profile, setProfile] = useState({});

//   useEffect(() => {
//     getMyProfile();
//   }, []);
//   //for page re-render to load after editing fields
//   const getMyProfile = async () => {
//     const response = await fetch(`/api_v1/profiles/current_user/`);
//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     }

//     const data = await response.json();
//     setProfile(data);
//   };

//   /////Friend List/////
//   console.log({ profile });

//   const myFriendListHTML = profile.friends?.map((friend) => (
//     <Container>
//       <div>My Friends:</div>
//       <Card style={{ width: "18rem" }}>
//         <Card.Body>
//           <Card.Text>{friend.username}</Card.Text>
//           <Button variant="primary">View Albums</Button>
//         </Card.Body>
//       </Card>
//     </Container>
//   ));

//   return (
//     <>
//       <div>{myFriendListHTML}</div>
//     </>
//   );
// }

// export default FriendList;

// // const profile = {
// //     name: 'Brande',
// //     friends: ['Sophia', 'Stephanie', 'Jack']
// // }

// // profile.friends.map(friend => console.log(friend));
