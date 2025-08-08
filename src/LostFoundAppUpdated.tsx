// import React, { useState, useEffect } from "react";
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { app } from "../firebase";
// import { doc, setDoc, getFirestore, getDoc, updateDoc } from "firebase/firestore";

// const auth = getAuth(app);
// const firestore = getFirestore(app);

// const LostFoundApp = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [user, setUser] = useState(null);
//   const [view, setView] = useState("home");
//   const [otpSent, setOtpSent] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({ title: "", description: "", image: "", category: "lost" });
//   const [categories] = useState(["all", "lost", "found"]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [claimModal, setClaimModal] = useState({ show: false, postId: null, message: "" });

//   const generateRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: () => sendOtp(),
//     });
//   };

//   const sendOtp = () => {
//     generateRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//     signInWithPhoneNumber(auth, phone, appVerifier).then(confirmationResult => {
//       window.confirmationResult = confirmationResult;
//       setOtpSent(true);
//     }).catch(console.error);
//   };

//   const verifyOtp = () => {
//     window.confirmationResult.confirm(otp).then(result => {
//       setUser(result.user);
//     }).catch(console.error);
//   };

//   const filteredPosts = selectedCategory === "all" ? posts : posts.filter(p => p.category === selectedCategory);

//   const addPost = async () => {
//     const id = Date.now().toString();
//     const post = { ...newPost, id, userId: user.uid };
//     await setDoc(doc(firestore, "posts", id), post);
//     setPosts([...posts, post]);
//     setNewPost({ title: "", description: "", image: "", category: "lost" });
//     setView("home");
//   };

//   const handleClaim = async () => {
//     const postRef = doc(firestore, "posts", claimModal.postId);
//     const postSnap = await getDoc(postRef);
//     if (postSnap.exists()) {
//       await updateDoc(postRef, { claimMessage: claimModal.message, claimedBy: user.uid });
//       setClaimModal({ show: false, postId: null, message: "" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start px-4 py-6 sm:px-6 sm:py-8">
//       {!user ? (
//         <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//           <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           {otpSent && (
//             <input type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//           )}
//           <div id="recaptcha-container"></div>
//           <button onClick={otpSent ? verifyOtp : sendOtp} className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition-all duration-300">
//             {otpSent ? "Verify OTP" : "Login with Phone/OTP"}
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold">Lost & Found</h1>
//             <button onClick={() => setView("post")} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 active:scale-95 transition duration-300">Post New</button>
//           </div>

//           <div className="flex gap-2 overflow-x-auto snap-x mb-4">
//             {categories.map(category => (
//               <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full border text-sm transition-colors transform hover:scale-105 active:scale-95 duration-300 ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
//                 {category}
//               </button>
//             ))}
//           </div>

//           {view === "home" && filteredPosts.map(post => (
//             <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-4 transition-all hover:shadow-xl hover:scale-105 active:scale-95 duration-300 cursor-pointer p-4">
//               <h3 className="text-xl font-bold">{post.title}</h3>
//               <p>{post.description}</p>
//               {post.image && <img src={post.image} alt="item" className="w-full h-40 object-cover mt-2 rounded-xl" />}
//               <button onClick={() => setClaimModal({ show: true, postId: post.id, message: "" })} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 active:scale-95 transition duration-300">Claim</button>
//             </div>
//           ))}

//           {view === "post" && (
//             <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300">
//               <input placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//               <textarea placeholder="Description" value={newPost.description} onChange={e => setNewPost({ ...newPost, description: e.target.value })} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//               <input placeholder="Image URL" value={newPost.image} onChange={e => setNewPost({ ...newPost, image: e.target.value })} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//               <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300">
//                 <option value="lost">Lost</option>
//                 <option value="found">Found</option>
//               </select>
//               <button onClick={addPost} className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition duration-300">Submit</button>
//             </div>
//           )}

//           {claimModal.show && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//                 <h3 className="text-xl font-bold mb-4">Claim Item</h3>
//                 <textarea placeholder="Why do you think this item is yours?" value={claimModal.message} onChange={e => setClaimModal({ ...claimModal, message: e.target.value })} className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300" />
//                 <div className="flex justify-between gap-4">
//                   <button onClick={handleClaim} className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition duration-300">Submit Claim</button>
//                   <button onClick={() => setClaimModal({ show: false, postId: null, message: "" })} className="flex-1 bg-gray-300 py-3 rounded-xl font-medium hover:bg-gray-400 active:scale-95 transition duration-300">Cancel</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LostFoundApp;