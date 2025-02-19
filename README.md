# Auth with express
This is simple way how to implement JWT Token based auth using express, mongoose and JWT.
There are following endpoints:

/auth/sign-up   **POST** \
/auth/sign-in    **POST**

/users	**GET** \
/users/id 	**GET** \
/users/id	**DELETE** 🔒 \
/users/id	**PUT** 🔒 

/posts 	**GET**  🔒 \
/posts 	**POST**  🔒 \
/posts/id 	**GET** 🔒 \
/posts/id	**DELETE** 🔒 \
/posts/id	**PUT** 🔒 

each user have its own posts, therefor each post have one user who created this post.

## How to start a project

1) git clone https://github.com/Datodia/express-auth.git
2) npm i
3) add your .env files
4) npm run start
