import { faker } from '@faker-js/faker'
import { Item, User } from '../models/model'
//// SEED THE ITEMS COLLECTION IN DB
export const seedItems = (numOfEntries: number) => {
  for (let i = 0; i < numOfEntries; i++) {
    // randomly choose if the item is reduced or not
    const isReduced = Math.random() <= 0.2

    // create a random amount the item is reduced by
    const createReducedByValue = () => {
      if (isReduced) {
        const reducedBy = Math.floor(Math.random() * 100)
        return reducedBy
      }
      return 0
    }
    const ifReduced = createReducedByValue()

    const fakeItem: object = {
      itemName: faker.commerce.productName(),
      itemPrice: faker.commerce.price({ min: 100, max: 200 }),
      itemCategory: faker.commerce.department(),
      itemDescription: "I'm with stupid t-shirt",
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.de%2F-%2Fen%2FIm-With-Stupid-T-Shirt%2Fdp%2FB07NVHPZBS&psig=AOvVaw3y_VgLw5BcenXIQOztnrux&ust=1695908591384000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDEkvv1yoEDFQAAAAAdAAAAABAE',
      itemsInStock: faker.number.int(100),
      reduced: isReduced,
      percentageReduced: ifReduced,
    }
    Item.create(fakeItem)
  }
  console.log(`${numOfEntries} new items created`)
}

//// SEED USERS COLLECTION IN DB
export const seedUsers = async (
  numOfItemsInCart: number,
  numOfUsers: number
) => {
  for (let i = 0; i < numOfUsers; i++) {
    const cartItems = []
    const user = {
      // Define user properties (e.g., name, email, password)
      userName: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'password',
      terms: true,
      shoppingCart: cartItems,
      address: {
        street: 'Fake',
        streetNumber: 123,
        city: 'Berlin',
        postCode: 13357,
      },
    }

    // Create a user and retrieve the generated user object
    const createdUser = await User.create(user)

    // Generate cart items for the user
    for (let j = 0; j < numOfItemsInCart; j++) {
      const isReduced = Math.random() <= 0.2
      const fakeItem = {
        itemName: faker.commerce.productName(),
        itemPrice: faker.commerce.price({ min: 100, max: 200 }),
        itemCategory: faker.commerce.department(),
        itemsInStock: faker.number.int(100),
        reduced: isReduced,
        percentageReduced: isReduced ? Math.floor(Math.random() * 100) : 0,
      }
      cartItems.push(fakeItem)
    }

    // Save the user object with the cart
    await createdUser.save()
    console.log('User with cart and items created:', createdUser)
  }
}

// PURGE DB
export const dropCollections = async () => {
  try {
    await Item.deleteMany({})
    await User.deleteMany({})
    console.log('All collections dropped successfully.')
  } catch (error) {
    console.error('Error dropping collections:', error)
  }
}
