import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItemResponse } from './types'

const BASE_URL: string = "http://localhost:3000"

export const itmesApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
    endpoints: (builder) => ({
        getAllItems: builder.query<IItemResponse[], void>({
            query() {
                return {
                    url: '/item/get-all-items',
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetAllItemsQuery } = itmesApi