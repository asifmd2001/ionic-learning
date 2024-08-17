import { createSelector } from "@reduxjs/toolkit";
import { UserType } from "./type";
import { ApiSlice } from "../api/apiSlice";

// type UserTag = { type: 'Users'; id: string | number };

export const customerSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: "/users",
        method: "get",
      }),
      transformResponse: (baseQueryReturnValue: unknown) => {
        let responseData = baseQueryReturnValue as {
          data: UserType[]

        }
        let data = responseData?.data ?? []
        return data
      },
      // providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation<UserType[], number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      // invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    addUsers: builder.mutation<object, UserType>({
      query: (data) => {
        console.log(data)
        return ({
          url: "/users",
          method: "post",
          body: data
        })
      },
      // invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<UserType, UserType>({
      query: (data) => {
        const { id, ...userData } = data
        console.log(id)
        return ({
          url: `/users/${id}`,
          method: "put",
          body: data
        })
      },
      // invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    })
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useAddUsersMutation, useUpdateUserMutation, useDeleteUserMutation } = customerSlice;

export const selectCustomerFromResult =
  customerSlice.endpoints.getUsers.select();

export const selectUsersById = (id: string) =>
  createSelector(selectCustomerFromResult, (response) => {
    const users = response.data;
    const filteredcustomer = users?.find(
      (user) => user.id === parseInt(id)
    );
    return filteredcustomer;
  });
