const products = [
  {
    title: "PlayStation 5",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi, tempore fugiat placeat eaque dolore fugit natus sint adipisci recusandae ",
    price: 4,
    countInStock: 15,
  },  
  {
    title: "Iphone 12",
    image:
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1463&q=80",
      category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi, tempore fugiat placeat eaque dolore fugit natus sint adipisci recusandae molestiae laboriosam delectus voluptates id ullam, at perferendis..",
    price: 10,
    countInStock: 10,
  },
  {
    title: "Cannon EOS-1D",
    image:
      "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus",
    price: 5,
    countInStock: 5,
  },
  {
    title: "Amazon Alexa",
    image:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
      category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi, tempore fugiat placeat eaque dolore fugit natus sint adipisci recusandae molestiae laboriosam delectus voluptates id ullam",
    price: 2,
    countInStock: 25,
  },
  {
    title: "Audio Technica Headphones",
    image:
      "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi,",
    price: 3,
    countInStock: 4,
  },
  {
    title: "JBL FLIP 4",
    image:
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
      category: "Electronics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi, tempore fugiat placeat eaque dolore fugit natus sint adipisci recusandae molestiae laboriosam delectus voluptates id ullam, at perferendis..",
    price: 4,
    countInStock: 10,
  },

  {
    title: "Nike Jordans",
    image:
      "https://images.unsplash.com/photo-1613740104907-d537a85e1274?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

     category: "trainers",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur, iste nostrum nihil dolor ea aut vitae est earum quam quia reiciendis tempore deserunt repellendus, quibusdam quo? Rerum animi, tempore fugiat placeat eaque dolore fugit natus sint adipisci recusandae molestiae laboriosam delectus voluptates id ullam, at perferendis..",
    price: 5,
    countInStock: 2,
  },

  {
    title: "Nike Air Jordan 1",
    image:
      "https://images.unsplash.com/photo-1612976562127-3e4db216cf75?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

     category: "trainers",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil maxime veniam vero, ipsa in iure laudantium. Inventore laborum numquam illum amet culpa quos fugiat. Explicabo eius quo, quasi voluptatem necessitatibus ab, est quas minima officia molestias eveniet tempora rerum cum at. Nostrum veniam, porro obcaecati magni ab fugiat fuga corporis totam eum architecto modi beatae, aliquam nisi laborum impedit. Blanditiis, ipsum cupiditate sequi voluptates laudantium veritatis nam corrupti architecto et?",
    price: 2,
    countInStock: 2,
  },

    {
    title: "Nike Air ",
    image:
      "https://images.unsplash.com/photo-1592860986140-d77ede8b7116?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

     category: "trainers",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil maxime veniam vero, ipsa in iure laudantium. Inventore laborum numquam illum amet culpa quos fugiat. Explicabo eius quo, quasi voluptatem necessitatibus ab, est quas minima officia molestias eveniet tempora rerum cum at. Nostrum veniam, porro obcaecati magni ab fugiat fuga corporis totam eum architecto modi beatae, aliquam nisi laborum impedit. Blanditiis, ipsum cupiditate sequi voluptates laudantium veritatis nam corrupti architecto et?",
    price: 3,
    countInStock: 2,
  },

  {
    title: "Skirt",
    image:
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

     category: "Woman",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil maxime veniam vero, ipsa in iure laudantium. Inventore laborum numquam illum amet culpa quos fugiat. Explicabo eius quo, quasi voluptatem necessitatibus ab, est quas minima officia molestias eveniet tempora rerum cum at. Nostrum veniam, porro obcaecati magni ab fugiat fuga corporis totam eum architecto modi beatae, aliquam nisi laborum impedit. Blanditiis, ipsum cupiditate sequi voluptates laudantium veritatis nam corrupti architecto et?",
    price: 1,
    countInStock: 2,
  },

  {
    title: "Shirt",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",

     category: "Man",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil maxime veniam vero, ipsa in iure laudantium. Inventore laborum numquam illum amet culpa quos fugiat. Explicabo eius quo, quasi voluptatem necessitatibus ab, est quas minima officia molestias ",
    price: 1,
    countInStock: 7,
  },


];



module.exports = products;
