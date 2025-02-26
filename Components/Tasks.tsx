// import { useState } from "react";

// const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN; // initialize DOMAIN 

// export default function TaskList() {
//   const [tasks, setTasks] = useState<
//     { id: number; title: string; userId: number }[]
//   >([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     setLoading(true);
//     // fetch tasks
//     try {
//       const res = await fetch(`http://${DOMAIN}/api/task`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setTasks(data);
//       } else {
//         console.error("Failed to fetch tasks");
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={fetchTasks}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         {loading ? "Loading..." : "Fetch Tasks"}
//       </button>

//       <ul className="space-y-2">
//         {tasks.map((task) => (
//           <li key={task.id} className="border p-2 rounded">
//             <strong>{task.title}</strong> (User ID: {task.userId})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
