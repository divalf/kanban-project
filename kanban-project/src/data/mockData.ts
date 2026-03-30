import { BoardData } from "@/types/kanban";

const lorem = "Lorem ipsum dolor sit amet, libre unsta consectetur adipiscing elit.";

export const initialData: BoardData = {
  columns: {
    "col-inprogress": {
      id: "col-inprogress",
      title: "Em Andamento",
      color: "blue",
      cards: [
        {
          id: "card-1",
          title: "User flow confirmation for finance app",
          description: lorem,
          clientEmail: "finances@app.com",
          status: "Em Andamento",
          priority: "Urgente",
          commentsCount: 8,
          tasksDone: 112,
          tasksTotal: 150,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3", "https://i.pravatar.cc/150?u=4"],
        },
        {
          id: "card-2",
          title: "Responsive Website Design for 23 more clients",
          description: lorem,
          clientEmail: "clients@web.com",
          status: "Em Andamento",
          priority: "Alta",
          commentsCount: 32,
          tasksDone: 115,
          tasksTotal: 120,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6", "https://i.pravatar.cc/150?u=7", "https://i.pravatar.cc/150?u=8"],
        },
        {
          id: "card-3",
          title: "Blog Copywriting (Low priority 😅)",
          description: lorem,
          clientEmail: "blog@content.com",
          status: "Em Andamento",
          priority: "Média",
          commentsCount: 4,
          tasksDone: 12,
          tasksTotal: 20,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=9", "https://i.pravatar.cc/150?u=10"],
        }
      ]
    },
    "col-reviewed": {
      id: "col-reviewed",
      title: "Em Revisão",
      color: "yellow",
      cards: [
        {
          id: "card-4",
          title: "Healthcare app wireframe flow 🤩",
          description: lorem,
          clientEmail: "health@care.com",
          status: "Em Revisão",
          priority: "Urgente",
          commentsCount: 221,
          tasksDone: 87200,
          tasksTotal: 87200,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=11", "https://i.pravatar.cc/150?u=12", "https://i.pravatar.cc/150?u=13", "https://i.pravatar.cc/150?u=14"],
        },
        {
          id: "card-5",
          title: "UI/UX Design in the age of AI",
          description: lorem,
          clientEmail: "design@ai.com",
          status: "Em Revisão",
          priority: "Alta",
          commentsCount: 108,
          tasksDone: 997,
          tasksTotal: 1000,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=15", "https://i.pravatar.cc/150?u=16"],
        }
      ]
    },
    "col-completed": {
      id: "col-completed",
      title: "Concluído",
      color: "green",
      cards: [
        {
          id: "card-6",
          title: "UI/UX Design in the age of AI",
          description: lorem,
          clientEmail: "done@ai.com",
          status: "Concluído",
          priority: "Urgente",
          commentsCount: 11,
          tasksDone: 187,
          tasksTotal: 187,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=17", "https://i.pravatar.cc/150?u=18", "https://i.pravatar.cc/150?u=19"],
        },
        {
          id: "card-7",
          title: "UI/UX Design in the age of AI",
          description: lorem,
          clientEmail: "done2@ai.com",
          status: "Concluído",
          priority: "Baixa",
          commentsCount: 17,
          tasksDone: 0,
          tasksTotal: 17,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=20", "https://i.pravatar.cc/150?u=21", "https://i.pravatar.cc/150?u=22", "https://i.pravatar.cc/150?u=23"],
        },
        {
          id: "card-8",
          title: "UI/UX Design in the age of AI",
          description: lorem,
          clientEmail: "done3@ai.com",
          status: "Concluído",
          priority: "Baixa",
          commentsCount: 0,
          tasksDone: 0,
          tasksTotal: 10,
          teamAvatarUrls: ["https://i.pravatar.cc/150?u=24"],
        }
      ]
    }
  },
  columnOrder: ["col-inprogress", "col-reviewed", "col-completed"]
};
