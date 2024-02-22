// graphql/resolvers/index.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        getUsers: async () => {
            return prisma.user.findMany();
        },
        getUser: async (_: any, { id }: any) => {
            return prisma.user.findUnique({
                where: { id },
            });
        },
        getTeams: async () => {
            return prisma.team.findMany();
        },
        // getTeam: async (_: any, { Team_id }: any) => {
        //     return prisma.team.findUnique({
        //         where: { Team_id },
        //     });
        // },
        getTasks: async () => {
            return prisma.task.findMany();
        },
        getTask: async (_: any, { Task_id }: any) => {
            return prisma.task.findUnique({
                where: { Task_id },
            });
        },
    },
    Mutation: {
        createUser: async (_: any, { input }: any) => {
            const { first_name, last_name, email, department, designation, team_id } = input;
            return prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    department,
                    designation,
                    team_id,
                },
            });
        },
        createTeam: async (_: any, { input }: any) => {
            const { Team_name, Members, Task_id } = input;
            let data: any = { Team_name, Members: { connect: Members.map((id: number) => ({ id })) } };

            if (Task_id) {
                data.Task_id = Task_id;
            }

            const team = await prisma.team.create({
                data,
            });
            console.log("🚀 ~ createTeam: ~ team:", team)

            return team;
        },
        createTask: async (_: any, { input }: any) => {
            const { Task_id, task_name, details, department, assigned_to, date_of_assigning, date_of_submission } = input;
            return prisma.task.create({
                data: {
                    Task_id,
                    task_name,
                    details,
                    department,
                    assigned_to,
                    date_of_assigning: new Date(date_of_assigning),
                    date_of_submission: new Date(date_of_submission),
                },
            });
        },
    },
};

export default resolvers;
