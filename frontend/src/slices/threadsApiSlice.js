import { apiSlice } from './apiSlice';
import { THREADS_URL } from '../constants';

export const threadsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createThread: builder.mutation({
            query: (thread) => ({
                url: `${THREADS_URL}/user`,
                method: 'POST',
                body: {...thread}
            })
        }),
        getThreadDetails: builder.query({
            query: (threadId) => ({
                url: `${THREADS_URL}/${threadId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyThreads: builder.query({
            query: () => ({
                url: `${THREADS_URL}/user`,
            }),
            keepUnusedDataFor: 5,
        }),
        fetchThreads: builder.query({
            query: () => ({
                url: THREADS_URL,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useCreateThreadMutation, useGetThreadDetailsQuery, useGetMyThreadsQuery, useFetchThreadsQuery } = threadsApiSlice;