import { InMemoryCache, makeVar } from '@apollo/client'

export const cartItemsVar = makeVar<number[]>([])

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
      },
    },
  },
})
