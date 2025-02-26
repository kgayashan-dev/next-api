// import { useState } from "react";
// import { Trash2, UserCircle, Pencil, X, Check } from "lucide-react";

// const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   username: string;
//   password: string;
//   role: string;
// };

// interface UserListProps {
//   users: User[];
// }

// const UserList = ({ users }: UserListProps) => {
//   const [isDeleting, setIsDeleting] = useState<number | null>(null);
//   const [editingUser, setEditingUser] = useState<number | null>(null);
//   const [editForm, setEditForm] = useState<{
//     name: string;
//     email: string;
//     status: string;
//     username: string;
//     password: string;
//     role: string;
//   }>({
//     name: "",
//     email: "",
//     status: "",
//     username: "",
//     password: "",
//     role: ""
//   });

//   const deleteUser = async (id: number) => {
//     try {
//       setIsDeleting(id);
//       const response = await fetch(`${DOMAIN}/api/users/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         window.location.reload();
//       } else {
//         throw new Error("Failed to delete user");
//       }
//     } catch (error) {
//       alert("Failed to delete user");
//       console.error("Error deleting user:", error);
//     } finally {
//       setIsDeleting(null);
//     }
//   };

//   const startEditing = (user: User) => {
//     setEditingUser(user.id);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       status: user.status || "active",
//       username: user.username,
//       password: user.password || "",
//       role: user.role || "user"
//     });
//   };

//   const cancelEditing = () => {
//     setEditingUser(null);
//     setEditForm({
//       name: "",
//       email: "",
//       status: "",
//       username: "",
//       password: "",
//       role: ""
//     });
//   };

//   const updateUser = async (id: number) => {
//     try {
//       const response = await fetch(`${DOMAIN}/api/users/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editForm),
//       });

//       if (response.ok) {
//         window.location.reload();
//       } else {
//         throw new Error("Failed to update user");
//       }
//     } catch (error) {
//       alert("Failed to update user");
//       console.error("Error updating user:", error);
//     } finally {
//       setEditingUser(null);
//     }
//   };

//   if (!users?.length) {
//     return (
//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center">
//           <UserCircle className="mx-auto h-12 w-12 text-gray-400" />
//           <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
//           <p className="mt-1 text-sm text-gray-500">
//             Get started by adding a new user.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Users ({users.length})
//         </h2>
//       </div>
//       <ul className="divide-y divide-gray-200">
//         {users.map((user) => (
//           <li
//             key={user.id}
//             className="relative hover:bg-gray-50 transition-colors duration-150 ease-in-out"
//           >
//             <div className="px-6 py-4 flex items-center justify-between group">
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-3">
//                   <div className="flex-shrink-0">
//                     <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       <span className="text-blue-600 font-medium text-sm">
//                         {user.name.slice(0, 2).toUpperCase()}
//                       </span>
//                     </div>
//                   </div>
//                   {editingUser === user.id ? (
//                     <div className="flex-1 space-y-2">
//                       <div className="grid grid-cols-2 gap-2">
//                         <input
//                           type="text"
//                           value={editForm.name}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, name: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                           placeholder="Name"
//                         />
//                         <input
//                           type="text"
                          
//                           value={editForm.username}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, username: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                           placeholder="Username"
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-2">
//                         <input
//                           type="email"
//                           value={editForm.email}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, email: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                           placeholder="Email"
//                         />
//                         <input
//                           type="password"
//                           value={editForm.password}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, password: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                           placeholder="Password"
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-2">
//                         <select
//                           value={editForm.status}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, status: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                         >
//                           <option value="active">Active</option>
//                           <option value="inactive">Inactive</option>
//                           <option value="pending">Pending</option>
//                           <option value="suspended">Suspended</option>
//                         </select>
//                         <select
//                           value={editForm.role}
//                           onChange={(e) =>
//                             setEditForm({ ...editForm, role: e.target.value })
//                           }
//                           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                         >
//                           <option value="user">User</option>
//                           <option value="admin">Admin</option>
//                           <option value="moderator">Moderator</option>
//                         </select>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="truncate">
//                       <div className="flex items-center space-x-3">
//                         <h2 className="text-sm font-medium text-gray-900">
//                           {user.name}
//                         </h2>
//                         <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
//                           ${user.status === 'active' ? 'bg-green-50 text-green-700' :
//                             user.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
//                             user.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
//                             'bg-red-50 text-red-700'}`}>
//                           {user.status || "Active"}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           @{user.username}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {user.role}
//                         </span>
//                       </div>
//                       <p className="mt-1 text-xs text-gray-500 truncate">
//                         {user.email}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="ml-4 flex-shrink-0 space-x-2">
//                 {editingUser === user.id ? (
//                   <>
//                     <button
//                       onClick={() => updateUser(user.id)}
//                       className="inline-flex items-center px-3 py-1.5 border border-green-200 rounded-md text-sm text-green-600 hover:bg-green-50 hover:border-green-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                     >
//                       <Check className="h-4 w-4 mr-1.5" />
//                       Save
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                     >
//                       <X className="h-4 w-4 mr-1.5" />
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => startEditing(user)}
//                       className="inline-flex items-center px-3 py-1.5 border border-blue-200 rounded-md text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                       <Pencil className="h-4 w-4 mr-1.5" />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteUser(user.id)}
//                       disabled={isDeleting === user.id}
//                       className={`
//                         inline-flex items-center px-3 py-1.5 border rounded-md text-sm
//                         ${
//                           isDeleting === user.id
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
//                         }
//                         transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
//                       `}
//                       aria-label={`Delete ${user.name}`}
//                     >
//                       <Trash2 className="h-4 w-4 mr-1.5" />
//                       {isDeleting === user.id ? "Deleting..." : "Delete"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;