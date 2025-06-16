import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('../modals/login.page.vue')
    },
    {
        path: '/students',
        component: () => import('../pages/students.page.vue')
    },
    {
        path: '/teachers',
        component: () => import('../pages/profs.page.vue')
    },
    {
        path: '/classrooms',
        component: () => import('../pages/classrooms.page.vue')
    },
    {
        path: '/students/:id',
        component: () => import('../pages/student.details.vue')
    },
    {
        path: '/classrooms/:id/students',
        name: 'students-by-class',
        component: () => import('../pages/students.by.class.vue')
    },
    {
        path: '/subjects',
        component: () => import('../pages/subjects.page.vue')
    },
    {
        path: '/subjects/:id/teachers',
        name: 'teachers-by-subject',
        component: () => import('../pages/profs.by.subject.vue')
    },
    {
        path: '/teachers/:id/subjects',
        name: 'subjects-by-teacher',
        component: () => import('../pages/subjects.by.teacher.vue')
    },
    {
        path: '/',
        redirect: '/classrooms'
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});